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
  const [activeMenu, setActiveMenu] = useState(location.pathname);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNestedDropdownOpen, setIsNestedDropdownOpen] = useState(false);

  useEffect(() => {
    setActiveMenu(location.pathname);
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
    <Navbar className="bg-base sticky">
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
              className="mr-6"
            />
          </a>
          <span></span>
          <img
            src="/pict/logo_dc.png"
            alt="Desa Cantik Logo"
            width={48}
            height={48}
          />
          <p className="font-bold font-inter italic text-[14px] sm:text-[18px] text-pdarkblue ml-3 block xs:inline-block">
            DESA CANTIK <br />KABUPATEN SIDOARJO
          </p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden gap-4 sm:flex items-center">
        <NavbarItem className="hidden lg:flex">
          <Link
            href="/"
            className={getMenuClasses("/")}
            onClick={() => handleMenuClick("/")}
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
            <div className="absolute top-full left-0 bg-white shadow-lg rounded-md mt-3 z-10">
              <Link
                href="#"
                className="block px-4 py-2 font-assistant font-semibold hover:bg-white hover:text-[#F7BA74'] hover:rounded-md"
                style={{ color: '#D17410' }}
                onClick={() => handleDropdownClick("/peta-tematik/simoanginangin")}
                onMouseEnter={() => setIsNestedDropdownOpen(true)}
                onMouseLeave={() => setIsNestedDropdownOpen(false)}
              >
                Simoanginangin
                {isNestedDropdownOpen && (
                  <div className="absolute top-0 left-full bg-neutral-100 shadow-lg rounded-md mt-0 z-10">
                    <Link
                      href="#"
                      className="block px-4 py-2 font-assistant font-semibold hover:bg-neutral-100 hover:text-[#F7BA74'] hover:rounded-md"
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
        <NavbarItem className="hidden lg:flex px-5">
          <Link
            href="#"
            className="font-semibold font-assistant text-white bg-pdarkblue py-2 px-4 rounded-lg transition-colors duration-100 hover:bg-pblue-400 hover:outline-0 hover:outline-white"
          >
            Login
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        <NavbarMenuItem className="lg:flex">
          <Link
            href="/"
            className={getMenuClasses("/")}
            onClick={() => handleMenuClick("/")}
          >
            Beranda
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem className="lg:flex">
          <Link
            href="#"
            className={getMenuClasses("/peta-tematik")}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            Peta Tematik
            <ChevronDown fill="currentColor" size={16} className="ml-1" />
          </Link>
          {isDropdownOpen && (
            <div className="absolute top-full left-0 bg-base shadow-lg rounded-md mt-3 z-10">
              <Link
                href="#"
                className="block px-4 py-2 font-assistant font-semibold text-pdarkblue hover:bg-base hover:text-pblue hover:rounded-md"
                onClick={() => handleDropdownClick("/peta-tematik/simoanginangin")}
                onMouseEnter={() => setIsNestedDropdownOpen(true)}
                onMouseLeave={() => setIsNestedDropdownOpen(false)}
              >
                Simoanginangin
                {isNestedDropdownOpen && (
                  <div className="absolute top-0 left-full bg-base shadow-lg rounded-md mt-0 z-10">
                    <Link
                      href="#"
                      className="block px-4 py-2 font-assistant font-semibold text-pdarkblue hover:bg-base hover:text-pblue hover:rounded-md"
                      onClick={() => handleDropdownClick("/peta-tematik/pemetaan-umkm")}
                    >
                      Pemetaan UMKM
                    </Link>
                  </div>
                )}
              </Link>
            </div>
          )}
        </NavbarMenuItem>
        <NavbarMenuItem className="lg:flex">
          <Link
            href="/buletin"
            className={getMenuClasses("/buletin")}
            onClick={() => handleMenuClick("/buletin")}
          >
            Buletin
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem className="lg:flex">
          <Link
            href="/tentangkami"
            className={getMenuClasses("/tentangkami")}
            onClick={() => handleMenuClick("/tentangkami")}
          >
            Tentang Kami
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem className="lg:flex">
          <Link
            href="#"
            className="font-bold text-white bg-porange py-2 px-4 rounded-lg transition-colors duration-100 hover:bg-orange-400 hover:outline-0 hover:outline-white"
          >
            Login
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
