import React, { useEffect, useRef, useState } from "react";
import Typewriter from "typewriter-effect/dist/core";

export default function WelcomeBanner() {
  const typewriterRef1 = useRef(null);
  const typewriterRef2 = useRef(null);
  const [showTypewriter2, setShowTypewriter2] = useState(false);

  useEffect(() => {
    const typewriter1 = new Typewriter(typewriterRef1.current, {
      loop: false,
      delay: 75,
    });

    const typewriter2 = new Typewriter(typewriterRef2.current, {
      loop: false,
      delay: 70,
      cursor: null,
    });

    typewriter1
      .typeString("Desa Cantik Kabupaten Sidoarjo")
      .pauseFor(2500)
      .start()
      .callFunction(() => {
        setShowTypewriter2(true); // Show the second typewriter when starting
        typewriter2
          .typeString("Badan Pusat Statistik Kabupaten Sidoarjo")
          .pauseFor(2200)
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
      {/* Orange transparent overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: 'rgba(285, 201, 146, 0.4)', // Orange transparent background
          zIndex: 0,
        }}
      ></div>
      <div
        className="flex flex-col items-center justify-center text-white text-3xl font-bold"
        style={{
          position: "relative",
          zIndex: 1,
          marginTop: '15%',
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
        }}
      >
        <div
          ref={typewriterRef1}
          className="text-5xl"
          style={{
            fontFamily: "Inter",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "1rem",
          }}
        ></div>
        <div
          ref={typewriterRef2}
          className="text-2xl"
          style={{
            fontFamily: "Assistant",
            fontWeight: "600",
            textAlign: "center",
            backgroundColor: "#f27c35", // Transparent background for the second text
            padding: "6px 18px",
            borderRadius: "20px",
            display: "inline-block",
            textShadow: "none",
            opacity: showTypewriter2 ? 1 : 0, // Control visibility
            transition: "opacity 0.5s ease-in-out", // Smooth transition
          }}
        ></div>
      </div>
    </div>
  );
}
