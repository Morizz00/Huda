import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center gap-4 px-6 text-center">
      <p dir="rtl" className="text-4xl font-semibold">
        هُدًى
      </p>
      <h1 className="text-2xl font-semibold">HUDA</h1>
      <p className="text-sm text-neutral-500">Guidance, wherever you are.</p>
      <div className="mt-4 flex gap-3">
        <Link
          href="/quran"
          className="rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white dark:bg-white dark:text-neutral-900"
        >
          Read Quran
        </Link>
        <Link
          href="/prayer"
          className="rounded-lg border border-neutral-300 px-5 py-2.5 text-sm font-medium dark:border-neutral-700"
        >
          Prayer Times
        </Link>
      </div>
    </main>
  );
}
