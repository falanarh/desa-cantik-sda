import LoginSimoanginangin from "./pages/loginSimoanginangin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Beranda from "./pages/beranda";
import Buletin from "./pages/buletin";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Beranda />} />
          <Route path="/beranda" element={<Beranda />} />
          <Route path="/buletin" element={<Buletin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
