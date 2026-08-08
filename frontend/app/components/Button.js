"use client";
import React from "react";

export default function Button({ children, variant = "primary", className = "", ...props }) {
  const base = "inline-flex items-center justify-center rounded-full px-4 py-2 font-medium transition focus:outline-none focus:ring-2";
  const variants = {
    primary: "bg-[#2563EB] text-white hover:bg-[#1e4fd8]",
    ghost: "bg-transparent border border-[var(--border)] text-[var(--foreground)] hover:bg-white/5",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button className={`${base} ${variants[variant] || variants.primary} ${className}`} {...props}>
      {children}
    </button>
  );
}
