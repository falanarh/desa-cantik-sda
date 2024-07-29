import React from "react";

export default function WelcomeBanner() {
  return (
    <div 
      className="welcome-banner" 
      style={{ 
        position: 'relative',
        overflow: 'hidden' 
      }}
    >
      <img
        src="/pict/SDA.jpg"
        alt="Sidoarjo"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1
        }}
      />
    </div>
  );
}
