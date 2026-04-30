import Link from "next/link";

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "" }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center ${className}`}>
      <span className="text-xl font-light tracking-[0.25em] text-foreground hover:opacity-80 transition-opacity uppercase" style={{ textRendering: "optimizeLegibility" }}>
        <span className="text-primary">Λ</span>UDIT<span className="text-primary">Λ</span>I
      </span>
    </Link>
  );
}
