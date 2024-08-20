import { Tab, Tabs } from "@nextui-org/tabs";
import { PiUserCircleDashedDuotone } from "react-icons/pi";
import "./pages.css";
import RtTable from "../components/RtTable";
import { Col, message, Statistic } from "antd";
import CountUp from "react-countup";
import { BsBasket2Fill } from "react-icons/bs";
import { FaShop } from "react-icons/fa6";
import { MdTrolley } from "react-icons/md";
import {
  TbSquareLetterAFilled,
  TbSquareLetterBFilled,
  TbSquareLetterCFilled,
  TbSquareLetterDFilled,
  TbSquareLetterEFilled,
  TbSquareLetterFFilled,
  TbSquareLetterGFilled,
  TbSquareLetterHFilled,
  TbSquareLetterIFilled,
  TbSquareLetterJFilled,
  TbSquareLetterKFilled,
  TbSquareLetterLFilled,
  TbSquareLetterMFilled,
  TbSquareLetterNFilled,
  TbSquareLetterOFilled,
  TbSquareLetterPFilled,
  TbSquareLetterQFilled,
  TbSquareLetterRFilled,
  TbSquareLetterSFilled,
  TbSquareLetterTFilled,
  TbSquareLetterUFilled,
} from "react-icons/tb";
import RutaTable from "../components/RutaTable";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import api from "../utils/api";
import { useEffect, useState } from "react";
import { Bars } from "react-loader-spinner";
import { dataLabels } from "./data";

const username = localStorage.getItem("username");
const formatter = (value) => <CountUp end={value} separator="," />;

