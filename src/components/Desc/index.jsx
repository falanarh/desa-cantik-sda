import React from "react";
import { Image } from "@nextui-org/react";

export default function Desc() {
  return (
    <div className="flex justify-center items-center p-8 min-h-max">
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-2xl overflow-hidden">
        <div className="p-8 flex-1">
          <h2 className="font-bold text-4xl text-pdarkblue">Desa Cantik</h2>
          <h3 className="font-semibold text-2xl text-pdarkblue mt-4">
            Apa Itu Desa Cinta Statistik?
          </h3>
          <p className="text-blue-950 mt-4">
          Desa Cantik adalah inisiatif dari Badan Pusat Statistik (BPS) untuk 
          meningkatkan kualitas dan akurasi data statistik di tingkat desa. 
          Program ini bertujuan untuk mengidentifikasi dan mengelola desa-desa yang 
          memiliki potensi atau kebutuhan khusus dalam pengumpulan data, serta 
          mendorong keterlibatan masyarakat dalam proses tersebut. 
          </p>
          <p className="text-gray-700 mt-4">
          Dengan fokus pada desa-desa yang dianggap strategis, Desa Cantik berperan 
          penting dalam memperbaiki kualitas data statistik yang akan digunakan untuk 
          perencanaan dan pengambilan keputusan pemerintah. Selain itu, program ini juga 
          berkontribusi pada pemberdayaan masyarakat lokal melalui pelatihan dan 
          peningkatan kapasitas dalam pengelolaan data.
          </p>
        </div>
        <div className="relative flex-1">
          <Image
            src="/path/to/your/image.png"
            alt="Desa Cantik Image"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 flex justify-center items-center bg-pblue bg-opacity-50">
            <button className="bg-white rounded-full p-4">
              <svg
                className="w-10 h-10 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.54-8.54a.75.75 0 010 1.08l-5.25 4.5a.75.75 0 01-1.29-.54v-9a.75.75 0 011.29-.54l5.25 4.5z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
