import Link from "next/link";
import Image from "next/image";

export default function Logo({ showText = true, className = "" }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 whitespace-nowrap group ${className}`}
    >
      {/* Container for logo image with subtle hover effect & shadow */}
      <div className="w-9 h-9 rounded-xl overflow-hidden flex items-center justify-center relative shrink-0 shadow-md shadow-blue-600/20 group-hover:scale-105 transition-transform duration-200">
        <Image
          src="/images/logo.png"
          alt="AlphaMeet X Logo"
          width={36}
          height={36}
          className="object-contain w-full h-full"
          priority
        />
      </div>

      {/* Brand Name Text */}
      {showText && (
        <span className="text-xl font-bold tracking-tight text-[var(--foreground)] leading-none">
          AlphaMeet{" "}
          <span className="text-blue-600 dark:text-blue-500 font-black">
            -X
          </span>
        </span>
      )}
    </Link>
  );
}
