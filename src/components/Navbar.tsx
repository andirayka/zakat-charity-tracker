import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-foreground/5 backdrop-blur-md sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-lg font-semibold">
              Zakat Tracker
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link
              href="/"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-foreground/10"
            >
              Home
            </Link>
            <Link
              href="/zakat"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-foreground/10"
            >
              Calculator
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
