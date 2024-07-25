import { Button, Input } from "@nextui-org/react";
import Logo from "../assets/logo/umkm-unggul.png";
import { Link } from "react-router-dom";
import "./pages.css";

const TopEllipse = () => {
  return (
    <div className="absolute z-0 flex items-center justify-center top-[calc(50%-260px)] md:top-[5%] md:transform md:-translate-x-[224px] md:translate-y-[110%] 2xl:translate-y-[75%]">
      <div className="size-[100px] rounded-full bg-gradient-to-r from-pdarkblue to-[#CAF4FF]"></div>
    </div>
  );
};

const BottomEllipse = () => {
  return (
    <div className="absolute z-0 flex items-center justify-center bottom-[calc(50%-260px)] md:bottom-[5%] md:transform md:translate-x-[224px] md:-translate-y-[110%] 2xl:-translate-y-[75%]">
      <div className="size-[100px] rounded-full bg-[#f3fdff]"></div>
    </div>
  );
};

const LoginSimoanginangin = () => {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-[#CAF4FF]">
      <TopEllipse />
      <BottomEllipse />
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-sm p-8 m-5 bg-white shadow-md rounded-xl md:max-w-md">
        <div className="flex flex-col items-center mb-8">
          <img
            src={Logo}
            alt="Logo"
            className="w-20 h-20 mb-3 md:w-30 md:h-30"
          />
          <p className="text-lg italic font-bold font-inter text-pdarkblue md:text-xl">
            UMKM UNGGUL
          </p>
          <p className="text-sm font-semibold tracking-wider text-gray-500 font-assistant">
            DESA SIMOANGINANGIN
          </p>
        </div>
        <form className="flex flex-col w-full gap-4 font-quicksand">
          <Input
            label="Username"
            placeholder="Masukkan username anda"
            type="text"
            classNames={{
              label:
                "text-black text-base md:text-lg mt-[5px] font-nunito font-bold",
                inputWrapper: "bg-slate-100",
            }}
            isClearable
          />
          <Input
            label="Password"
            placeholder="Masukkan password anda"
            type="password"
            classNames={{
              label:
                "text-black text-base md:text-lg mt-1 font-nunito font-bold",
                inputWrapper: "bg-slate-100",
            }}
            isClearable
          />
          <div className="flex justify-center">
            <Button className="w-full font-bold font-nunito bg-[#0B588F] text-white">
              <Link to="/admin-simoanginangin" className="w-full">
                Masuk
              </Link>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginSimoanginangin;
