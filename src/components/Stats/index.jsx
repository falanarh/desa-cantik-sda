const StatCard = ({ num, label }) => (
  <div className="w-full max-w-[200px] h-[160px] px-10 py-5 rounded-xl flex flex-col justify-center items-center bg-gradient-to-b from-[#E63900] to-[#F3A853] text-white shadow-xl">
    <b className="text-3xl">{num}</b>
    <p className="font-medium font-assistant text-2xl text-white mt-2">{label}</p>
  </div>
);

export default function Stats() {
  const list = [
    { num: "9", label: "Kecamatan" },
    { num: "10", label: "Desa" },
    { num: "269", label: "RT" }
  ];

  return (
    <div>
      <img src="/pict/Group 29.svg" alt="Background Image" className="w-full h-auto" />
      <div className="bg-base max-w-full py-10">
        <div className="flex flex-col md:flex-row justify-center items-center md:space-x-20 space-y-5 md:space-y-0">
          {list.map((item, index) => (
            <StatCard key={index} num={item.num} label={item.label} />
          ))}
        </div>
      </div>
      <img src="/pict/Group 30.svg" alt="Background Image" className="w-full h-auto" />
    </div>
  );
}
