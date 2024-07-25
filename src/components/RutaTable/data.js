const columns = [
  { name: "Kode", uid: "kode" },
  { name: "Nama KRT", uid: "krt" },
  { name: "Klasifikasi UMKM", uid: "klasifikasi" },
  { name: "Jenis", uid: "jenis" },
  { name: "Aksi", uid: "aksi" },
];

const daftarRumahTangga = [
  {
    kode: "3515009001001",
    krt: "Fandi Hidayat",
    klasifikasi: "A",
    jenis: "Tetap",
  },
  {
    kode: "3515009001003",
    krt: "Hadi Yusuf",
    klasifikasi: "B",
    jenis: "Non Tetap",
  },
  {
    kode: "3515009001003",
    krt: "Budi Setiawan",
    klasifikasi: "C",
    jenis: "Tetap",
  },
];

export { columns, daftarRumahTangga };
