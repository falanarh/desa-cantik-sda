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
    setIsMenuOpen(false); // Close the menu after clicking
    setIsDropdownOpen(false); // Close dropdowns if open
    setIsNestedDropdownOpen(false); // Close nested dropdowns if open
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
      ? "font-bold font-inter text-[14px] text-white bg-porange py-2 px-4 rounded-full transition-colors duration-800"
      : "font-bold font-inter text-[14px] text-porange transition-colors duration-200";
  };

  return (
    <Navbar className="sticky top-0 z-50 bg-base">
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
          <p className="font-bold font-inter italic text-[14px] sm:text-[18px] text-pdarkblue ml-3 block xs:inline-block">
            DESA CANTIK <br /> KABUPATEN SIDOARJO
          </p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="items-center hidden gap-4 sm:flex">
        <NavbarItem className="hidden lg:flex">
          <Link
            href="/"
            className={getMenuClasses("Beranda")}
            onClick={() => handleMenuClick("Beranda")}
          >
            Beranda
          </Link>
        </NavbarItem>
        <NavbarItem className="relative hidden lg:flex">
          <Link
            href="#"
            className={getMenuClasses("/peta-tematik")}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            Peta Tematik
            <ChevronDown fill="currentColor" size={16} className="ml-1" />
          </Link>
          {isDropdownOpen && (
            <div className="absolute left-0 z-10 mt-3 rounded-md shadow-lg top-full bg-base">
              <Link
                href="#"
                className="block px-4 py-2 font-assistant font-semibold hover:bg-[#e9e8e8] hover:text-[#F7BA74] hover:rounded-md"
                style={{ color: '#D17410' }}
                onClick={() => handleDropdownClick("/peta-tematik/simoanginangin")}
                onMouseEnter={() => setIsNestedDropdownOpen(true)}
                onMouseLeave={() => setIsNestedDropdownOpen(false)}
              >
                Simoanginangin
                {isNestedDropdownOpen && (
                  <div className="absolute top-0 z-10 mt-0 rounded-md shadow-lg left-full bg-neutral-50">
                    <Link
                      href="#"
                      className="block px-4 py-2 font-assistant font-semibold hover:bg-neutral-00 hover:text-[#F7BA74] hover:rounded-md"
                      style={{ color: '#D17410' }}
                      onClick={() => handleDropdownClick("/peta-tematik/pemetaan-umkm")}
                    >
                      Pemetaan UMKM
                    </Link>
                  </div>
                )}
              </Link>
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
        <NavbarItem className="hidden px-5 lg:flex">
          <Link
            href="/login"
            className="px-4 py-2 font-bold text-white transition-colors duration-100 rounded-lg font-assistant bg-pdarkblue hover:bg-sky-700 hover:outline-0 hover:outline-white"
          >
            Login
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
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
            <div className="mt-3">
              <Link
                href="#"
                className="block px-4 py-2 font-semibold font-assistant text-porange hover:bg-base hover:text-orange-500"
                onClick={() => handleDropdownClick("/peta-tematik/simoanginangin")}
                onMouseEnter={() => setIsNestedDropdownOpen(true)}
              >
                Simoanginangin
              </Link>
              {isNestedDropdownOpen && (
                <div className="pl-4">
                  <Link
                    href="#"
                    className="block px-4 py-2 font-assistant font-semibold text-[#F7BA74] hover:bg-white hover:text-orange-500"
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
            className="px-4 py-2 font-bold text-white transition-colors duration-100 rounded-lg bg-pdarkblue hover:bg-sky-700 hover:outline-0 hover:outline-white"
          >
            Login
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
