import React from "react";
import {
  Image
} from "@nextui-org/react";

function WelcomeCustom() {
  return (
    <div>
      <Image
        src="/pict/logo_dc.png"
        alt="Desa Cantik"
        layout="responsive"
        width={500}
        height={500}
      />
    </div>
  );
}

export default WelcomeCustom;