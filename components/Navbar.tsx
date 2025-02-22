"use client";
import Link from "next/link";
import { BsHeart } from "react-icons/bs";
import { CiUser } from "react-icons/ci";
import { MdShoppingBasket } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { useEffect, useState } from "react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = !isOpen ? "hidden" : "auto";
  };

  const navLinks = [
    { name: "Shop", href: "/shop" },
    { name: "Men", href: "/men" },
    { name: "Women", href: "/women" },
    { name: "Combos", href: "/combos" },
  ];

  return (
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
              <Link href="/" className="text-xl font-bold" onClick={toggleMenu}>
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
              <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            {/* Mobile Navigation Links */}
            <div className="space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block py-2 text-lg font-medium hover:text-gray-900"
                  onClick={toggleMenu}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Mobile Action Buttons */}
            <div className="flex items-center space-x-6 mt-8">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <BsHeart size={24} />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <CiUser size={24} />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <MdShoppingBasket size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <section className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-4 md:py-0 hover:text-gray-900 px-3 text-sm font-medium"
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
              // value={searchQuery}
              // onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-100 rounded-md py-2 pl-4 pr-10 focus:outline-none"
            />
            <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <section className="navIcons hidden md:flex items-center space-x-6 px-3">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
            <BsHeart size={20} />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
            <CiUser size={20} />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
            <MdShoppingBasket size={20} />
          </button>
        </section>
      </div>
    </nav>
  );
};

export default NavBar;
