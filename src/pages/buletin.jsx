import React from 'react';
import BuletinPage from "../components/Buletin";
import Header from "../components/Buletin/header";

const Buletin = () => {
  return (
    <div>
      <>
        <Header />
        <BuletinPage />
      </>
      <h1>Buletin Page</h1>
      <p>This is the content of the Buletin page.</p>
    </div>
  );
};

export default Buletin;