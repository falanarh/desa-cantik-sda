import LoginSimoanginangin from "./pages/loginSimoanginangin";
import Beranda from "./pages/beranda";
import { Route, Routes, useNavigate } from "react-router-dom";
import AdminSimoanginangin from "./pages/adminSimoanginangin";
import { NextUIProvider } from "@nextui-org/system";

function App() {
  const navigate = useNavigate();

  return (
    <NextUIProvider navigate={navigate}>
      <Routes>
        <Route path="/" element={<Beranda />} />
        <Route path="/login-simoanginangin" element={<LoginSimoanginangin />} />
        <Route path="/admin-simoanginangin" element={<AdminSimoanginangin />} />
      </Routes>
    </NextUIProvider>
  );
}

export default App;
