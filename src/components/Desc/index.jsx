import React from "react";

export default function Desc() {
  const videoId = "err7OoUvO5w"; // Video ID from the new YouTube link
  const videoUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;

  return (
    <div className="flex justify-center items-center p-8 min-h-screen">
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-2xl overflow-hidden">
        <div className="p-8 flex-1">
          <h2 className="font-bold text-4xl text-porange">Desa Cantik</h2>
          <h3 className="font-semibold text-2xl text-porange mt-3">
            Apa Itu Desa Cinta Statistik?
          </h3>
          <p className="text-orange-950 mt-3">
            Desa Cantik adalah inisiatif Badan Pusat Statistik (BPS) untuk 
            meningkatkan kualitas dan akurasi data statistik di tingkat desa. 
            Bertujuan mengidentifikasi dan mengelola desa-desa yang 
            memiliki potensi atau kebutuhan khusus dalam pengumpulan data, serta 
            mendorong keterlibatan masyarakat dalam proses tersebut. 
          </p>
          <p className="text-orange-950 mt-3">
            Dengan fokus pada desa-desa yang dianggap strategis, Desa Cantik berperan 
            penting memperbaiki kualitas data statistik yang akan digunakan untuk 
            perencanaan dan pengambilan keputusan pemerintah. Selain itu, program ini juga 
            berkontribusi pada pemberdayaan masyarakat lokal melalui pelatihan dan 
            peningkatan kapasitas dalam pengelolaan data.
          </p>
        </div>
        <div className="relative flex-1 flex justify-center items-center p-8">
          <div className="w-full h-0 relative" style={{ paddingBottom: "56.25%" }}>
            <iframe
              src={videoUrl}
              title="Desa Cantik Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              rel="0"
              modestbranding="1"
              className="absolute top-0 left-0 w-full h-full rounded-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
