import { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import Logo from "../assets/logo/umkm-unggul.png";
import { useNavigate } from "react-router-dom";
import "./pages.css";
import api from "../utils/api";
import { Spin } from "antd";

const contentStyle = {
  padding: 50,
  background: "#caf4ff85",
  borderRadius: 4,
};

const content = <div style={contentStyle} />;

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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!username && !password) {
      setError("Username dan password tidak boleh kosong");
      setLoading(false);
      return;
    } else if (!username) {
      setError("Username tidak boleh kosong");
      setLoading(false);
      return;
    } else if (!password) {
      setError("Password tidak boleh kosong");
      setLoading(false);
      return;
    }

    try {
      const response = await api.post("/api/auth/login", {
        username,
        password,
      });

      if (response.status === 200) {
        // Handle successful login
        console.log(response.data);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", username);
        setLoading(false);
        navigate("/admin-simoanginangin");
      }
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 200 range
        setError(error.response.data.message);
      } else {
        // Network error or other errors
        setError("Login failed. Please try again.");
      }
      setLoading(false);
    }
  };

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
        <form
          onSubmit={handleLogin}
          className="flex flex-col w-full font-quicksand form-login"
        >
          <Input
            label="Username"
            placeholder="Masukkan username anda"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            classNames={{
              label:
                "text-black text-base md:text-lg mt-[5px] font-nunito font-bold",
              inputWrapper: "bg-slate-100",
            }}
            className="my-2"
          />
          <Input
            label="Password"
            placeholder="Masukkan password anda"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            classNames={{
              label:
                "text-black text-base md:text-lg mt-1 font-nunito font-bold",
              inputWrapper: "bg-slate-100",
            }}
            className="my-2"
          />
          {error && (
            <p className="text-red-500 text-[14px] ml-[15px]">{error}</p>
          )}
          <div className="flex justify-center">
            <Button
              type="submit"
              className="w-full font-bold font-nunito bg-[#0B588F] text-white my-2"
            >
              Masuk
            </Button>
          </div>
        </form>
      </div>

      {loading && (
        <div className="w-screen h-screen bg-[#caf4ff85] flex justify-center items-center absolute z-50">
          {/* <BounceLoader color="#0B588F" /> */}
          <Spin tip="Loading" size="large" className="text-[16px] font-inter text-pdarkblue">
            {content}
          </Spin>
        </div>
      )}
    </div>
  );
};

export default LoginSimoanginangin;
