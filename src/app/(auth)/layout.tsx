import Link from "next/link";
import Logo from "@/components/Logo";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      {/* Background glow effects */}
      <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute -bottom-1/4 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8">
        <div className="flex justify-center">
          <Logo className="scale-110" />
        </div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-card-bg/80 backdrop-blur-xl py-8 px-4 shadow-2xl border border-card-border rounded-3xl sm:px-10 relative overflow-hidden">
          {/* Subtle top border highlight */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          
          {children}
        </div>
      </div>
    </div>
  );
}
