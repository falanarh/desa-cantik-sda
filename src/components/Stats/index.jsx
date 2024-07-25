import React from "react";
import {Image} from "@nextui-org/react"; // If using Next.js

const StatCard = ({ num, label }) => (
  <div className="w-[200px] h-[160px] px-10 rounded-xl flex flex-col justify-center items-center bg-gradient-to-bl from-pblue to-pdarkblue text-white shadow-2xl">
    <b className="text-3xl">{num}</b>
    <p className="font-medium font-assistant text-2xl mt-2">{label}</p>
  </div>
);

export default function Stats() {
  const list = [
    { num: "5", label: "Kecamatan" },
    { num: "5", label: "Desa" },
    { num: "5", label: "RT" }
  ];

  return (
    <div>
        <img src="/pict/Group 29.svg" alt="Background Image" className="w-full h-auto" />
    <div className="bg-base max-w-full py-10">
      <div className="flex justify-center space-x-20">
        {list.map((item, index) => (
          <StatCard key={index} num={item.num} label={item.label} />
        ))}
      </div>
    </div>
    </div>
  );
}
