import Footer from "../components/Footer";
import NavbarPetaKelengkeng from "../components/NavbarPeta/kelengkeng.jsx";
import MyMap from "../components/PetaSayuran";

const PetaSayuranGrogol = () => {
  return (
  
      <div className="w-full h-full relative">
      <NavbarPetaKelengkeng />
      <MyMap />
      <Footer />
      </div>
  );
};

export default PetaSayuranGrogol;
