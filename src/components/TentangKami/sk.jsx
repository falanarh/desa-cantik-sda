// src/components/TentangKami/index.jsx
import React from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

export default function SK() {
  const list = [
    {
      title: (
        <>
          Surat Keputusan Desa Cinta Statistik 2024
          <br />
          (BPS RI)
        </>
      ),
      img: "/pict/sk.png",
      link: "https://drive.google.com/file/d/1UOvdCQ95BtCMDDNOewXqb8LMcr0vKP-H/view"
    },
    {
      title: (
      <>
        Surat Keputusan Desa Cinta Statistik 2024
        <br />
        (BPS Provinsi Jawa Timur)
      </>
      ),
      img: "/pict/sk.png",
      link: "https://drive.google.com/file/d/1W15jXwRPC7ozJQc7PgZJZxo5u54heS6Q/view"
    },
    {
      title: (
        <>
          Surat Edaran Desa Cinta Statistik 2024
          <br />
          (Bupati Kabupaten Sidoarjo)
        </>
      ),
      img: "/pict/sk.png",
      link: "https://drive.google.com/file/d/14J5-WSjOF3LQfcHrDJZyMdl93__LfAvx/view"
    },
    {
      title: (
        <>
          Surat Keputusan Tim Desa Cinta Statistik 2024
          <br />
          (BPS Kabupaten Sidoarjo)
        </>
      ),
      img: "/pict/sk.png",
      link: "https://drive.google.com/file/d/1XLOcXUM8Gmk1qBV5GYFXQcb3T3enGug9/view"
    },
  ];

  return (
    <div className="container mx-auto mt-5">
      <h1 className="mb-6 text-center sub-header text-xl" style={{ fontWeight: 'bold', fontFamily: 'Inter', marginTop: '120px', marginBottom: '4px'}}>Surat Keputusan</h1>
      <p className="mb-6 text-center sub-header text-lg" style={{ fontFamily: 'Inter', marginBottom: '10px' }}>Berikut merupakan dokumen surat keputusan Desa Cantik Kabupaten Sidoarjo tahun 2024.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-0 mb-10">
        {list.map((item, index) => (
          <a key={index} href={item.link} target="_blank" rel="noopener noreferrer" className="card-link">
            <Card className="max-w-xs mx-auto" style={{ marginTop: '20px', backgroundColor: '#f0f0f0', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)', width: '250px', height: '420px' }} shadow="xl">
              <CardBody className="p-4 overflow-visible" style={{ height: '180px' }}>
                <Image
                  shadow="lg"
                  radius="md"
                  width="100%"
                  height="100%"
                  alt={item.title}
                  className="object-cover w-full h-full"
                  style={{ objectFit: 'cover', objectPosition: 'top' }}
                  src={item.img}
                />
              </CardBody>
              <CardFooter className="block text-small" style={{ height: '240px', marginTop: '5px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                <b className="text-title-card-lg" style={{ fontFamily: 'Inter', fontSize: '14px', marginTop: '135px', whiteSpace: 'normal', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</b>
                <p className="text-content-card" style={{ fontFamily: 'Inter', fontSize: '12px', whiteSpace: 'normal', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.subtitle}</p>
              </CardFooter>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
}