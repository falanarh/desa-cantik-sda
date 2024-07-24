import LoginSimoanginangin from "./pages/loginSimoanginangin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import LoginSimoanginangin from "./pages/loginSimoanginangin";
import Beranda from "./pages/beranda";
import Buletin from "./pages/buletin";
import TentangKami from "./pages/tentangkami";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Beranda />} />
          <Route path="/beranda" element={<Beranda />} />
          <Route path="/buletin" element={<Buletin />} />
          <Route path="/tentangkami" element={<TentangKami />} />
        </Routes>
      </BrowserRouter>
      {/* <Beranda /> */}
      {/* <LoginSimoanginangin /> */}
    </div>
  );
}

export default App;
