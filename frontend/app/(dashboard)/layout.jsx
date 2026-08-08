import Sidebar from "../components/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-4 md:p-8 w-full max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
}
