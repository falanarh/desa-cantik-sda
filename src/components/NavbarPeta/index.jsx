import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";

export default function NavbarPeta() {
  return (
    <div className="sticky top-0 z-50 border-b-4 border-red-600">
      <Navbar className="bg-[#012640] h-[11vh] p-3 sm:p-4 mx-0 flex items-justify">
        <NavbarBrand justify="left">
          <img
            src="/pict/logo_dc.png"
            alt="Desa Cantik Logo"
            width={48}
            height={48}
          />
          <div className="ml-3">
            <p className="font-sfProDisplay font-medium text-white text-base leading-tight">
              PETA TEMATIK UMKM
              <br />
              <span className="font-sfProDisplay text-lg font-bold">DESA SIMOANGINANGIN</span>
            </p>
          </div>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {/* Add other NavbarItems if needed */}
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <Button as={Link} color="primary" href="#" variant="flat" className="bg-[#0F1820] font-medium text-white">
              Masuk
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </div>
  );
}
