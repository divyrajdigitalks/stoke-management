"use client";

import { useState } from "react";
import { Phone, ArrowRight, Lock, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoginPage() {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();

    // Only allow exactly 10 digits
    if (mobile.length !== 10) {
      alert("Please enter valid 10 digit mobile number");
      return;
    }

    setStep(2);
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();

    // Demo OTP validation
    // Any 6 digit OTP will work for now

    
    // Redirect after login
    window.location.href = "/";
  };

  return (
    <div className=" flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 bg-white/90 backdrop-blur-xl border border-zinc-200 rounded-[32px] shadow-2xl shadow-orange-500/10 dark:bg-zinc-900 dark:border-zinc-800"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-orange-500/30">
            {step === 1 ? (
              <Phone className="w-9 h-9" />
            ) : (
              <Lock className="w-9 h-9" />
            )}
          </div>

          <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white">
            {step === 1 ? "Welcome Back" : "Verify OTP"}
          </h1>

          <p className="text-zinc-500 text-sm mt-2 leading-relaxed">
            {step === 1
              ? "Login to access wholesale products and pricing."
              : `Enter the 6-digit OTP sent to +91 ${mobile}`}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.form
              key="mobile-step"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSendOtp}
              className="space-y-5"
            >
              <div className="space-y-2">
                <label className="text-xs font-black text-zinc-500 uppercase tracking-[0.2em] ml-1">
                  Mobile Number
                </label>

                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-base font-bold text-zinc-400">
                    +91
                  </span>

                  <input
                    type="tel"
                    maxLength={10}
                    placeholder="9876543210"
                    value={mobile}
                    onChange={(e) =>
                      setMobile(
                        e.target.value.replace(/\D/g, "")
                      )
                    }
                    className="w-full pl-16 pr-4 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl text-lg font-bold focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-orange-500/30 hover:scale-[1.02] hover:shadow-orange-500/40 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Send OTP
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.form>
          ) : (
            <motion.form
              key="otp-step"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleVerify}
              className="space-y-6"
            >
              <div className="space-y-2">
                <label className="text-xs font-black text-zinc-500 uppercase tracking-[0.2em] ml-1">
                  Enter OTP
                </label>

              <input
  type="text"
  maxLength={6}
  placeholder="******"
  value={otp}
  onChange={(e) =>
    setOtp(
      e.target.value.replace(/\D/g, "")
    )
  }
  className="w-full py-4 px-5 bg-zinc-50 border border-zinc-200 rounded-2xl text-center tracking-[0.5em] text-2xl font-black focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
  required
/>
              </div>

              <div className="space-y-3">
                <button
                  type="submit"
                  className="w-full py-4 bg-zinc-900 text-white rounded-2xl font-bold text-lg shadow-xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 dark:bg-white dark:text-zinc-900"
                >
                  Verify & Login
                  <CheckCircle2 className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full py-2 text-sm font-bold text-zinc-500 hover:text-orange-600 transition-colors"
                >
                  Change Mobile Number
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        <p className="mt-8 text-center text-xs text-zinc-400 leading-relaxed">
          By continuing, you agree to our{" "}
          <span className="underline cursor-pointer">
            Terms
          </span>{" "}
          and{" "}
          <span className="underline cursor-pointer">
            Privacy Policy
          </span>
          .
        </p>
      </motion.div>
    </div>
  );
}