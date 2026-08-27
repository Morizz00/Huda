import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center gap-4 px-6 text-center">
      <p dir="rtl" className="text-4xl font-semibold">
        هُدًى
      </p>
      <h1 className="text-2xl font-semibold">HUDA</h1>
      <p className="text-sm text-neutral-500">Guidance, wherever you are.</p>
      <Link
        href="/prayer"
        className="mt-4 rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white dark:bg-white dark:text-neutral-900"
      >
        View Prayer Times
      </Link>
    </main>
  );
}
