export default async function PreviewPage({ params }) {
  const { id } = await params;
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-6">
          <h2 className="text-xl font-semibold">Preview: {id}</h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-56 bg-zinc-900 rounded-md flex items-center justify-center text-white">
              Camera Preview
            </div>
            <div>
              <label className="block text-sm mb-1">Your name</label>
              <input
                className="w-full rounded-md border border-[var(--border)] px-3 py-2 mb-4"
                defaultValue="Guest"
              />

              <div className="flex items-center gap-3 mb-3">
                <button className="rounded-md border border-[var(--border)] px-3 py-2">
                  Toggle camera
                </button>
                <button className="rounded-md border border-[var(--border)] px-3 py-2">
                  Toggle mic
                </button>
              </div>

              <div className="flex gap-2">
                <button className="rounded-full bg-[#2563EB] px-4 py-2 text-white">
                  Join Meeting
                </button>
                <button className="rounded-full border border-[var(--border)] px-4 py-2">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
