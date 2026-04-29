import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function SignupPage() {
  return (
    <>
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-white">Start your free trial</h2>
        <p className="text-sm text-slate-400 mt-2">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-primary hover:text-primary-dark transition-colors">
            Sign in
          </Link>
        </p>
      </div>

      <form className="space-y-5" action="#" method="POST">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-slate-300">
              First Name
            </label>
            <div className="mt-2">
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                className="block w-full px-4 py-3 bg-slate-900/50 border border-card-border rounded-xl text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all sm:text-sm"
                placeholder="Jane"
              />
            </div>
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-slate-300">
              Last Name
            </label>
            <div className="mt-2">
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                className="block w-full px-4 py-3 bg-slate-900/50 border border-card-border rounded-xl text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all sm:text-sm"
                placeholder="Doe"
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="firmName" className="block text-sm font-medium text-slate-300">
            Accounting Firm Name
          </label>
          <div className="mt-2">
            <input
              id="firmName"
              name="firmName"
              type="text"
              required
              className="block w-full px-4 py-3 bg-slate-900/50 border border-card-border rounded-xl text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all sm:text-sm"
              placeholder="Doe & Associates CPAs"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-300">
            Work Email
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="block w-full px-4 py-3 bg-slate-900/50 border border-card-border rounded-xl text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all sm:text-sm"
              placeholder="jane@accountingfirm.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-slate-300">
            Password
          </label>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              className="block w-full px-4 py-3 bg-slate-900/50 border border-card-border rounded-xl text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all sm:text-sm"
              placeholder="••••••••"
            />
          </div>
          <p className="mt-2 text-xs text-slate-500">Must be at least 8 characters long.</p>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-medium text-white bg-primary hover:bg-primary-dark transition-all duration-300 shadow-[0_0_15px_rgba(14,165,233,0.2)] hover:shadow-[0_0_25px_rgba(14,165,233,0.4)]"
          >
            Create Account
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
      
      <p className="mt-6 text-center text-xs text-slate-500">
        By creating an account, you agree to our{" "}
        <a href="#" className="font-medium text-primary hover:text-primary-dark">Terms of Service</a> and{" "}
        <a href="#" className="font-medium text-primary hover:text-primary-dark">Privacy Policy</a>.
      </p>
    </>
  );
}
