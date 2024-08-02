import { Card, CardBody, CardFooter, Image } from '@nextui-org/react';

export default function TimKerja() {
  const list = [
    {
      title: "Kepala BPS Kabupaten Sidoarjo",
      subtitle: "Mohamad Isma'il S.Si, M.Ec.Dev",
      img: "/pict/ismail.pnf"
    },
    {
      title: "Statistisi Ahli Madya",
      subtitle: "Rahayu Rachmawati S.ST, M.Si",
      img: "/pict/yayuk.png"
    },
    {
      title: "Kepala Sub Bagian Umum",
      subtitle: "Anggie Dian Pratiwi SST, M.Ec.Dev",
      img: "/"
    },
    {
      title: "Tim IT",
      subtitle: "Chandra Sugiarso Lasambouw SST, MM",
      img: "/pict/candra.png"
    },
    {
      title: "Perwakilan Tim SDI",
      subtitle: "Faizah Naely SST",
      img: "/pict/neli.png"
    },
    {
      title: "Tim Pelaksana Desa Cantik",
      subtitle: "Eka Fauziah Rahmawati SST",
      img: "/pict/eka.png"
    },
    {
      title: "Tim Pelaksana Desa Cantik",
      subtitle: "Nuning Tri Haryani A.Md.",
      img: "/pict/nuning.png"
    },
    {
      title: "Tim Pelaksana Desa Cantik",
      subtitle: "Nofriana Florida Djami Raga SST., M.Sc",
      img: "/pict/nofri.png"
    }
  ];

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {list.map((item, index) => (
          <a key={index} href={item.link} target="_blank" rel="noopener noreferrer" className="card-link">
            <Card className="max-w-xs mx-auto" style={{ backgroundColor: '#e1e1e2', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)', width: '250px', height: '350px' }} shadow="xl" isPressable onPress={() => console.log("item pressed")}>
              <CardBody className="p-4 overflow-visible" style={{ height: '200px' }}>
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
              <CardFooter className="block text-small" style={{ height: '150px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                <b className="text-title-card-lg" style={{ fontFamily: 'Inter', fontSize: '18px', marginBottom: '4px' }}>{item.title}</b>
                <p className="text-content-card" style={{ fontFamily: 'Inter', fontSize: '16px' }}>{item.subtitle}</p>
              </CardFooter>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
}
