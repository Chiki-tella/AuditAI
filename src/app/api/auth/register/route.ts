import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  console.log("📝 Registration attempt started...");
  try {
    const { firstName, lastName, email, password, firmName } = await req.json();

    // 1. Basic Validation
    if (!email || !password || !firstName || !lastName || !firmName) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // 2. Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 400 }
      );
    }

    // 3. Hash the password
    const hashedPassword = await hash(password, 12);

    // 4. Create Firm and User in a transaction (FR-03)
    // This ensures both are created successfully, or neither is.
    const result = await prisma.$transaction(async (tx) => {
      // Create the Firm
      const firm = await tx.firm.create({
        data: {
          name: firmName,
          email: email, // Use owner's email as firm contact initially
          subscriptionStatus: "TRIALING",
          scansLimit: 10,
        },
      });

      // Create the User as the ADMIN of that firm
      const user = await tx.user.create({
        data: {
          name: `${firstName} ${lastName}`,
          email,
          passwordHash: hashedPassword,
          role: "ADMIN",
          firmId: firm.id,
        },
      });

      return { user, firm };
    });

    return NextResponse.json(
      { 
        message: "User and Firm created successfully", 
        user: { email: result.user.email, name: result.user.name } 
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { 
        message: "Internal server error", 
        error: error.message || String(error),
        code: error.code
      },
      { status: 500 }
    );
  }
}
