import Sidebar from "../components/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="relative flex flex-col md:flex-row min-h-screen w-full bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300 overflow-hidden">
      {/* Precision Coordinate Graph Grid & Vignette Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(37,99,235,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(37,99,235,0.15)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(99,102,241,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.2)_1px,transparent_1px)] bg-[size:32px_32px] sm:bg-[size:40px_40px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,var(--background)_90%)] pointer-events-none z-0" />

      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area (Full Width without max-width constraints) */}
      <main className="relative z-10 flex-1 overflow-y-auto p-4 md:p-8 w-full">
        {children}
      </main>
    </div>
  );
}
