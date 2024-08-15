import React, { useState, useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import { ChevronDown } from "./Icon.jsx"; // Ensure correct path
import { useNavigate, useLocation } from "react-router-dom";

export default function NavbarCustom() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState("Beranda");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNestedDropdownOpen, setIsNestedDropdownOpen] = useState(false);

  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/beranda") {
      setActiveMenu("Beranda");
    } else {
      setActiveMenu(location.pathname);
    }
  }, [location.pathname]);

  const handleMenuClick = (route) => {
    setActiveMenu(route);
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
    setIsNestedDropdownOpen(false);
    navigate(route);
  };

  const handleDropdownClick = (route) => {
    setActiveMenu(route);
    setIsDropdownOpen(false);
    setIsNestedDropdownOpen(false);
    navigate(route);
  };

  const getMenuClasses = (menu) => {
    return activeMenu === menu
      ? "font-bold font-inter text-sm text-white bg-porange py-2 px-4 rounded-full transition-colors duration-300"
      : "font-bold font-inter text-sm text-porange transition-colors duration-200";
  };

  return (
    <Navbar className="bg-base sticky top-0 z-50 shadow-md">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
        <NavbarBrand className="flex items-center">
          <a href="https://pahlawan140.com" target="_blank" rel="noopener noreferrer">
            <img
              src="https://www.bps.go.id/_next/image?url=%2Fassets%2Flogo-bps.png&w=1080&q=75"
              alt="BPS Logo"
              width={45}
              height={45}
              className="mr-2"
            />
          </a>
          <img
            src="/pict/logo_dc.png"
            alt="Desa Cantik Logo"
            width={48}
            height={48}
            className="mr-2"
          />
          <p className="font-bold font-inter italic text-[14px] sm:text-[18px] text-pdarkblue ml-3">
            DESA CANTIK <br /> KABUPATEN SIDOARJO
          </p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4 items-center">
        <NavbarItem className="hidden lg:flex">
          <Link
            href="/"
            className={getMenuClasses("Beranda")}
            onClick={() => handleMenuClick("Beranda")}
          >
            Beranda
          </Link>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex relative">
          <Link
            href="#"
            className={getMenuClasses("/peta-tematik")}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            Peta Tematik
            <ChevronDown fill="currentColor" size={16} className="ml-1" />
          </Link>
          {isDropdownOpen && (
            <div className="absolute top-full left-0 bg-base border border-gray-300 shadow-xl rounded-lg mt-4 z-10">
              <div
                href="#"
                className="block px-4 py-2 text-sm font-semibold text-porange hover:bg-[#f8f9fa] hover:text-[#F7BA74] rounded-md"
                // onClick={() => handleDropdownClick("/peta-tematik/simoanginangin")}
                onMouseEnter={() => setIsNestedDropdownOpen(true)}
                onMouseLeave={() => setIsNestedDropdownOpen(false)}
              >
                Simoanginangin
                {isNestedDropdownOpen && (
                <div className="absolute top-0 left-full bg-neutral-50 border border-gray-300 shadow-lg rounded-lg mt-0 ml-0 z-10">
                  <Link
                    href="https://desa-cantik-sda.vercel.app/peta-umkm-simoanginangin"
                    className="block px-4 py-2 text-sm font-semibold bg-base text-porange hover:text-[#F7BA74] rounded-md transition-colors duration-300"
                    onClick={() => handleDropdownClick("/peta-tematik/pemetaan-umkm")}
                  >
                    Pemetaan UMKM
                  </Link>
                </div>
              )}
              </div>
            </div>
          )}
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <Link
            href="/buletin"
            className={getMenuClasses("/buletin")}
            onClick={() => handleMenuClick("/buletin")}
          >
            Buletin
          </Link>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <Link
            href="/tentangkami"
            className={getMenuClasses("/tentangkami")}
            onClick={() => handleMenuClick("/tentangkami")}
          >
            Tentang Kami
          </Link>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex px-5">
          <Link
            href="/login"
            className="font-bold text-white bg-pdarkblue py-2 px-4 rounded-lg transition-colors duration-100 hover:bg-sky-700"
          >
            Login
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className={`${isMenuOpen ? "block" : "hidden"} sm:hidden`}>
        <NavbarMenuItem>
          <Link
            href="/beranda"
            className={getMenuClasses("Beranda")}
            onClick={() => handleMenuClick("Beranda")}
          >
            Beranda
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link
            href="#"
            className={getMenuClasses("/peta-tematik")}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            Peta Tematik
            <ChevronDown fill="currentColor" size={16} className="ml-1" />
          </Link>
          {isDropdownOpen && (
            <div className="mt-3 border border-gray-200 shadow-md rounded-md">
              <Link
                href="#"
                className="block px-4 py-2 text-sm font-semibold text-porange hover:bg-base hover:text-orange-500"
                onClick={() => handleDropdownClick("/peta-tematik/simoanginangin")}
                onMouseEnter={() => setIsNestedDropdownOpen(true)}
              >
                Simoanginangin
              </Link>
              {isNestedDropdownOpen && (
                <div className="pl-4">
                  <Link
                    href="#"
                    className="block px-4 py-2 text-sm font-semibold text-porange hover:bg-[#f8f9fa] hover:text-orange-500"
                    onClick={() => handleDropdownClick("/peta-tematik/pemetaan-umkm")}
                  >
                    Pemetaan UMKM
                  </Link>
                </div>
              )}
            </div>
          )}
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link
            href="/buletin"
            className={getMenuClasses("/buletin")}
            onClick={() => handleMenuClick("/buletin")}
          >
            Buletin
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link
            href="/tentangkami"
            className={getMenuClasses("/tentangkami")}
            onClick={() => handleMenuClick("/tentangkami")}
          >
            Tentang Kami
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link
            href="/login"
            className="font-bold text-white bg-pdarkblue py-2 px-4 rounded-lg transition-colors duration-100 hover:bg-sky-700"
          >
            Login
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
