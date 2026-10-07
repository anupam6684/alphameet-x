"use client";

import { useApp } from "@/context/AppContext";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Camera, Save, Loader2 } from "lucide-react";

// Staggered Container Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function ProfilePage() {
  const { user, setUser } = useApp();
  const [isSaving, setIsSaving] = useState(false);

  // Initialize state cleanly with fallback values to prevent undefined access
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    bio: "",
    avatar: "",
  });

  // Sync user data once when user object loads
  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        username: user.username || "",
        email: user.email || "",
        phone: user.phone || "",
        bio: user.bio || "",
        avatar: user.avatar || "",
      });
    }
  }, [user]); // Added proper dependency array!

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // Simulate API update or call your backend endpoint here
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update global context state
      if (setUser) {
        setUser((prev) => ({ ...prev, ...formData }));
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 w-full max-w-5xl mx-auto py-2"
    >
      {/* Page Title */}
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Profile
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-muted)] font-medium mt-1">
          Manage your personal information
        </p>
      </motion.div>

      {/* Main Split Content Grid */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pt-2"
      >
        {/* =========================================================================
            LEFT COLUMN: Avatar Showcase & Camera Upload Badge (4 cols)
           ========================================================================= */}
        <div className="md:col-span-4 flex flex-col items-center justify-center p-6">
          <div className="relative group cursor-pointer">
            {/* Main Circular Profile Picture Container */}
            <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full border-2 border-blue-500/40 p-1 shadow-2xl relative overflow-hidden bg-slate-800">
              <Image
                src={formData.avatar || "/images/person1.png"}
                alt="Profile Avatar"
                fill
                sizes="(max-width: 640px) 144px, 176px"
                className="object-cover rounded-full"
                priority
              />
            </div>

            {/* Camera Upload Badge Overlay */}
            <button
              type="button"
              className="absolute bottom-1 right-1 w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-500 text-white border-2 border-[var(--background)] flex items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer"
              aria-label="Upload new avatar"
            >
              <Camera className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* =========================================================================
            RIGHT COLUMN: Editable Profile Form Card (8 cols)
           ========================================================================= */}
        <div className="md:col-span-8">
          <form
            onSubmit={handleSubmit}
            className="glass-card p-6 sm:p-8 rounded-3xl border border-[var(--card-border)] space-y-5 shadow-xl bg-slate-900/40"
          >
            {/* Full Name Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[var(--text-muted)]">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Anupam Jana"
                className="w-full px-4 py-3 rounded-xl input-theme text-sm font-medium transition-colors"
              />
            </div>

            {/* Username Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[var(--text-muted)]">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="anupam"
                className="w-full px-4 py-3 rounded-xl input-theme text-sm font-medium transition-colors"
              />
            </div>

            {/* Email Address Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[var(--text-muted)]">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="anupam@example.com"
                className="w-full px-4 py-3 rounded-xl input-theme text-sm font-medium transition-colors"
              />
            </div>

            {/* Phone Number Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[var(--text-muted)]">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className="w-full px-4 py-3 rounded-xl input-theme text-sm font-medium transition-colors"
              />
            </div>

            {/* Bio Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[var(--text-muted)]">
                Bio
              </label>
              <textarea
                name="bio"
                rows={3}
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell us about yourself..."
                className="w-full px-4 py-3 rounded-xl input-theme text-sm font-medium transition-colors resize-none"
              />
            </div>

            {/* Save Changes Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={isSaving}
              className="w-full py-3.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 shadow-lg shadow-blue-600/30 border border-blue-400/30 transition-all flex items-center justify-center gap-2 text-sm mt-4 cursor-pointer disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving Changes...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </>
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}