const AdminSimoanginangin = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    setLoading(true); // Mulai loading
    try {
      // const response = await api.get("/api/rt");
      const [response] = await Promise.all([api.get("/api/rt/all/aggregate")]);
      setData(response.data.data); // Update state dengan data dari API
      console.log("Data fetched:", response.data.data);
    } catch (error) {
      // Cek jika error memiliki respons body
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        message.error(`Terjadi kesalahan: ${error.response.data.message}`, 5);
      } else {
        // Jika error tidak memiliki respons body yang dapat diakses
        message.error(`Terjadi kesalahan: ${error.message}`, 5);
      }
    } finally {
      setLoading(false); // Akhiri loading
    }
  };

  useEffect(() => {
    // Fetch data from API
    fetchData();
  }, []);

  const dataCard = [
    {
      title: "Jumlah UMKM",
      value: data.jml_umkm,
      icon: <BsBasket2Fill className="text-[36px] text-white my-2" />,
      color: "rgba(84, 140, 168, 0.7)", // Ubah ke RGBA
    },
    {
      title: "Jumlah UMKM Tetap",
      value: data.jml_umkm_tetap,
      icon: <FaShop className="text-[36px] text-white my-2" />,
      color: "rgba(238, 111, 87, 0.7)", // Ubah ke RGBA
    },
    {
      title: "Jumlah UMKM Non Tetap",
      value: data.jml_umkm_nontetap,
      icon: <MdTrolley className="text-[36px] text-white my-2" />,
      color: "rgba(80, 216, 144, 0.7)", // Ubah ke RGBA
    },
  ];

  const dataCard2 = [
    {
      title: "Jumlah UMKM KBLI",
      value: data.jml_umkm_kbli_a,
      icon: <TbSquareLetterAFilled className="text-[36px] text-white my-2" />,
      color: "rgba(0, 130, 150, 0.7)", // Steel Blue
    },
    {
      title: "Jumlah UMKM KBLI",
      value: data.jml_umkm_kbli_b,
      icon: <TbSquareLetterBFilled className="text-[36px] text-white my-2" />,
      color: "rgba(139, 0, 0, 0.7)", // Dark Red
    },
    {
      title: "Jumlah UMKM KBLI",
      value: data.jml_umkm_kbli_c,
      icon: <TbSquareLetterCFilled className="text-[36px] text-white my-2" />,
      color: "rgba(47, 79, 79, 0.7)", // Dark Slate Gray
    },
    {
      title: "Jumlah UMKM KBLI",
      value: data.jml_umkm_kbli_d,
      icon: <TbSquareLetterDFilled className="text-[36px] text-white my-2" />,
      color: "rgba(72, 61, 139, 0.7)", // Dark Slate Blue
    },
    {
      title: "Jumlah UMKM KBLI",
      value: data.jml_umkm_kbli_e,
      icon: <TbSquareLetterEFilled className="text-[36px] text-white my-2" />,
      color: "rgba(0, 100, 0, 0.7)", // Dark Green
    },
    {
      title: "Jumlah UMKM KBLI",
      value: data.jml_umkm_kbli_f,
      icon: <TbSquareLetterFFilled className="text-[36px] text-white my-2" />,
      color: "rgba(128, 0, 0, 0.7)", // Maroon
    },
    {
      title: "Jumlah UMKM KBLI",
      value: data.jml_umkm_kbli_g,
      icon: <TbSquareLetterGFilled className="text-[36px] text-white my-2" />,
      color: "rgba(85, 107, 47, 0.7)", // Dark Olive Green
    },
    {
      title: "Jumlah UMKM KBLI",
      value: data.jml_umkm_kbli_h,
      icon: <TbSquareLetterHFilled className="text-[36px] text-white my-2" />,
      color: "rgba(139, 69, 19, 0.7)", // Saddle Brown
    },
    {
      title: "Jumlah UMKM KBLI",
      value: data.jml_umkm_kbli_i,
      icon: <TbSquareLetterIFilled className="text-[36px] text-white my-2" />,
      color: "rgba(25, 25, 112, 0.7)", // Midnight Blue
    },
    {
      title: "Jumlah UMKM KBLI",
      value: data.jml_umkm_kbli_j,
      icon: <TbSquareLetterJFilled className="text-[36px] text-white my-2" />,
      color: "rgba(139, 0, 139, 0.7)", // Dark Magenta
    },
    {
      title: "Jumlah UMKM KBLI",
      value: data.jml_umkm_kbli_k,
      icon: <TbSquareLetterKFilled className="text-[36px] text-white my-2" />,
      color: "rgba(128, 128, 0, 0.7)", // Olive
    },
    {
      title: "Jumlah UMKM KBLI",
      value: data.jml_umkm_kbli_l,
      icon: <TbSquareLetterLFilled className="text-[36px] text-white my-2" />,
      color: "rgba(0, 139, 139, 0.7)", // Dark Cyan
    },
    {
      title: "Jumlah UMKM KBLI",
      value: data.jml_umkm_kbli_m,
      icon: <TbSquareLetterMFilled className="text-[36px] text-white my-2" />,
      color: "rgba(139, 69, 19, 0.7)", // Saddle Brown
    },
    {
      title: "Jumlah UMKM KBLI",
      value: data.jml_umkm_kbli_n,
      icon: <TbSquareLetterNFilled className="text-[36px] text-white my-2" />,
      color: "rgba(128, 0, 128, 0.7)", // Purple
    },
    {
      title: "Jumlah UMKM KBLI",
      value: data.jml_umkm_kbli_o,
      icon: <TbSquareLetterOFilled className="text-[36px] text-white my-2" />,
      color: "rgba(0, 128, 128, 0.7)", // Teal
    },
    {
      title: "Jumlah UMKM KBLI",
      value: data.jml_umkm_kbli_p,
      icon: <TbSquareLetterPFilled className="text-[36px] text-white my-2" />,
      color: "rgba(184, 134, 11, 0.7)", // Dark Goldenrod
    },
    {
      title: "Jumlah UMKM KBLI",
      value: data.jml_umkm_kbli_q,
      icon: <TbSquareLetterQFilled className="text-[36px] text-white my-2" />,
      color: "rgba(0, 0, 139, 0.7)", // Dark Blue
    },
    {
      title: "Jumlah UMKM KBLI",
      value: data.jml_umkm_kbli_r,
      icon: <TbSquareLetterRFilled className="text-[36px] text-white my-2" />,
      color: "rgba(85, 107, 47, 0.7)", // Dark Olive Green
    },
    {
      title: "Jumlah UMKM KBLI",
      value: data.jml_umkm_kbli_s,
      icon: <TbSquareLetterSFilled className="text-[36px] text-white my-2" />,
      color: "rgba(47, 79, 79, 0.7)", // Dark Slate Gray
    },
    {
      title: "Jumlah UMKM KBLI",
      value: data.jml_umkm_kbli_t,
      icon: <TbSquareLetterTFilled className="text-[36px] text-white my-2" />,
      color: "rgba(60, 179, 113, 0.7)", // Medium Sea Green
    },
    {
      title: "Jumlah UMKM KBLI",
      value: data.jml_umkm_kbli_u,
      icon: <TbSquareLetterUFilled className="text-[36px] text-white my-2" />,
      color: "rgba(0, 139, 139, 0.7)", // Dark Cyan
    },
  ];

  let tabs = [
    {
      id: "sls",
      label: "Satuan Lingkungan Setempat (SLS)",
      content: <RtTable fetchDataAggregate={fetchData} />,
    },
    {
      id: "keluarga-umkm",
      label: "Keluarga UMKM",
      content: <RutaTable fetchDataAggregate={fetchData} />,
    },
  ];

  const StatComponent = ({ label = "Jumlah UMKM", value = 100 }) => {
    return (
      <div className="flex p-2 border-2 border-dashed border-pdarkblue rounded-xl font-inter text-pdarkblue w-fit">
        <div className="flex justify-between w-[380px] mr-1 text-[14px]">
          <span className="font-semibold text-[14px]">{label}</span>
          <span className="font-semibold text-[14px]">: </span>
        </div>
        {value}
      </div>
    );
  };

  return (
    <>
      <div className="flex justify-between items-center absolute border-b-1 border-[#bed5e3] w-full px-[10%] 2xl:px-[20%] font-inter text-pdarkblue py-[16px]">
        <h1 className="text-lg font-semibold">Manajemen Data Peta Tematik</h1>
        <div className="flex items-center gap-2">
          <PiUserCircleDashedDuotone className="text-[40px]" />
          <h1 className="text-lg font-semibold">{username}</h1>
        </div>
      </div>
      <div className="flex flex-col items-center w-full min-h-screen bg-[#eefcff] px-[10%] 2xl:px-[20%] font-inter text-pdarkblue">
        <h1 className="font-semibold text-[16px] mt-[90px] mb-[12px] bg-white py-2 px-3 w-fit rounded-xl">
          Ringkasan Statistik UMKM Desa Simoanginangin
        </h1>
        <div className="flex flex-col w-full gap-0 p-5 pb-3 bg-white rounded-xl">
          {/* <div className="flex justify-between gap-6 px-[50px]">
            {dataCard.map((item, index) => (
              <Col
                key={index}
                className={`p-4 shadow-md bg-[${item.color}] rounded-xl flex justify-between items-end w-full`}
                style={{
                  backgroundColor: item.color, // Hapus properti ini jika sudah diubah ke RGBA di atas
                }}
              >
                <Statistic
                  title={item.title}
                  value={item.value}
                  formatter={formatter}
                />
                {item.icon}
              </Col>
            ))}
          </div> */}
          {/* <div className="w-full swiperWrapper">
            <Swiper
              cssMode={true}
              navigation={true}
              pagination={true}
              mousewheel={true}
              keyboard={true}
              autoplay={{
                delay: 8000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                640: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                1280: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
              }}
              modules={[Autoplay, Navigation, Pagination, Mousewheel, Keyboard]}
              className="px-[50px] py-[25px]"
            >
              {dataCard2.map((item, index) => (
                <SwiperSlide key={index} className="">
                  <Col
                    className={`p-4 shadow-md bg-[${item.color}] rounded-xl flex justify-between items-end w-[350px]`}
                    style={{
                      backgroundColor: item.color, // Hapus properti ini jika sudah diubah ke RGBA di atas
                    }}
                  >
                    <Statistic
                      title={item.title}
                      value={item.value}
                      formatter={formatter}
                    />
                    {item.icon}
                  </Col>
                </SwiperSlide>
              ))}
            </Swiper>
          </div> */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            {data
              ? dataLabels.map(({ key, label }) => {
                  // Dapatkan nilai dari dataAgregat berdasarkan key
                  const value = data[key];

                  // Jika nilai tidak ada, tampilkan 0 atau nilai default
                  return (
                    <StatComponent
                      key={key}
                      label={label}
                      value={value !== undefined ? value : 0}
                    />
                  );
                })
              : null}
          </div>
        </div>
        <Tabs
          aria-label="Dynamic tabs"
          items={tabs}
          className="justify-center mt-[16px]"
        >
          {(item) => (
            <Tab
              key={item.id}
              title={item.label}
              className="w-full font-semibold"
            >
              {item.content}
            </Tab>
          )}
        </Tabs>

        {/* {loading && (
        <div className="fixed inset-0 bg-[#caf4ff85] flex flex-col justify-center items-center z-50 overflow-hidden">
          <Bars
            height="60"
            width="60"
            color="#0B588F"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
          <p className="mt-3 font-semibold font-inter text-pdarkblue">
            Loading
          </p>
        </div>
      )} */}
      </div>
    </>
  );
};

export default AdminSimoanginangin;
