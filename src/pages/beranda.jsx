import React, { useEffect } from 'react';
import NavbarCustom from "../components/NavbarCustom";
import ListDesa from "../components/ListDesa";
import Stats from "../components/Stats";
import Desc from "../components/Desc";
import Footer from "../components/Footer/Footer";

const Beranda = () => {

  return (
    <>
      <NavbarCustom />
      <ListDesa />
      <Stats />
      <Desc />
      <Footer />
    </>
  );
};

export default Beranda;
