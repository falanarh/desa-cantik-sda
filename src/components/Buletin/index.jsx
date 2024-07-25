import React from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

export default function AplikasiLayanan() {
  const list = [
    {
      title: "Laporan Desa Cantik Minggu 1",
      img: "https://sidoarjokab.bps.go.id/publication/getImageCover.html?url=MjAyNC0wNy0yNCMjaHR0cHM6Ly9wb3J0YWxwdWJsaWthc2kuYnBzLmdvLmlkL2FwaS9nZXRLb3Zlci5waHA%2Fc2VsZWN0b3I9NzU3NmMzYzU2M2E2ZTM1YmJkMjM3Y2Uw",
      link: "https://drive.usercontent.google.com/u/0/uc?id=1xYtQ_KxY2FDkPx3evXhih-QTqAvmS36-&export=download"
    },
    {
      title: "Laporan Desa Cantik Minggu 2",
      img: "https://sidoarjokab.bps.go.id/publication/getImageCover.html?url=MjAyNC0wNy0yNCMjaHR0cHM6Ly9wb3J0YWxwdWJsaWthc2kuYnBzLmdvLmlkL2FwaS9nZXRLb3Zlci5waHA%2Fc2VsZWN0b3I9ZWE5MjA2YWJmN2VkMjBkMGYwYzUzZmMz",
      link: "https://drive.usercontent.google.com/u/0/uc?id=1xYtQ_KxY2FDkPx3evXhih-QTqAvmS36-&export=download"
    },
    {
      title: "Laporan Desa Cantik Minggu 3",
      img: "https://sidoarjokab.bps.go.id/publication/getImageCover.html?url=MjAyNC0wNy0yNCMjaHR0cHM6Ly9wb3J0YWxwdWJsaWthc2kuYnBzLmdvLmlkL2FwaS9nZXRLb3Zlci5waHA%2Fc2VsZWN0b3I9YjhkNzg4ZDdjZjY1OGVlZGJkOWNhNDQ1",
      link: "https://drive.usercontent.google.com/u/0/uc?id=1xYtQ_KxY2FDkPx3evXhih-QTqAvmS36-&export=download"
    },
    {
      title: "Laporan Desa Cantik Minggu 4",
      img: "https://sidoarjokab.bps.go.id/publication/getImageCover.html?url=MjAyNC0wNy0yNCMjaHR0cHM6Ly9wb3J0YWxwdWJsaWthc2kuYnBzLmdvLmlkL2FwaS9nZXRLb3Zlci5waHA%2Fc2VsZWN0b3I9MDQxMTQwZDQ0Mzk0NDI3ZGY5MWU0MzYw",
      link: "https://drive.usercontent.google.com/u/0/uc?id=1xYtQ_KxY2FDkPx3evXhih-QTqAvmS36-&export=download"
    }
  ];

  return (
    <div className="flex flex-col items-center">
      <h1 className="mb-2 text-center header text-2xl font-sans font-bold" style={{ marginTop: '30px' }}>Buletin</h1>
      <p className="mb-6 text-center sub-header text-xl font-sans">Berikut merupakan dokumen laporan terkait Desa Cantik Kabupaten Sidoarjo tahun 2024.</p>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {list.map((item, index) => (
          <a key={index} href={item.link} target="_blank" rel="noopener noreferrer" className="card-link">
          <Card className="max-w-xs mx-auto" style={{ backgroundColor: '#e1e1e2', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)' }} shadow="xl" isPressable onPress={() => console.log("item pressed")}>
              <CardBody className="p-4 overflow-visible">
                <Image
                  shadow="md"
                  radius="md"
                  width="100%"
                  alt={item.title}
                  className="object-cover w-full h-full"
                  src={item.img}
                />
              </CardBody>
              <CardFooter className="block text-small">
                <b className="text-left title-card-lg font-sans" style={{ fontSize: '18px' }}>{item.title}</b>
                <p className="ml-2 text-content-card" style={{ textAlign: 'justify', padding: '2%', fontSize: '18px' }}>{item.desc}</p>
              </CardFooter>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
}