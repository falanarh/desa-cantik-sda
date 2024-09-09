import LoginSimoanginangin from "./pages/loginSimoanginangin";
import LoginSimoKetawang from "./pages/loginSimoketawang";
import AdminSimoanginangin from "./pages/adminSimoanginangin";
import AdminSimoketawang from "./pages/adminSimoketawang";
import Beranda from "./pages/beranda";
import { Route, Routes, useNavigate } from "react-router-dom";
import Buletin from "./pages/buletin";
import TentangKami from "./pages/tentangkami";
import Login from "./pages/login";
import { NextUIProvider } from "@nextui-org/system";
import PetaUMKMSimonaginagin from "./pages/petaUMKMSimoanginagin";
import PetaKelengkengSimoketawang from "./pages/petaKelengkengSimoketawang";
import PetaSayuranGrogol from "./pages/petaSayuranGrogol";
import Admin from "./pages/admin";
import BuletinAd from "./pages/buletinAdmin";
import MenuAd from "./pages/menuAdm";
import BerandaAdm from "./pages/berandaAdm";
import DescAdmin from "./pages/deskripsiAdmin";
import StatAdm from "./pages/statAdmin";
import UsAdm from "./pages/usAdmin";
import ProtectedRouteSimoanginangin from "./hooks/ProtectedRouteSimoanginangin";
import ProtectedRouteSimoketawang from "./hooks/ProtectedRouteSimoketawang";
import NotFoundPage from "./pages/notFoundPage";
import LoginGrogol from "./pages/loginGrogol";
import ProtectedRouteGrogol from "./hooks/ProtectedRouteGrogol";
import AdminGrogol from "./pages/adminGrogol";

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
        <Route path="/login-simoketawang" element={<LoginSimoKetawang />} />
        <Route path="/login-grogol" element={<LoginGrogol />} />
        <Route
          path="/admin-simoanginangin"
          element={
            <ProtectedRouteSimoanginangin>
              <AdminSimoanginangin />
            </ProtectedRouteSimoanginangin>
          }
        />
        <Route
          path="/admin-simoketawang"
          element={
            <ProtectedRouteSimoketawang>
              <AdminSimoketawang />
            </ProtectedRouteSimoketawang>
          }
        />
        <Route
          path="/admin-grogol"
          element={
            <ProtectedRouteGrogol>
              <AdminGrogol />
            </ProtectedRouteGrogol>
          }
        />
        <Route
          path="/peta-umkm-simoanginangin"
          element={<PetaUMKMSimonaginagin />}
        />
        <Route
          path="/peta-kelengkeng-simoketawang"
          element={<PetaKelengkengSimoketawang />}
        />
        <Route path="/peta-sayuran-grogol" element={<PetaSayuranGrogol />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/buletin" element={<BuletinAd />} />
        <Route path="/admin/navbar" element={<MenuAd />} />
        <Route path="/admin/dashboard" element={<BerandaAdm />} />
        <Route path="/admin/desc" element={<DescAdmin />} />
        <Route path="/admin/stat" element={<StatAdm />} />
        <Route path="/admin/us" element={<UsAdm />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </NextUIProvider>
  );
}

export default App;
