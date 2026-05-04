"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft, CreditCard, Lock, CheckCircle2 } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";

function SignupForm() {
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan");
  const isPro = plan === "pro";
  
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = isPro ? 3 : 1;
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    firmName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (currentStep < totalSteps) {
      setCurrentStep(s => s + 1);
    } else {
      setIsLoading(true);
      try {
        // 1. Register the User and Firm
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Something went wrong");
        }

        // 2. Automatically sign in
        const { signIn } = await import("next-auth/react");
        const result = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });

        if (result?.error) {
          throw new Error("Registration successful, but login failed. Please sign in manually.");
        }

        router.push("/dashboard");
        router.refresh();

      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(s => s - 1);
  };

  return (
    <>
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-white">
          {isPro ? "Upgrade to Pro Firm" : "Start your free trial"}
        </h2>
        <p className="text-sm text-slate-400 mt-2">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-primary hover:text-primary-dark transition-colors">
            Sign in
          </Link>
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm animate-in fade-in zoom-in duration-300">
          {error}
        </div>
      )}

      {/* Stepper UI (Only visible for Pro plan) */}
      {isPro && (
        <div className="mb-8">
          <div className="flex items-start justify-between relative">
            <div className="absolute left-0 top-4 -translate-y-1/2 w-full h-0.5 bg-slate-800 -z-10 rounded-full" />
            <div 
              className="absolute left-0 top-4 -translate-y-1/2 h-0.5 bg-primary transition-all duration-500 ease-in-out -z-10 rounded-full" 
              style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
            />
            
            {[
              { num: 1, label: "Account" },
              { num: 2, label: "Payment" },
              { num: 3, label: "Confirm" }
            ].map((step) => (
              <div key={step.num} className="flex flex-col items-center gap-2 relative">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-300 relative z-10 ${
                    currentStep >= step.num 
                      ? "bg-primary text-slate-950 shadow-[0_0_15px_rgba(14,165,233,0.4)]" 
                      : "bg-slate-800 text-slate-400 border border-slate-700"
                  }`}
                >
                  {currentStep > step.num ? <CheckCircle2 className="w-5 h-5" /> : step.num}
                </div>
                <span className={`text-xs font-medium ${currentStep >= step.num ? "text-primary" : "text-slate-500"}`}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <form className="space-y-6" onSubmit={handleNext}>
        
        {/* Step 1: Basic Info */}
        {currentStep === 1 && (
          <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-500">
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
                    value={formData.firstName}
                    onChange={handleChange}
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
                    value={formData.lastName}
                    onChange={handleChange}
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
                  value={formData.firmName}
                  onChange={handleChange}
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
                  value={formData.email}
                  onChange={handleChange}
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
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 bg-slate-900/50 border border-card-border rounded-xl text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
              <p className="mt-2 text-xs text-slate-500">Must be at least 8 characters long.</p>
            </div>
          </div>
        )}

        {/* Step 2: Payment Info */}
        {currentStep === 2 && isPro && (
          <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-500">
            {/* ... Payment Info Fields remain the same but add onChange if needed ... */}
          </div>
        )}

        {/* Step 3: Confirmation */}
        {currentStep === 3 && isPro && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            {/* ... Confirmation UI remains the same ... */}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="pt-4 flex gap-3">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={handleBack}
              disabled={isLoading}
              className="px-5 py-3.5 rounded-xl font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-medium text-white bg-primary hover:bg-primary-dark transition-all duration-300 shadow-[0_0_15px_rgba(14,165,233,0.2)] hover:shadow-[0_0_25px_rgba(14,165,233,0.4)] disabled:opacity-50 disabled:cursor-wait"
          >
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                {currentStep < totalSteps ? "Continue" : (isPro ? "Complete Purchase" : "Create Account")}
                {currentStep < totalSteps && <ArrowRight className="w-4 h-4" />}
              </>
            )}
          </button>
        </div>
      </form>
      
      {currentStep === 1 && (
        <p className="mt-6 text-center text-xs text-slate-500">
          By {isPro ? "continuing" : "creating an account"}, you agree to our{" "}
          <a href="#" className="font-medium text-primary hover:text-primary-dark">Terms of Service</a> and{" "}
          <a href="#" className="font-medium text-primary hover:text-primary-dark">Privacy Policy</a>.
        </p>
      )}
    </>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="text-center text-slate-400">Loading form...</div>}>
      <SignupForm />
    </Suspense>
  );
}
