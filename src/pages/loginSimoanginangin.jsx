import { Button, Input } from "@nextui-org/react";
import Logo from "../assets/logo/umkm-unggul.png";

const Ellipse = () => {
  return (
    <div className="absolute z-0 flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 top-1/4 left-1/2">
      <div className="w-40 h-40 md:w-60 md:h-60 rounded-full bg-gradient-to-r from-pdarkblue to-[#CAF4FF]"></div>
    </div>
  );
};

const LoginSimoanginangin = () => {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-[#CAF4FF]">
      <Ellipse />
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-sm p-8 m-5 bg-white shadow-md rounded-xl md:max-w-md lg:max-w-lg">
        <div className="flex flex-col items-center mb-8">
          <img src={Logo} alt="Logo" className="w-20 h-20 mb-3 md:w-30 md:h-30" />
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
              label: "text-black text-base md:text-lg mt-1 font-nunito font-bold",
            }}
            isClearable
          />
          <Input
            label="Password"
            placeholder="Masukkan password anda"
            type="password"
            classNames={{
              label: "text-black text-base md:text-lg mt-1 font-nunito font-bold",
            }}
            isClearable
          />
          <div className="flex justify-center">
            <Button className="w-full md:w-10 font-bold font-nunito bg-[#0B588F] text-white">
              Masuk
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginSimoanginangin;
