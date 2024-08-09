import React, { useEffect, useRef } from "react";
import Typewriter from "typewriter-effect/dist/core";

export default function WelcomeBanner() {
  const typewriterRef1 = useRef(null);
  const typewriterRef2 = useRef(null);

  useEffect(() => {
    const typewriter1 = new Typewriter(typewriterRef1.current, {
      loop: false,
      delay: 75,
    });

    const typewriter2 = new Typewriter(typewriterRef2.current, {
      loop: false,
      delay: 75,
      cursor: null,
    });

    typewriter1
      .typeString("Desa Cantik Kabupaten Sidoarjo")
      .pauseFor(2500)
      .start()
      .callFunction(() => {
        typewriter2
          .typeString("Badan Pusat Statistik (BPS) Kabupaten Sidoarjo")
          .pauseFor(2500)
          .start();
      });

    return () => {
      typewriter1.stop();
      typewriter2.stop();
    };
  }, []);

  return (
    <div
      className="welcome-banner"
      style={{
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        height: '100vh',
      }}
    >
      <img
        src="/pict/sda.jpg"
        alt="Sidoarjo"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'rgba(255, 201, 146, 0.4)', // Adjusted transparency
          display: 'flex',
          flexDirection: 'column',
          color: "white",
          fontSize: "3rem",
          fontWeight: "bold",
          fontFamily: "'Inter', sans-serif",
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
          textAlign: "center",
        }}
      >
        <div
          ref={typewriterRef1}
          style={{
            marginTop: '9.5rem', // Move the first typewriter effect up
            fontFamily: "Inter",
            fontSize: "3rem",
            fontWeight: "bold",
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
            textAlign: "center",
            color: "white"
          }}
        ></div>
        <div
          ref={typewriterRef2}
          style={{
            fontFamily: "Assistant",
            fontSize: "2rem",
            fontWeight: "600",
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
            textAlign: "center",
            color: "white"
          }}
        ></div>
      </div>
    </div>
  );
}
