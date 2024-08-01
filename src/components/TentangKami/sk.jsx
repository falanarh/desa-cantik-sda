// src/components/TentangKami/index.jsx
import React from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

export default function SK() {
  const list = [
    {
      title: "Surat Keputusan Desa Cantik Kabupaten Sidoarjo Tahun 2024",
      img: "https://sidoarjokab.bps.go.id/publication/getImageCover.html?url=MjAyNC0wNy0yNCMjaHR0cHM6Ly9wb3J0YWxwdWJsaWthc2kuYnBzLmdvLmlkL2FwaS9nZXRLb3Zlci5waHA%2Fc2VsZWN0b3I9NzU3NmMzYzU2M2E2ZTM1YmJkMjM3Y2Uw",
      link: "https://drive.usercontent.google.com/u/0/uc?id=1xYtQ_KxY2FDkPx3evXhih-QTqAvmS36-&export=download"
    }
  ];

  return (
    <div className="flex flex-col items-center">
      <h1 className="mb-2 text-center header text-2xl font-bold" style={{ fontFamily: 'Inter', marginTop: '30px' }}>Tentang Kami</h1>
      <p className="mb-6 text-center sub-header text-xl" style={{ fontFamily: 'Inter'}}>Berikut merupakan dokumen surat keputusan Desa Cantik Kabupaten Sidoarjo tahun 2024.</p>
      <div className="flex justify-center items-center">
        {list.map((item, index) => (
          <a key={index} href={item.link} target="_blank" rel="noopener noreferrer" className="card-link">
            <Card className="max-w-xs mx-auto" style={{ backgroundColor: '#e1e1e2', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)' }} shadow="xl" isPressable onPress={() => console.log("item pressed")}>
              <CardBody className="p-4 overflow-visible">
                <Image
                  shadow="lg"
                  radius="md"
                  width="100%"
                  alt={item.title}
                  className="object-cover w-full h-full"
                  src={item.img}
                />
              </CardBody>
              <CardFooter className="block text-small">
                <b className="text-title-card-lg" style={{ fontFamily: 'Inter', fontSize: '18px' }}>{item.title}</b>
                <p className="ml-2 text-content-card" style={{ textAlign: 'justify', padding: '2%', fontFamily: 'Inter', fontSize: '18px' }}>{item.desc}</p>
              </CardFooter>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
}