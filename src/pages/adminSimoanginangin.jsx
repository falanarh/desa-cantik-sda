import { Tab, Tabs } from "@nextui-org/tabs";
import { PiUserCircleDashedDuotone } from "react-icons/pi";
import "./pages.css";
import RtTable from "../components/RtTable";
import { Col, Statistic } from "antd";
import CountUp from "react-countup";
import { BsBasket2Fill } from "react-icons/bs";
import { FaShop } from "react-icons/fa6";
import { MdTrolley } from "react-icons/md";
import RutaTable from "../components/RutaTable";
const formatter = (value) => <CountUp end={value} separator="," />;

const AdminSimoanginangin = () => {
  const dataCard = [
    {
      title: "Jumlah UMKM",
      value: 47,
      icon: <BsBasket2Fill className="text-[36px] text-white my-2" />,
      color: "#548CA8",
    },
    {
      title: "Jumlah UMKM Tetap",
      value: 33,
      icon: <FaShop className="text-[36px] text-white my-2" />,
      color: "#EE6F57",
    },
    {
      title: "Jumlah UMKM Non Tetap",
      value: 14,
      icon: <MdTrolley className="text-[36px] text-white my-2" />,
      color: "#50D890",
    },
  ];

  let tabs = [
    {
      id: "rukun-tetangga",
      label: "Rukun Tetangga (RT)",
      content: <RtTable />,
    },
    {
      id: "rumah-tangga-umkm",
      label: "Rumah Tangga UMKM",
      content: <RutaTable />,
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center absolute border-b-1 border-[#bed5e3] w-full px-[10%] 2xl:px-[20%] font-inter text-pdarkblue py-[16px]">
        <h1 className="text-lg font-semibold">Manajemen Data Peta Tematik</h1>
        <div className="flex items-center gap-2">
          <PiUserCircleDashedDuotone className="text-[40px]" />
          <h1 className="text-lg font-semibold">Falana</h1>
        </div>
      </div>
      <div className="flex flex-col w-full min-h-screen bg-[#eefcff] px-[10%] 2xl:px-[20%] font-inter text-pdarkblue">
        <div className="flex justify-center w-full gap-5 mt-[100px] mb-10">
          {dataCard.map((item, index) => (
            <Col
              key={index}
              span={7}
              className={`p-4 shadow-md bg-[${item.color}] bg-opacity-70 rounded-xl flex justify-between items-end`}
              // style={{ backgroundColor: item.color }}
            >
              <Statistic
                title={item.title}
                value={item.value}
                formatter={formatter}
              />
              {item.icon}
            </Col>
          ))}
        </div>

        {/* <Row gutter={16}>
        <Col span={12}>
          <Statistic
            title="Account Balance (CNY)"
            value={112893}
            precision={2}
            formatter={formatter}
          />
        </Col>
      </Row> */}
        <Tabs aria-label="Dynamic tabs" items={tabs} className="justify-center">
          {(item) => (
            <Tab key={item.id} title={item.label} className="font-semibold">
              {item.content}
            </Tab>
          )}
        </Tabs>
      </div>
    </>
  );
};

export default AdminSimoanginangin;
