export const payrollConfig = {
  key: "payroll",
  title: "Payroll",
  singular: "Payroll",
  description: "Susun penggajian bulanan dengan gaji pokok dan lembur disetujui yang terhubung otomatis.",
  table: "payroll",
  id: "id_payroll",
  select: "*,karyawan(nama,nik,jabatan,unit_kerja)",
  order: "periode",
  searchPlaceholder: "Cari nama atau NIK karyawan...",
  search: ["karyawan.nama", "karyawan.nik", "karyawan.unit_kerja"],
  columns: [["periode", "Periode"], ["id_karyawan", "Karyawan"], ["gaji_pokok", "Gaji Pokok"], ["total_lembur", "Total Lembur"], ["tunjangan", "Tunjangan"], ["insentif", "Insentif"], ["gaji_bersih", "Gaji Bersih"], ["status_pembayaran", "Status"]],
  filters: [
    { field: "status_pembayaran", label: "Semua Status", options: ["Draft", "Diproses", "Dibayar"] },
    { field: "karyawan.unit_kerja", label: "Semua Unit", source: "units" }
  ],
  dateFilter: { field: "periode", label: "Periode", type: "month" },
  fields: [
    { name: "id_karyawan", label: "Karyawan", type: "employee", required: true },
    { name: "periode", label: "Periode Payroll", type: "month", required: true },
    { name: "tunjangan", label: "Tunjangan (Rp)", type: "number", min: "0", step: "1000", required: true, default: "0" },
    { name: "insentif", label: "Insentif (Rp)", type: "number", min: "0", step: "1000", required: true, default: "0" },
    { name: "potongan", label: "Potongan (Rp)", type: "number", min: "0", step: "1000", required: true, default: "0" },
    { name: "status_pembayaran", label: "Status Pembayaran", type: "select", options: ["Draft", "Diproses", "Dibayar"], required: true, default: "Draft" },
    { name: "tanggal_bayar", label: "Tanggal Pembayaran", type: "date" }
  ]
};
