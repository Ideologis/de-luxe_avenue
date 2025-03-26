"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { setLoading } from "@/store/features/loadingSlice";
import { useAppDispatch, useAppSelector } from "@/store/hook";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [hasScrolled, setHasScrolled] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const router = useRouter();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);

  // Calculate total unique items in cart
  const cartItemCount = Object.keys(cartItems).length;

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCartNavigation = () => {
    dispatch(setLoading(true));
    router.push("/cart");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = !isOpen ? "hidden" : "auto";
  };

  const navLinks = [
    { name: "Formal", href: "#formal" },
    { name: "Casual", href: "#casual" },
    { name: "New Arrivals", href: "#new-arrivals" },
  ];

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          hasScrolled ? "bg-white/90 backdrop-blur-md shadow-md" : "bg-white"
        } pt-safe-top`}
      >
        <div className="relative flex justify-between items-center p-4 md:px-8">
          <section className="logo">
            <Link href="/" className="text-xl font-bold">
              <span>DE-LUXE</span>
            </Link>
          </section>
          <div className="flex items-center">
            <Link
              href="/cart"
              onClick={handleCartNavigation}
              className="relative p-2 mr-2 md:hidden hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              🛒
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span
                  className={`w-full h-0.5 bg-black transition-all duration-300 ${
                    isOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-black transition-all duration-300 ${
                    isOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-black transition-all duration-300 ${
                    isOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                />
              </div>
            </button>
          </div>

          {/* Mobile slide-out menu */}
          <div
            className={`fixed inset-0 bg-black/50 transition-opacity duration-300 md:hidden ${
              isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={toggleMenu}
          />

          <div
            className={`fixed top-0 left-0 h-full w-4/5 max-w-sm bg-white transform transition-transform duration-300 ease-in-out pt-safe-top ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            } md:hidden`}
          >
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between mb-8">
                <Link
                  href="/"
                  className="text-xl font-bold"
                  onClick={toggleMenu}
                >
                  DE-LUXE
                </Link>
              </div>

              {/* Mobile Search */}
              <div className="relative mb-6">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-100 rounded-lg py-3 pl-4 pr-10 focus:outline-none"
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  aria-hidden="true"
                >
                  🔍
                </span>
              </div>

              {/* Mobile Navigation Links */}
              <div className="space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block py-2 bg-white text-lg font-medium hover:text-gray-900"
                    onClick={toggleMenu}
                    passHref
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* Mobile Action Buttons */}
              <div className="flex items-center space-x-6 mt-8">
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  ❤️
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  👤
                </button>
                <Link
                  href="/cart"
                  onClick={toggleMenu}
                  className="relative p-2 hover:bg-gray-100 rounded-full"
                >
                  🛒
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <section className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-4 md:py-0 text-sm font-medium px-3 transition-colors duration-200 hover:bg-gray-200 hover:text-gray-900 active:bg-gray-300"
            
                passHref
              >
                {link.name}
              </Link>
            ))}
          </section>
          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-xs ml-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search"
                className="w-full bg-gray-100 rounded-md py-2 pl-4 pr-10 focus:outline-none"
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                aria-hidden="true"
              >
                🔍
              </span>
            </div>
          </div>
          <section className="navIcons hidden md:flex items-center space-x-6 px-3">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
              ❤️
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
              👤
            </button>
            <Link
              href="/cart"
              onClick={handleCartNavigation}
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              🛒
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </section>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
