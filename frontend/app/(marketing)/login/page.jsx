"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, AlertCircle, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-toastify";
import Logo from "../../components/Logo";
import { loginUser } from "@/services/auth.services";

// =============================================================================
// ZOD VALIDATION SCHEMA
// =============================================================================
const loginSchema = z.object({
  identifier: z.string().min(1, "Email or Username is required"),
  password: z.string().min(1, "Password is required"),
});

export default function LoginPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // React Hook Form initialized with Zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  // Submission Handler
  const onSubmit = async (data) => {
    setServerError("");

    const payload = {
      identifier: data.identifier,
      password: data.password,
    };

    try {
      console.log("Submitting payload:", payload);

      const response = await loginUser(payload);
      console.log("Registration response:", response);

      // 1. Show Success Toast
      toast.success(
        response?.message || "Account created successfully! Welcome aboard.",
      );

      // 2. Redirect User to Home / Dashboard
      router.push("/home");
    } catch (err) {
      console.error("Registration error:", err);

      // 3. Extract exact error message from backend or fallback to default
      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to register account. Please try again.";

      // 4. Update UI error states
      setServerError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300 flex items-center justify-center p-4 sm:p-6 lg:p-12 relative overflow-hidden selection:bg-blue-600 selection:text-white">
      {/* Precision Coordinate Graph Grid & Vignette Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(37,99,235,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(37,99,235,0.15)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(99,102,241,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.2)_1px,transparent_1px)] bg-[size:32px_32px] sm:bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,var(--background)_90%)] pointer-events-none" />

      {/* Ambient Pulsing Glow */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] bg-blue-600/15 rounded-full blur-[120px] sm:blur-[150px] pointer-events-none"
      />

      {/* Main Split Authentication Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="glass-card max-w-4xl w-full rounded-3xl overflow-hidden shadow-2xl border border-[var(--card-border)] grid grid-cols-1 md:grid-cols-12 relative z-10"
      >
        {/* =========================================================================
            LEFT COLUMN: Full-Size Cover Hero Image Panel (5 cols)
           ========================================================================= */}
        <div className="hidden md:flex md:col-span-5 relative flex-col justify-between p-7 border-r border-[var(--card-border)] overflow-hidden min-h-[480px]">
          {/* Full-bleed Background Hero Image Wrapper */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/login-hero.png"
              alt="AlphaMeet X Video Collaboration"
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover object-center"
              priority
            />
          </div>

          {/* Dark Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-slate-950/70 z-10 pointer-events-none" />

          {/* Top Branding Logo */}
          <div className="relative z-20 text-white [&_span]:!text-white">
            <Logo showText={true} />
          </div>

          {/* Bottom Headline Overlay */}
          <div className="relative z-20 space-y-1.5 pt-6 text-white">
            <h2 className="text-2xl font-black tracking-tight">
              Welcome back!
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              Login to continue to your account and join active video calls.
            </p>
          </div>
        </div>

        {/* =========================================================================
            RIGHT COLUMN: Login Form Controls (7 cols)
           ========================================================================= */}
        <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
          {/* Form Header */}
          <div className="space-y-2">
            <div className="md:hidden pb-2">
              <Logo showText={true} />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Login to your account
            </h1>
          </div>

          {/* Global Server Error Banner */}
          {serverError && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{serverError}</span>
            </div>
          )}

          {/* Form Fields */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
            noValidate
          >
            {/* Identifier (Email or Username) Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[var(--text-muted)]">
                Email or Username
              </label>
              <input
                type="text"
                {...register("identifier")}
                placeholder="username or email@example.com"
                className={`w-full px-4 py-3 rounded-xl input-theme text-sm font-medium transition-colors ${
                  errors.identifier ? "border-red-500 focus:border-red-500" : ""
                }`}
              />
              {errors.identifier && (
                <p className="text-[11px] text-red-500 font-medium pl-1">
                  {errors.identifier.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-[var(--text-muted)]">
                  Password
                </label>
                <Link
                  href="#"
                  className="text-xs text-blue-500 font-semibold hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="Enter Password"
                  className={`w-full pl-4 pr-10 py-3 rounded-xl input-theme text-sm font-medium transition-colors ${
                    errors.password ? "border-red-500 focus:border-red-500" : ""
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors p-1 rounded-md"
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-[11px] text-red-500 font-medium pl-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Login Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 shadow-lg shadow-blue-600/30 border border-blue-400/30 transition-all flex items-center justify-center gap-2 text-sm mt-2 cursor-pointer disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Logging in...</span>
                </>
              ) : (
                <>
                  <span>Login</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider Line */}
          <div className="relative flex items-center justify-center my-2">
            <div className="border-t border-[var(--card-border)] w-full" />
            <span className="bg-[var(--card-bg)] px-3 text-[11px] font-medium text-[var(--text-muted)] whitespace-nowrap uppercase tracking-wider absolute">
              or continue with
            </span>
          </div>

          {/* Google Sign-in Button */}
          <button
            type="button"
            className="w-full py-3 rounded-xl font-semibold text-xs sm:text-sm bg-[var(--nav-hover)] border border-[var(--card-border)] hover:border-blue-500/50 transition-all flex items-center justify-center gap-2.5 text-[var(--foreground)] shadow-sm"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Login with Google</span>
          </button>

          {/* Footer Register Link */}
          <p className="text-center text-xs text-[var(--text-muted)] pt-1">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-blue-500 font-bold hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
