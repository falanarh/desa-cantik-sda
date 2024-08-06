import LoginSimoanginangin from "./pages/loginSimoanginangin";
import AdminSimoanginangin from "./pages/adminSimoanginangin";
import Beranda from "./pages/beranda";
import { Route, Routes, useNavigate } from "react-router-dom";
import Buletin from "./pages/buletin";
import TentangKami from "./pages/tentangkami";
import Login from "./pages/login";
import { NextUIProvider } from "@nextui-org/system";
import PetaUMKMSimonaginagin from "./pages/petaUMKMSimoanginagin";
import ProtectedRoute from "./hooks/ProtectedRoute";
import Admin from "./pages/admin";
import BuletinAd from "./pages/buletinAdmin";

function App() {
  const navigate = useNavigate();

  return (
    <NextUIProvider navigate={navigate}>
      <Routes>
        <Route path="/" element={<Beranda />} />
        <Route path="/buletin" element={<Buletin />} />
        <Route path="/tentangkami" element={<TentangKami />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login-simoanginangin" element={<LoginSimoanginangin />} />
        <Route
          path="/admin-simoanginangin"
          element={
            <ProtectedRoute>
              <AdminSimoanginangin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/peta-umkm-simoanginangin"
          element={<PetaUMKMSimonaginagin />}
        />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/buletin" element={<BuletinAd />} />
      </Routes>
    </NextUIProvider>
  );
}

export default App;
