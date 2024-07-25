import LoginSimoanginangin from "./pages/loginSimoanginangin";
import AdminSimoanginangin from "./pages/adminSimoanginangin";
import Beranda from "./pages/beranda";
import { Route, Routes, useNavigate } from "react-router-dom";
import Buletin from "./pages/buletin";
import TentangKami from "./pages/tentangkami";
import { NextUIProvider } from "@nextui-org/system";

function App() {
  const navigate = useNavigate();

  return (
    <NextUIProvider navigate={navigate}>
        <Routes>
          <Route index element={<Beranda />} />
          <Route path="/beranda" element={<Beranda />} />
          <Route path="/buletin" element={<Buletin />} />
          <Route path="/tentangkami" element={<TentangKami />} />
        <Route path="/login-simoanginangin" element={<LoginSimoanginangin />} />
        <Route path="/admin-simoanginangin" element={<AdminSimoanginangin />} />
      </Routes>
    </NextUIProvider>
  );
}

export default App;
