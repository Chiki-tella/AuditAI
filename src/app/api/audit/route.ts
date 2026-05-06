import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.firmId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const firmId = session.user.firmId;

    // 1. Fetch the firm for the authenticated user
    const firm = await prisma.firm.findUnique({
      where: { id: firmId },
    });

    if (!firm) {
      return NextResponse.json({ error: "Firm not found" }, { status: 404 });
    }

    const isFree = firm.subscriptionStatus === "TRIALING";

    // 2. Quota Check
    if (isFree && firm.scansUsed >= firm.scansLimit) {
      return NextResponse.json(
        { error: "Scan quota exceeded", code: "QUOTA_EXCEEDED" },
        { status: 403 }
      );
    }

    // 3. Proceed with the scan (Mocked scan logic)
    // Extract file or data from request if necessary
    // const body = await req.json();

    // -- SCAN LOGIC HERE --
    const scanSuccess = true; // Simulating a successful scan

    if (!scanSuccess) {
      throw new Error("Scan failed to process");
    }
    // -- END SCAN LOGIC --

    // 4. After successful scan, increment scansUsed
    await prisma.firm.update({
      where: { id: firm.id },
      data: { scansUsed: { increment: 1 } },
    });

    return NextResponse.json({ message: "Scan completed successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Audit scan error:", error);
    return NextResponse.json(
      { error: "Internal server error processing scan" },
      { status: 500 }
    );
  }
}
