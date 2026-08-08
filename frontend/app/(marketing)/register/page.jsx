import Navbar from "../../components/Navbar";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-md">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 shadow">
            <h2 className="text-2xl font-semibold mb-2">Create an account</h2>
            <p className="text-sm text-[var(--muted)] mb-4">
              Start using AlphaMeet X for free.
            </p>

            <form className="space-y-4">
              <div>
                <label className="text-sm mb-1 block">Full name</label>
                <input
                  className="w-full rounded-md border border-[var(--border)] px-3 py-2 bg-transparent"
                  type="text"
                />
              </div>

              <div>
                <label className="text-sm mb-1 block">Email</label>
                <input
                  className="w-full rounded-md border border-[var(--border)] px-3 py-2 bg-transparent"
                  type="email"
                />
              </div>

              <div>
                <label className="text-sm mb-1 block">Password</label>
                <input
                  className="w-full rounded-md border border-[var(--border)] px-3 py-2 bg-transparent"
                  type="password"
                />
              </div>

              <div>
                <label className="text-sm mb-1 block">Confirm password</label>
                <input
                  className="w-full rounded-md border border-[var(--border)] px-3 py-2 bg-transparent"
                  type="password"
                />
              </div>

              <div className="flex items-center gap-2 text-sm">
                <input type="checkbox" /> I agree to the Terms
              </div>

              <div>
                <button className="w-full rounded-full bg-[#2563EB] px-4 py-2 text-white">
                  Register
                </button>
              </div>

              <div className="text-sm text-center">
                Already have an account?{" "}
                <Link href="/login">
                  <span className="text-[#2563EB]">Log in</span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
