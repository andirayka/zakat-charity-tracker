import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Zakat Tracker</h1>
      <p className="text-lg text-foreground/80 mb-8 max-w-2xl">
        A simple and efficient way to track your Zakat contributions and manage
        your charitable giving.
      </p>
      <Link
        href="/zakat"
        className="bg-foreground text-background px-6 py-3 rounded-lg text-lg font-medium hover:bg-foreground/90 transition-colors"
      >
        Get Started
      </Link>
    </div>
  );
}
