
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, GraduationCap, ArrowRight } from "lucide-react";

const navigation = [
  { name: "Home", path: "/" },
  { name: "About", path: "/#about" },
  { name: "Courses", path: "/#courses" },
  { name: "Features", path: "/#features" },
  { name: "Contact", path: "/#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">

        {/* Logo */}
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          className="flex items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
            <GraduationCap size={26} />
          </div>

          <div>
            <h1 className="text-lg font-extrabold tracking-tight text-slate-900">
              Computer<span className="text-blue-600">Literacy</span>
            </h1>
            <p className="text-xs text-slate-500">
              Learning Portal
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 lg:flex">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.path}
              className="text-sm font-semibold text-slate-600 transition hover:text-blue-600"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-4 lg:flex">
          <Link
            to="/login"
            className="text-sm font-bold text-slate-700 transition hover:text-blue-600"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
          >
            Get Started
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 lg:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="border-t border-slate-200 bg-white px-5 py-5 lg:hidden">
          <div className="flex flex-col gap-5">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.path}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-semibold text-slate-700 hover:text-blue-600"
              >
                {item.name}
              </a>
            ))}

            <div className="flex flex-col gap-3 border-t border-slate-100 pt-4">
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg border border-slate-200 py-3 text-center text-sm font-bold text-slate-700"
              >
                Login
              </Link>

              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 text-sm font-bold text-white hover:bg-blue-700"
              >
                Get Started
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
