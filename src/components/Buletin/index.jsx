import React, { useState, useMemo, useCallback } from "react";
import { Image, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Pagination } from "@nextui-org/react";


export default function AplikasiLayanan() {
  const [selectedYears, setSelectedYears] = useState(new Set());
  const [selectedMonths, setSelectedMonths] = useState(new Set());
  const [selectedVillages, setSelectedVillages] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);

  const list = [
    {
      title: "Audiensi dengan Wakil Bupati",
      img: "/pict/descan.png",
      link: "https://drive.google.com/file/d/1L--SOZFEvjzKnGDJKWWrf51J7bAQ9GLQ/view",
      year: "2024",
      month: "Juli",
      village: "Desa Simoanginangin",
      description: "Surat edaran tentang dukungan pelaksanaan pembinaan Desa Cantik di Kabupaten Sidoarjo tahun 2024",
      date: "29 Juli 2024"
    },
    {
      title: "Overview Pelatihan Calon Pembina Desa Cantik",
      img: "/pict/descan.png",
      link: "https://drive.google.com/file/d/12ztl4rglSRdjpXVePm0CLnm5IPIXVtmP/view",
      year: "2024",
      month: "Juli",
      village: "Desa Simoanginangin",
      description: "Pedoman teknis program Desa Cantik tahun 2024",
      date: "25 Juli 2024"
    },
    {
      title: "Rancangan Kegiatan Desa Cantik",
      img: "/pict/descan.png",
      link: "https://drive.google.com/file/d/1qH1w-nGuIZb664yNpB0gRFPfSMPSVyGT/view",
      year: "2024",
      month: "Juli",
      village: "Desa Simoanginangin",
      description: "Rancangan kegiatan Desa Simoanginangin sebagai Desa Cantik Kabupaten Sidoarjo tahun 2024",
      date: "24 Juli 2024"
    },
    {
      title: "Sosialisasi dan Pencanangan Desa Cantik",
      img: "/pict/descan.png",
      link: "https://drive.google.com/file/d/1MyF5HhGhe993dMv14gsUSHXqVm01tfxe/view",
      year: "2024",
      month: "Juli",
      village: "Desa Simoanginangin",
      description: "Sosialisasi dan pencanangan Desa Cantik oleh Kepala BPS Kabupaten Sidoarjo bersama dengan Sekretaris Daerah",
      date: "23 Juli 2024"
    },
    {
      title: "Pendampingan Updating Website Diskominfo",
      img: "/pict/descan.png",
      link: "https://drive.google.com/file/d/1G4oWqZk0ezN5q5UAfSrEUjGs881SJ4jA/view",
      year: "2024",
      month: "Juli",
      village: "Desa Simoanginangin",
      description: "Koordinasi pemutakhiran website Desa Simoangin Angin antara Operator Website, tim Desa Cantik BPS Kabupaten Sidoarjo dan Diskominfo Kabupaten Sidoarjo",
      date: "22 Juli 2024"
    },
    {
      title: "Koordinasi terkait Update Website Desa Simoanginangin",
      img: "/pict/descan.png",
      link: "https://drive.google.com/file/d/1jbzu5O7YxAlfnVv3waoEsvCR05qumjv2/view",
      year: "2024",
      month: "Juli",
      village: "Desa Simoanginangin",
      description: "Koordinasi rencana pemutakhiran website Desa Simoangin Angin",
      date: "15 Juli 2024"
    },
    {
      title: "Internalisasi Desa Cantik oleh BPS Pusat",
      img: "/pict/descan.png",
      link: "https://drive.google.com/file/d/1ttpbzNd7JC2U5W81yk46MX0cRy8wV7xJ/view",
      year: "2024",
      month: "Juli",
      village: "Desa Simoanginangin",
      description: "Program pembinaan Desa Cantik tahun 2024 oleh BPS Pusat",
      date: "10 Juli 2024"
    }
  ];

  const years = ["2024", "2023", "2022", "2021"];
  const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  const villages = ["Desa Simoanginangin", "Desa Simoketawang", "Desa Grogol", "Desa Sugihwaras", "Desa Kludan", "Desa Kedungturi", "Desa Masangan Kulon"];

  const itemsPerPage = 4;

  const filteredList = useMemo(() => {
    return list.filter((item) => {
      const yearMatch = selectedYears.size === 0 || selectedYears.has(item.year);
      const monthMatch = selectedMonths.size === 0 || selectedMonths.has(item.month);
      const villageMatch = selectedVillages.size === 0 || selectedVillages.has(item.village);
      return yearMatch && monthMatch && villageMatch;
    });
  }, [selectedYears, selectedMonths, selectedVillages, list]);

  const maxPage = Math.ceil(filteredList.length / itemsPerPage);

  const currentItems = useMemo(() => filteredList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage), [filteredList, currentPage, itemsPerPage]);

  const selectedYearsValue = useMemo(() => Array.from(selectedYears).join(", ") || "Tahun", [selectedYears]);
  const selectedMonthsValue = useMemo(() => Array.from(selectedMonths).join(", ") || "Bulan", [selectedMonths]);
  const selectedVillagesValue = useMemo(() => Array.from(selectedVillages).join(", ") || "Desa", [selectedVillages]);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const handleSelectionChange = (setter) => (keys) => {
    setter(keys);
    setCurrentPage(1); // Reset page to 1 whenever a filter changes
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full max-w-6xl">
        <h1 className="mb-2 text-left w-full header text-2xl font-sans font-bold" style={{ marginTop: '30px' }}>Buletin</h1>
        <p className="mb-6 text-left w-full sub-header text-xl font-sans">Berikut merupakan dokumen laporan terkait Desa Cantik yaitu Desa Simoanginangin Kabupaten Sidoarjo tahun 2024.</p>
        <p className="mb-6 text-left w-full sub-header text-xl font-sans font-bold">Pilih filter dokumen</p>

        <div className="flex space-x-4 mb-6">
          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered" className="capitalize text-xl">{selectedYearsValue}</Button>
            </DropdownTrigger>
            <DropdownMenu 
              aria-label="Multiple selection example"
              variant="flat"
              closeOnSelect={false}
              disallowEmptySelection
              selectionMode="multiple"
              selectedKeys={selectedYears}
              onSelectionChange={handleSelectionChange(setSelectedYears)}
            >
              {years.map((year) => (
                <DropdownItem key={year}>{year}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered" className="capitalize text-xl">{selectedMonthsValue}</Button>
            </DropdownTrigger>
            <DropdownMenu 
              aria-label="Multiple selection example"
              variant="flat"
              closeOnSelect={false}
              disallowEmptySelection
              selectionMode="multiple"
              selectedKeys={selectedMonths}
              onSelectionChange={handleSelectionChange(setSelectedMonths)}
            >
              {months.map((month) => (
                <DropdownItem key={month}>{month}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered" className="capitalize text-xl">{selectedVillagesValue}</Button>
            </DropdownTrigger>
            <DropdownMenu 
              aria-label="Multiple selection example"
              variant="flat"
              closeOnSelect={false}
              disallowEmptySelection
              selectionMode="multiple"
              selectedKeys={selectedVillages}
              onSelectionChange={handleSelectionChange(setSelectedVillages)}
            >
              {villages.map((village) => (
                <DropdownItem key={village}>{village}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>

        <div className="w-full">
          {currentItems.map((item, index) => (
            <a href={item.link} target="_blank" rel="noopener noreferrer" key={index} className="block mb-4">
              <div className="flex bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <Image src={item.img} alt={item.title} width="220px" height="220px" className="object-cover" />
                <div className="p-4 flex flex-col justify-between w-full">
                  <div>
                    <h2 className="font-bold text-xl">{item.title}</h2>
                    <p className="text-lg text-gray-600">{item.year} - {item.month} - {item.village}</p>
                    <p className="mt-2 text-gray-800 text-lg text-justify">{item.description}</p>
                    <p className="mt-2 text-gray-800 font-semibold">Tanggal Rilis: {item.date}</p>
                  </div>
                  <Button color="primary" auto className="mt-4 self-start bg-[#EB891B]">Baca Selengkapnya</Button>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-4 flex justify-center" style={{ marginBottom: '30px' }}>
          <Pagination
            isCompact
            showControls
            total={maxPage}
            initialPage={currentPage}
            onChange={(page) => handlePageChange(page)}
          />
        </div>
      </div>
    </div>
  );
}