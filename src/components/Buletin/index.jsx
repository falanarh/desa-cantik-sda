import React from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

export default function AplikasiLayanan() {
  const list = [
    {
      title: "Romantik",
      img: "/pict/Romantik.jpeg",
      desc: "'Rujukan Otomatis Manajemen Statistik Terintegrasi' merupakan sistem atau aplikasi yang dikembangkan oleh Badan Pusat Statistik (BPS) Indonesia. Sistem ini bertujuan meningkatkan efisiensi dan efektivitas manajemen data statistik melalui proses yang terintegrasi dan otomatis.",
      link: "#"
    },
    {
      title: "Situs BPS",
      img: "/pict/Web BPS.jpeg",
      desc: "Situs web resmi Badan Pusat Statistik (BPS) Indonesia yang menyediakan berbagai informasi dan layanan terkait data statistik. Situs ini merupakan portal utama untuk mengakses data, publikasi, dan informasi lainnya yang disediakan oleh BPS yang telah diverifikasi dan diolah secara profesional.",
      link: "#"
    },
    {
      title: "Pojok Statistik",
      img: "/pict/Potik.jpeg",
      desc: "Portal online yang disediakan Badan Pusat Statistik (BPS) guna memudahkan akses masyarakat terhadap data dan informasi statistik. Berfungsi sebagai sumber informasi yang interaktif dan user-friendly, dirancang membantu pengguna memahami dan memanfaatkan data statistik lebih baik.",
      link: "#"
    },
    {
      title: "Desa Cantik",
      img: "/pict/Desa Cantik.jpeg",
      desc: "Program yang diinisiasi Badan Pusat Statistik (BPS) untuk meningkatkan literasi statistik di tingkat desa dan memperkuat kapasitas pemerintah desa dalam mengelola data dan informasi statistik secara mandiri, sehingga dapat digunakan untuk perencanaan dan pengambilan keputusan yang lebih baik.",
      link: "#"
    }
  ];

  return (
    <div>
      <h1 className="mb-2 text-center header">Aplikasi Pelayanan</h1>
      <p className="mb-5 text-center sub-header">Sistem yang memfasilitasi layanan BPS kepada publik</p>
      <br/>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {list.map((item, index) => (
          <a key={index} href={item.link} target="_blank" rel="noopener noreferrer" className="card-link">
            <Card shadow="md" isPressable onPress={() => console.log("item pressed")}>
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
                <b className="text-left title-card-lg">{item.title}</b>
                <p className="ml-2 text-content-card" style={{ textAlign: 'justify', padding: '2%' }}>{item.desc}</p>
              </CardFooter>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
}