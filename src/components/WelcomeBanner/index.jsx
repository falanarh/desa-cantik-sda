import React from "react";
import { Image } from "@nextui-org/react";

export default function WelcomeBanner() {
  return (
    <div className="welcome-banner" style={{ position: 'relative', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      <Image
        src="/pict/sda.jpg"
        alt="Sidoarjo"
        css={{ 
          width: "100%", // Full width of the parent container
          height: "100%", // Full height of the parent container
          objectFit: "cover", // Cover the entire area while maintaining aspect ratio
          position: "absolute", // Position absolutely to cover the whole screen
          top: 0,
          left: 0,
          zIndex: -1, // Ensure the image is in the background
          borderRadius: '0' // Ensure no rounding of corners
        }}
      />
    </div>
  );
}
