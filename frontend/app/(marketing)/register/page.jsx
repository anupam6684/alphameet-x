"use client";

import { toast } from "react-toastify";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, AlertCircle, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Logo from "../../components/Logo";
import { registerUser } from "@/services/auth.services";

// =============================================================================
// ZOD VALIDATION SCHEMA
// =============================================================================
const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(2, "Full name must be at least 2 characters")
      .max(50, "Full name is too long"),
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must be under 20 characters")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores",
      ),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(100, "Password is too long"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    agreeTerms: z.literal(true, {
      errorMap: () => ({ message: "You must accept the Terms & Conditions" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function RegisterPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");

  // Show / Hide Password Toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // React Hook Form initialized with Zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
    },
  });

  // Submission Handler
  const onSubmit = async (data) => {
    setServerError("");

    // Destructure required fields for backend payload
    const payload = {
      fullName: data.fullName,
      username: data.username,
      email: data.email,
      password: data.password,
      agreeTerms: data.agreeTerms,
    };

    try {
      console.log("Submitting payload:", payload);

      const response = await registerUser(payload);
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
        <div className="hidden md:flex md:col-span-5 relative flex-col justify-between p-7 border-r border-[var(--card-border)] overflow-hidden min-h-[560px]">
          {/* Full-bleed Background Hero Image Wrapper */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/register-hero.png"
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
              Create your account
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              Start connecting and collaborating face-to-face in high
              definition.
            </p>
          </div>
        </div>

        {/* =========================================================================
            RIGHT COLUMN: Registration Form Controls (7 cols)
           ========================================================================= */}
        <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-5">
          {/* Form Header */}
          <div className="space-y-1">
            <div className="md:hidden pb-2">
              <Logo showText={true} />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Create an account
            </h1>
          </div>

          {/* Global Server Error Display */}
          {serverError && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{serverError}</span>
            </div>
          )}

          {/* Form Fields */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-3"
            noValidate
          >
            {/* Full Name Field */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[var(--text-muted)]">
                Full Name
              </label>
              <input
                type="text"
                {...register("fullName")}
                placeholder="Enter Full Name "
                className={`w-full px-4 py-2 rounded-xl input-theme text-sm font-medium transition-colors ${
                  errors.fullName ? "border-red-500 focus:border-red-500" : ""
                }`}
              />
              {errors.fullName && (
                <p className="text-[11px] text-red-500 font-medium pl-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Username Field */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[var(--text-muted)]">
                Username
              </label>
              <input
                type="text"
                {...register("username")}
                placeholder="Enter User_name"
                className={`w-full px-4 py-2 rounded-xl input-theme text-sm font-medium transition-colors ${
                  errors.username ? "border-red-500 focus:border-red-500" : ""
                }`}
              />
              {errors.username && (
                <p className="text-[11px] text-red-500 font-medium pl-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[var(--text-muted)]">
                Email
              </label>
              <input
                type="email"
                {...register("email")}
                placeholder="name@example.com"
                className={`w-full px-4 py-2 rounded-xl input-theme text-sm font-medium transition-colors ${
                  errors.email ? "border-red-500 focus:border-red-500" : ""
                }`}
              />
              {errors.email && (
                <p className="text-[11px] text-red-500 font-medium pl-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field with Show/Hide Toggle */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[var(--text-muted)]">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="Enter Password"
                  className={`w-full pl-4 pr-10 py-2 rounded-xl input-theme text-sm font-medium transition-colors ${
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

            {/* Confirm Password Field with Show/Hide Toggle */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[var(--text-muted)]">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword")}
                  placeholder="Enter Confirm Password"
                  className={`w-full pl-4 pr-10 py-2 rounded-xl input-theme text-sm font-medium transition-colors ${
                    errors.confirmPassword
                      ? "border-red-500 focus:border-red-500"
                      : ""
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors p-1 rounded-md"
                  tabIndex={-1}
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-[11px] text-red-500 font-medium pl-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Terms Checkbox */}
            <div className="space-y-1 pt-1">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  {...register("agreeTerms")}
                  className="w-4 h-4 rounded accent-blue-600 cursor-pointer"
                />
                <label
                  htmlFor="agreeTerms"
                  className="text-xs text-[var(--text-muted)] cursor-pointer select-none"
                >
                  I agree to the{" "}
                  <Link
                    href="#"
                    className="text-blue-500 font-semibold hover:underline"
                  >
                    Terms &amp; Conditions
                  </Link>
                </label>
              </div>
              {errors.agreeTerms && (
                <p className="text-[11px] text-red-500 font-medium pl-1">
                  {errors.agreeTerms.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 shadow-lg shadow-blue-600/30 border border-blue-400/30 transition-all flex items-center justify-center gap-2 text-sm mt-2 cursor-pointer disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer Login Link */}
          <p className="text-center text-xs text-[var(--text-muted)] pt-1">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-500 font-bold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
