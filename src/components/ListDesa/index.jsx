import React from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

export default function ListDesa() {
  const list = [
    {
      title: "Simoketawang",
      img: "/pict/simoketawang.png",
      desc: "Simoketawang adalah sebuah desa di wilayah Kecamatan Wonoayu, Kabupaten Sidoarjo. Dengan luas 96.53 Ha."
    },
    {
      title: "Simoanginangin",
      img: "/pict/simoanginagin.jpg",
      desc: "Simoanginangin adalah sebuah desa di wilayah Kecamatan Wonoayu, Kabupaten Sidoarjo. Dengan luas 147.39 Ha."
    },
    {
      title: "Grogol",
      img: "/pict/grogol.jpg",
      desc: "Grogol adalah sebuah desa di wilayah Kecamatan Tulangan, Kabupaten Sidoarjo. Dengan luas 112.818 Ha."
    }
  ];

  return (
    <div className="flex justify-center m-12">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {list.map((item, index) => (
          <Card key={index} className="flex flex-col justify-around" shadow="sm">
            <CardBody className="p-4 overflow-visible items-center">
              <Image
                shadow="md"
                radius="md"
                width="90%"
                alt={item.title}
                className="object-cover w-full h-full"
                src={item.img}
              />
            </CardBody>
            <CardFooter className="block text-small text-center">
              <b className="block text-large">{item.title}</b>
              <p className="ml-5 mr-5 text-content-card" style={{ textAlign: 'justify', padding: '1%' }}>{item.desc}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
