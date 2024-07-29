import React from "react";
import Slider from "react-slick";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// Custom Previous Button
const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <button
      className={`absolute left-4 z-10 p-2 rounded-full text-pblue transform -translate-y-1/2 shadow-lg transition duration-300 ease-in-out ${className}`}
      style={{ ...style, display: "block", top: "50%", border: "none", outline: "none", fontSize: "18px" }}
      onClick={onClick}
      aria-label="Previous Slide"
    >
    </button>
  );
};

// Custom Next Button
const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <button
      className={`absolute right-7 z-10 p-2 rounded-full  text-pblue transform -translate-y-1/2 shadow-lg  transition duration-300 ease-in-out ${className}`}
      style={{ ...style, display: "block", top: "50%", border: "none", outline: "none", fontSize: "18px" }}
      onClick={onClick}
      aria-label="Next Slide"
    >
    </button>
  );
};

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
      desc: "Simoanginangin adalah sebuah desa di wilayah Kecamatan Wonoayu, Kabupaten Sidoarjo. Dengan luas 42 Ha."
    },
    {
      title: "Grogol",
      img: "/pict/grogol.jpg",
      desc: "Grogol adalah sebuah desa di wilayah Kecamatan Tulangan, Kabupaten Sidoarjo. Dengan luas 112.818 Ha."
    },
    {
      title: "Sugihwaras",
      img: "/pict/Sugihwaras.png",
      desc: "Sugihwaras adalah sebuah desa di kecamatan Candi, Kabupaten Sidoarjo. Dengan luas 1.201 Ha."
    },
    {
      title: "Kedungrejo",
      img: "/pict/Kedungrejo.png",
      desc: "Kedungrejo adalah sebuah desa di wilayah Kecamatan Waru, Kabupaten Sidoarjo. Dengan luas 86.44 Ha."
    },
    {
      title: "Masangan Kulon",
      img: "/pict/Masangan Kulon.png",
      desc: "Grogol adalah sebuah desa di wilayah Kecamatan Tulangan, Kabupaten Sidoarjo. Dengan luas 112.818 Ha."
    },
    {
      title: "Wangkal",
      img: "/pict/wangkal 2.jpg",
      desc: "Grogol adalah sebuah desa di wilayah Kecamatan Tulangan, Kabupaten Sidoarjo. Dengan luas 112.818 Ha."
    },
    {
      title: "Kedungturi",
      img: "/pict/kedungturi.jpg",
      desc: "Grogol adalah sebuah desa di wilayah Kecamatan Tulangan, Kabupaten Sidoarjo. Dengan luas 112.818 Ha."
    },
    {
      title: "Kepunten",
      img: "/pict/kepunten.jpg",
      desc: "Grogol adalah sebuah desa di wilayah Kecamatan Tulangan, Kabupaten Sidoarjo. Dengan luas 112.818 Ha."
    },
    {
      title: "Kludan",
      img: "/pict/kludan.png",
      desc: "Grogol adalah sebuah desa di wilayah Kecamatan Tulangan, Kabupaten Sidoarjo. Dengan luas 112.818 Ha."
    }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 100,
    slidesToShow: 4,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="flex justify-center m-12">
      <Slider {...settings} className="w-full">
        {list.map((item, index) => (
          <div key={index} className="px-2">
            <Card className="flex flex-col justify-around h-100 w-70" shadow="sm">
              <CardBody className="p-2 overflow-visible items-center">
                <Image
                  shadow="sm"
                  radius="md"
                  width="100%"
                  alt={item.title}
                  className="object-cover w-full"
                  src={item.img}
                />
              </CardBody>
              <CardFooter className="block text-small text-center">
                <b className="block text-lg">{item.title}</b>
                <p className="mx-4 text-content-card" style={{ textAlign: 'justify' }}>{item.desc}</p>
              </CardFooter>
            </Card>
          </div>
        ))}
      </Slider>
    </div>
  );
}