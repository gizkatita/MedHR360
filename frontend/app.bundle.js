(function () {
// Source: frontend/config.js
const supabaseUrl = "https://tcwungdywrhktdxuylwo.supabase.co";
const supabaseAnonKey = "sb_publishable_z2MYg6O0poc5tWBql33OJA_kRWkkL0n";
const supabaseSdkReady = typeof window.supabase?.createClient === "function";

const supabaseClient = supabaseUrl && supabaseAnonKey && supabaseSdkReady
  ? window.supabase.createClient(supabaseUrl, supabaseAnonKey)
  : null;

const supabaseConfigMessage = supabaseClient
  ? ""
  : !supabaseUrl || !supabaseAnonKey
    ? "Atur SUPABASE_URL dan SUPABASE_ANON_KEY pada konfigurasi proyek."
    : "Library Supabase gagal dimuat. Periksa koneksi internet lalu muat ulang halaman.";


// Source: frontend/js/karyawan.js
const karyawanConfig = {
  key: "karyawan",
  title: "Data Karyawan",
  singular: "Karyawan",
  description: "Kelola identitas, status kerja, dan kompensasi karyawan rumah sakit.",
  table: "karyawan",
  id: "id_karyawan",
  select: "*",
  order: "nama",
  searchPlaceholder: "Cari nama, NIK, jabatan, unit kerja...",
  search: ["nama", "nik", "jabatan", "unit_kerja"],
  columns: [["nama", "Nama Karyawan"], ["nik", "NIK"], ["jabatan", "Jabatan"], ["unit_kerja", "Unit Kerja"], ["status_pegawai", "Status Pegawai"], ["gaji_pokok", "Gaji Pokok"], ["status_aktif", "Status"]],
  filters: [
    { field: "unit_kerja", label: "Semua Unit", source: "units" },
    { field: "status_pegawai", label: "Semua Status Pegawai", options: ["Tetap", "Kontrak", "Honorer"] },
    { field: "status_aktif", label: "Semua Status", options: ["Aktif", "Nonaktif"] }
  ],
  fields: [
    { name: "nik", label: "NIK / Nomor Pegawai", required: true, maxlength: 32 },
    { name: "nama", label: "Nama Lengkap", required: true, minlength: 2, maxlength: 150 },
    { name: "jabatan", label: "Jabatan", required: true, maxlength: 100 },
    { name: "unit_kerja", label: "Unit Kerja", required: true, maxlength: 100 },
    { name: "status_pegawai", label: "Status Pegawai", type: "select", options: ["Tetap", "Kontrak", "Honorer"], required: true },
    { name: "status_aktif", label: "Status Aktif", type: "select", options: ["Aktif", "Nonaktif"], required: true, default: "Aktif" },
    { name: "gaji_pokok", label: "Gaji Pokok (Rp)", type: "number", min: "0", step: "1000", required: true },
    { name: "tanggal_masuk", label: "Tanggal Masuk", type: "date", required: true },
    { name: "no_hp", label: "Nomor HP", type: "tel", maxlength: 30 },
    { name: "email", label: "Email", type: "email", maxlength: 254 }
  ]
};


// Source: frontend/js/absensi.js
const absensiConfig = {
  key: "absensi",
  title: "Absensi",
  singular: "Absensi",
  description: "Pantau kehadiran harian dan keterlambatan karyawan.",
  table: "absensi",
  id: "id_absensi",
  select: "*,karyawan(nama,nik,jabatan,unit_kerja)",
  order: "tanggal",
  searchPlaceholder: "Cari nama, NIK, atau keterangan...",
  search: ["karyawan.nama", "karyawan.nik", "keterangan"],
  columns: [["tanggal", "Tanggal"], ["id_karyawan", "Karyawan"], ["jam_masuk", "Jam Masuk"], ["jam_keluar", "Jam Keluar"], ["status_kehadiran", "Status Kehadiran"], ["keterlambatan", "Terlambat (menit)"]],
  filters: [
    { field: "status_kehadiran", label: "Semua Status", options: ["Hadir", "Izin", "Sakit", "Cuti", "Alpa"] },
    { field: "id_karyawan", label: "Semua Karyawan", source: "employees" }
  ],
  dateFilter: { field: "tanggal", label: "Tanggal", type: "date" },
  fields: [
    { name: "id_karyawan", label: "Karyawan", type: "employee", required: true },
    { name: "tanggal", label: "Tanggal", type: "date", required: true },
    { name: "status_kehadiran", label: "Status Kehadiran", type: "select", options: ["Hadir", "Izin", "Sakit", "Cuti", "Alpa"], required: true },
    { name: "jam_masuk", label: "Jam Masuk", type: "time" },
    { name: "jam_keluar", label: "Jam Keluar", type: "time" },
    { name: "keterangan", label: "Keterangan", type: "textarea", wide: true }
  ]
};


// Source: frontend/js/lembur.js
const lemburConfig = {
  key: "lembur",
  title: "Pengelolaan Lembur",
  singular: "Pengajuan Lembur",
  description: "Kelola pengajuan, persetujuan, dan nominal lembur yang terhubung dengan payroll.",
  table: "lembur",
  id: "id_lembur",
  select: "*,karyawan(nama,nik,jabatan,unit_kerja)",
  order: "tanggal",
  searchPlaceholder: "Cari nama, NIK, atau keterangan...",
  search: ["karyawan.nama", "karyawan.nik", "keterangan"],
  columns: [["id_karyawan", "Karyawan"], ["tanggal", "Tanggal"], ["jam_mulai", "Mulai"], ["jam_selesai", "Selesai"], ["total_jam", "Total Jam"], ["total_lembur", "Nominal Lembur"], ["status", "Status"]],
  filters: [
    { field: "status", label: "Semua Status", options: ["Menunggu", "Disetujui", "Ditolak"] },
    { field: "id_karyawan", label: "Semua Karyawan", source: "employees" }
  ],
  dateFilter: { field: "tanggal", label: "Bulan", type: "month" },
  fields: [
    { name: "id_karyawan", label: "Karyawan", type: "employee", required: true },
    { name: "tanggal", label: "Tanggal Lembur", type: "date", required: true },
    { name: "jam_mulai", label: "Jam Mulai", type: "time", required: true },
    { name: "jam_selesai", label: "Jam Selesai", type: "time", required: true },
    { name: "tarif_lembur", label: "Tarif per Jam (Rp)", type: "number", min: "0", step: "1000", required: true },
    { name: "status", label: "Status Pengajuan", type: "select", options: ["Menunggu", "Disetujui", "Ditolak"], required: true, default: "Menunggu" },
    { name: "keterangan", label: "Keterangan", type: "textarea", wide: true }
  ]
};


// Source: frontend/js/kinerja.js
const kinerjaConfig = {
  key: "kinerja",
  title: "Penilaian Kinerja",
  singular: "Penilaian Kinerja",
  description: "Evaluasi karyawan berdasarkan indikator terukur dan predikat otomatis.",
  table: "penilaian_kinerja",
  id: "id_penilaian",
  select: "*,karyawan(nama,nik,jabatan,unit_kerja)",
  order: "periode",
  searchPlaceholder: "Cari nama karyawan, NIK, atau predikat...",
  search: ["karyawan.nama", "karyawan.nik", "predikat", "catatan"],
  columns: [["periode", "Periode"], ["id_karyawan", "Karyawan"], ["skor_kehadiran", "Kehadiran"], ["skor_kedisiplinan", "Disiplin"], ["skor_kinerja", "Kinerja"], ["skor_target", "Target"], ["total_skor", "Total Skor"], ["predikat", "Predikat"]],
  filters: [
    { field: "predikat", label: "Semua Predikat", options: ["Sangat Baik", "Baik", "Cukup", "Kurang", "Sangat Kurang"] },
    { field: "id_karyawan", label: "Semua Karyawan", source: "employees" }
  ],
  dateFilter: { field: "periode", label: "Periode", type: "month" },
  fields: [
    { name: "id_karyawan", label: "Karyawan", type: "employee", required: true },
    { name: "periode", label: "Periode Penilaian", type: "month", required: true },
    { name: "skor_kehadiran", label: "Skor Kehadiran (0-100)", type: "number", min: "0", max: "100", step: ".01", required: true },
    { name: "skor_kedisiplinan", label: "Skor Kedisiplinan (0-100)", type: "number", min: "0", max: "100", step: ".01", required: true },
    { name: "skor_kinerja", label: "Skor Kinerja (0-100)", type: "number", min: "0", max: "100", step: ".01", required: true },
    { name: "skor_target", label: "Skor Target (0-100)", type: "number", min: "0", max: "100", step: ".01", required: true },
    { name: "catatan", label: "Catatan Evaluasi", type: "textarea", wide: true }
  ]
};


// Source: frontend/js/payroll.js
const payrollConfig = {
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


// Source: frontend/js/app.js

const configs = Object.fromEntries([karyawanConfig, absensiConfig, lemburConfig, kinerjaConfig, payrollConfig].map((item) => [item.key, item]));
const labels = { dashboard: "Dashboard", ...Object.fromEntries(Object.values(configs).map((item) => [item.key, item.title])), laporan: "Laporan" };
const state = { view: "dashboard", rows: [], employees: [], search: "", filters: {}, date: "", reportType: "payroll", reportPeriod: new Date().toISOString().slice(0, 7), reportUnit: "", reportEmployee: "", reportStatus: "", reportRows: [], editing: null, compact: false };
const $ = (id) => document.getElementById(id);
const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
const money = (value) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(Number(value || 0));
const numeric = (value) => new Intl.NumberFormat("id-ID", { maximumFractionDigits: 2 }).format(Number(value || 0));
const today = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
};
const currentMonth = () => today().slice(0, 7);
const monthDate = (month) => `${String(month || "").slice(0, 7)}-01`;
const monthLabel = (value) => value ? new Intl.DateTimeFormat("id-ID", { month: "long", year: "numeric" }).format(new Date(`${String(value).slice(0, 7)}-01T12:00:00`)) : "-";
const dateLabel = (value) => value ? new Intl.DateTimeFormat("id-ID", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(`${String(value).slice(0, 10)}T12:00:00`)) : "-";
const statuses = ["Hadir", "Izin", "Sakit", "Cuti", "Alpa"];
const reportTypes = {
  karyawan: { label: "Laporan Karyawan", table: "karyawan", id: "id_karyawan", select: "*", date: null, columns: [["nik", "NIK"], ["nama", "Nama"], ["jabatan", "Jabatan"], ["unit_kerja", "Unit Kerja"], ["status_pegawai", "Status Pegawai"], ["status_aktif", "Status Aktif"], ["gaji_pokok", "Gaji Pokok"]] },
  absensi: { label: "Laporan Absensi", table: "absensi", id: "id_absensi", select: "*,karyawan(nama,nik,jabatan,unit_kerja)", date: "tanggal", columns: [["tanggal", "Tanggal"], ["id_karyawan", "Karyawan"], ["status_kehadiran", "Status"], ["jam_masuk", "Jam Masuk"], ["jam_keluar", "Jam Keluar"], ["keterlambatan", "Terlambat (menit)"], ["keterangan", "Keterangan"]] },
  lembur: { label: "Laporan Lembur", table: "lembur", id: "id_lembur", select: "*,karyawan(nama,nik,jabatan,unit_kerja)", date: "tanggal", columns: [["tanggal", "Tanggal"], ["id_karyawan", "Karyawan"], ["status", "Status"], ["total_jam", "Total Jam"], ["tarif_lembur", "Tarif per Jam"], ["total_lembur", "Total Lembur"]] },
  kinerja: { label: "Laporan Kinerja", table: "penilaian_kinerja", id: "id_penilaian", select: "*,karyawan(nama,nik,jabatan,unit_kerja)", date: "periode", columns: [["periode", "Periode"], ["id_karyawan", "Karyawan"], ["total_skor", "Total Skor"], ["predikat", "Predikat"], ["catatan", "Catatan"]] },
  payroll: { label: "Laporan Payroll", table: "payroll", id: "id_payroll", select: "*,karyawan(nama,nik,jabatan,unit_kerja)", date: "periode", columns: [["periode", "Periode"], ["id_karyawan", "Karyawan"], ["gaji_pokok", "Gaji Pokok"], ["total_lembur", "Total Lembur"], ["tunjangan", "Tunjangan"], ["insentif", "Insentif"], ["potongan", "Potongan"], ["gaji_kotor", "Gaji Kotor"], ["gaji_bersih", "Gaji Bersih"], ["status_pembayaran", "Status"]] }
};

function icons() { window.lucide?.createIcons(); }

function toast(message, type = "success") {
  const node = $("toast");
  node.textContent = message;
  node.className = `toast is-visible${type === "error" ? " toast-error" : ""}`;
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => node.classList.remove("is-visible"), 4000);
}

function explainError(error) {
  if (error?.code === "23505") return "Data dengan NIK, tanggal, atau periode tersebut sudah tersedia.";
  if (error?.code === "23503") return "Karyawan terkait tidak ditemukan.";
  if (error?.code === "23514") return "Nilai tidak memenuhi aturan validasi database.";
  if (error?.code === "42501") return "Akses Supabase ditolak. Periksa policy RLS untuk deployment demo.";
  if (error?.code === "PGRST205" || error?.code === "42P01") return "Tabel belum ditemukan. Jalankan backend/supabase/schema.sql pada Supabase.";
  return error?.message || "Permintaan gagal. Periksa koneksi dan konfigurasi Supabase.";
}

function errorPage(error) {
  const setup = !supabaseClient;
  $("page-content").innerHTML = `<section class="page-heading"><div><span class="eyebrow">${setup ? "KONFIGURASI" : "KONEKSI DATABASE"}</span><h1>${setup ? "Hubungkan Supabase" : "Data belum dapat dimuat"}</h1><p>${esc(setup ? supabaseConfigMessage : explainError(error))}</p></div></section><section class="panel error-panel"><span class="feature-icon feature-gold"><i data-lucide="${setup ? "settings-2" : "wifi-off"}"></i></span><h2>${setup ? "Konfigurasikan akses database" : "Periksa skema dan koneksi"}</h2><p>${setup ? 'Isi SUPABASE_URL dan SUPABASE_ANON_KEY pada frontend/config.js menggunakan URL project dan anon/publishable key. Jangan gunakan service role key.' : `${esc(explainError(error))} Pastikan proyek Supabase aktif dan schema SQL sudah dijalankan.`}</p><button class="button button-primary" id="retry-load"><i data-lucide="refresh-cw"></i> Coba lagi</button></section>`;
  $("retry-load").addEventListener("click", () => void renderCurrent());
  icons();
}

async function loadEmployees() {
  const { data, error } = await supabaseClient.from("karyawan").select("id_karyawan,nik,nama,jabatan,unit_kerja,status_pegawai,status_aktif,gaji_pokok").order("nama");
  if (error) throw error;
  state.employees = data || [];
  return state.employees;
}

function employeeName(row) {
  const person = row.karyawan || state.employees.find((employee) => employee.id_karyawan === row.id_karyawan);
  return person ? `${person.nama} Â· ${person.nik}` : "Karyawan tidak ditemukan";
}

function badge(value) {
  const className = String(value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  return `<span class="status-badge status-${esc(className)}">${esc(value || "-")}</span>`;
}

function cellContent(field, row) {
  const value = row[field];
  if (field === "id_karyawan") return `<span class="mini-name"><span class="table-avatar">${esc((row.karyawan?.nama || "?").split(/\s+/).map((part) => part[0]).slice(0, 2).join(""))}</span><span><strong>${esc(row.karyawan?.nama || employeeName(row))}</strong><small>${esc(row.karyawan?.nik || "")}</small></span></span>`;
  if (["gaji_pokok", "tarif_lembur", "total_lembur", "tunjangan", "insentif", "potongan", "gaji_kotor", "gaji_bersih"].includes(field)) return `<span class="money-cell">${money(value)}</span>`;
  if (field === "periode") return esc(monthLabel(value));
  if (["tanggal", "tanggal_masuk", "tanggal_bayar"].includes(field)) return esc(dateLabel(value));
  if (["jam_masuk", "jam_keluar", "jam_mulai", "jam_selesai"].includes(field)) return esc(value ? String(value).slice(0, 5) : "-");
  if (field === "total_jam") return `${numeric(value)} jam`;
  if (field === "keterlambatan") return Number(value || 0) ? `${numeric(value)} menit` : "-";
  if (["total_skor", "skor_kehadiran", "skor_kedisiplinan", "skor_kinerja", "skor_target"].includes(field)) return numeric(value);
  if (["status", "status_kehadiran", "status_pegawai", "status_aktif", "status_pembayaran", "predikat"].includes(field)) return badge(value);
  return esc(value || "-");
}

function rowActions(key, row) {
  const config = configs[key];
  const id = esc(row[config.id]);
  const actions = [];
  if (key === "lembur" && row.status === "Menunggu") {
    actions.push(`<button class="icon-button approve-action" data-action="approve" data-id="${id}" aria-label="Setujui lembur" title="Setujui"><i data-lucide="check"></i></button>`);
    actions.push(`<button class="icon-button danger" data-action="reject" data-id="${id}" aria-label="Tolak lembur" title="Tolak"><i data-lucide="x"></i></button>`);
  }
  actions.push(`<button class="icon-button" data-action="detail" data-id="${id}" aria-label="Lihat detail" title="Lihat detail"><i data-lucide="eye"></i></button>`);
  if (key === "payroll") actions.push(`<button class="icon-button" data-action="slip" data-id="${id}" aria-label="Lihat slip gaji" title="Lihat slip gaji"><i data-lucide="file-text"></i></button>`);
  actions.push(`<button class="icon-button" data-action="edit" data-id="${id}" aria-label="Edit" title="Edit"><i data-lucide="pencil"></i></button>`);
  actions.push(`<button class="icon-button danger" data-action="delete" data-id="${id}" aria-label="Hapus" title="Hapus"><i data-lucide="trash-2"></i></button>`);
  return `<div class="row-actions">${actions.join("")}</div>`;
}

function filteredRows(key) {
  const config = configs[key];
  const query = state.search.trim().toLocaleLowerCase("id-ID");
  return state.rows.filter((row) => {
    const values = config.search.map((path) => path.split(".").reduce((value, part) => value?.[part], row));
    if (query && !values.some((value) => String(value ?? "").toLocaleLowerCase("id-ID").includes(query))) return false;
    if (config.filters.some((filter) => state.filters[filter.field] && String(filter.field.split(".").reduce((value, part) => value?.[part], row) ?? "") !== state.filters[filter.field])) return false;
    if (state.date && config.dateFilter) {
      const value = String(row[config.dateFilter.field] || "");
      if (config.dateFilter.type === "month" ? !value.startsWith(state.date) : value.slice(0, 10) !== state.date) return false;
    }
    return true;
  });
}

function renderRows(config, rows, actions = true) {
  if (!rows.length) return `<tr><td class="empty-cell" colspan="${config.columns.length + (actions ? 1 : 0)}"><i data-lucide="inbox"></i>Belum ada data yang sesuai filter.</td></tr>`;
  return rows.map((row) => `<tr>${config.columns.map(([field]) => `<td>${cellContent(field, row)}</td>`).join("")}${actions ? `<td>${rowActions(config.key, row)}</td>` : ""}</tr>`).join("");
}

function filterMarkup(config) {
  return config.filters.map((filter) => {
    const selected = state.filters[filter.field] || "";
    const options = filter.source === "employees"
      ? state.employees.map((employee) => [employee.id_karyawan, `${employee.nama} Â· ${employee.nik}`])
      : filter.source === "units"
        ? [...new Set(state.employees.map((employee) => employee.unit_kerja))].sort().map((unit) => [unit, unit])
        : filter.options.map((option) => [option, option]);
    return `<label class="filter-box"><span class="sr-only">${esc(filter.label)}</span><select data-filter="${esc(filter.field)}" aria-label="${esc(filter.label)}"><option value="">${esc(filter.label)}</option>${options.map(([value, label]) => `<option value="${esc(value)}" ${selected === value ? "selected" : ""}>${esc(label)}</option>`).join("")}</select></label>`;
  }).join("");
}

function renderEntityPage(config) {
  const rows = filteredRows(config.key);
  const dateFilter = config.dateFilter ? `<label class="filter-box"><span class="sr-only">${esc(config.dateFilter.label)}</span><input type="${config.dateFilter.type}" id="record-date" value="${esc(state.date)}" aria-label="${esc(config.dateFilter.label)}"></label>` : "";
  $("page-content").innerHTML = `<section class="page-heading"><div><span class="eyebrow">MANAJEMEN OPERASIONAL</span><h1>${esc(config.title)}</h1><p>${esc(config.description)}</p></div><button class="button button-primary" id="add-record"><i data-lucide="plus"></i> Tambah ${esc(config.singular)}</button></section><section class="panel data-panel"><div class="table-toolbar"><span class="table-count"><strong>${rows.length}</strong> data tercatat</span><div class="table-tools"><label class="search-box"><i data-lucide="search"></i><input id="record-search" type="search" value="${esc(state.search)}" placeholder="${esc(config.searchPlaceholder)}" aria-label="Cari data"></label>${filterMarkup(config)}${dateFilter}</div></div><div class="table-scroll"><table class="data-table"><thead><tr>${config.columns.map(([, label]) => `<th>${esc(label)}</th>`).join("")}<th>Aksi</th></tr></thead><tbody id="record-body">${renderRows(config, rows)}</tbody></table></div><div class="table-foot"><span>${rows.length} dari ${state.rows.length} data</span><span><i data-lucide="database"></i> Data aktual Supabase PostgreSQL</span></div></section>`;
  $("add-record").addEventListener("click", () => void openForm(config.key));
  $("record-search").addEventListener("input", (event) => { state.search = event.target.value; refreshTable(config); });
  document.querySelectorAll("[data-filter]").forEach((select) => select.addEventListener("change", (event) => { state.filters[event.target.dataset.filter] = event.target.value; refreshTable(config); }));
  $("record-date")?.addEventListener("change", (event) => { state.date = event.target.value; refreshTable(config); });
  $("record-body").addEventListener("click", (event) => void handleRowAction(config.key, event));
  icons();
}

function refreshTable(config) {
  const rows = filteredRows(config.key);
  $("record-body").innerHTML = renderRows(config, rows);
  document.querySelector(".table-count strong").textContent = rows.length;
  document.querySelector(".table-foot span").textContent = `${rows.length} dari ${state.rows.length} data`;
  icons();
}

async function renderEntity(key) {
  const config = configs[key];
  const [result] = await Promise.all([
    supabaseClient.from(config.table).select(config.select).order(config.order, { ascending: key === "karyawan" })
  ]);
  if (result.error) throw result.error;
  state.rows = result.data || [];
  await loadEmployees();
  renderEntityPage(config);
}

function metricCard(label, value, detail, icon, shade = "metric-teal", moneyValue = false) {
  return `<article class="metric-card ${shade}"><div class="metric-top"><span>${esc(label)}</span><i data-lucide="${icon}"></i></div><strong class="${moneyValue ? "metric-money" : ""}">${moneyValue ? money(value) : esc(value)}</strong><small>${esc(detail)}</small></article>`;
}

function barChart(items, color = "teal") {
  const max = Math.max(1, ...items.map((item) => Number(item.value) || 0));
  if (!items.length) return `<div class="chart-empty">Belum ada data untuk ditampilkan.</div>`;
  return `<div class="chart-list">${items.map((item) => `<div class="chart-row"><span title="${esc(item.label)}">${esc(item.label)}</span><div class="chart-track"><span class="bar-${color}" style="width:${item.value ? Math.max(3, Number(item.value) / max * 100) : 0}%"></span></div><strong>${esc(item.display ?? numeric(item.value))}</strong></div>`).join("")}</div>`;
}

function compactPayroll(rows) {
  if (!rows.length) return `<div class="chart-empty">Belum ada payroll untuk periode ini.</div>`;
  return `<div class="mini-table-wrap"><table class="mini-table"><thead><tr><th>KARYAWAN</th><th>PERIODE</th><th>GAJI BERSIH</th></tr></thead><tbody>${rows.slice(0, 5).map((row) => `<tr><td><strong>${esc(row.karyawan?.nama || "-")}</strong></td><td>${esc(monthLabel(row.periode))}</td><td><strong>${money(row.gaji_bersih)}</strong></td></tr>`).join("")}</tbody></table></div>`;
}

async function renderDashboard() {
  const results = await Promise.all([
    supabaseClient.from("karyawan").select("id_karyawan,nama,unit_kerja,status_pegawai,status_aktif"),
    supabaseClient.from("absensi").select("tanggal,status_kehadiran").gte("tanggal", `${currentMonth()}-01`).lte("tanggal", today()),
    supabaseClient.from("lembur").select("status"),
    supabaseClient.from("payroll").select("periode,gaji_bersih,karyawan(nama)").gte("periode", monthDate(shiftMonth(currentMonth(), -5))).order("periode"),
    supabaseClient.from("penilaian_kinerja").select("total_skor,predikat,periode")
  ]);
  const failed = results.find((result) => result.error);
  if (failed) throw failed.error;
  const [employees, attendance, overtime, payroll, performance] = results.map((result) => result.data || []);
  const active = employees.filter((row) => row.status_aktif === "Aktif");
  const todayAttendance = attendance.filter((row) => row.tanggal === today());
  const pending = overtime.filter((row) => row.status === "Menunggu").length;
  const monthPayroll = payroll.filter((row) => String(row.periode).startsWith(currentMonth()));
  const averageScore = performance.length ? performance.reduce((sum, row) => sum + Number(row.total_skor), 0) / performance.length : 0;
  const attendanceCounts = statuses.map((label) => ({ label, value: attendance.filter((row) => row.status_kehadiran === label).length }));
  const months = Array.from({ length: 6 }, (_, index) => shiftMonth(currentMonth(), index - 5));
  const payrollTrend = months.map((period) => ({ label: new Intl.DateTimeFormat("id-ID", { month: "short" }).format(new Date(`${period}-01T12:00:00`)), value: payroll.filter((row) => String(row.periode).startsWith(period)).reduce((sum, row) => sum + Number(row.gaji_bersih || 0), 0), display: formatCompactMoney(payroll.filter((row) => String(row.periode).startsWith(period)).reduce((sum, row) => sum + Number(row.gaji_bersih || 0), 0)) }));
  const unitCounts = [...new Set(employees.map((row) => row.unit_kerja))].sort().map((label) => ({ label, value: employees.filter((row) => row.unit_kerja === label).length }));
  const statusCounts = ["Tetap", "Kontrak", "Honorer"].map((label) => ({ label, value: employees.filter((row) => row.status_pegawai === label).length }));
  const performanceCounts = ["Sangat Baik", "Baik", "Cukup", "Kurang", "Sangat Kurang"].map((label) => ({ label, value: performance.filter((row) => row.predikat === label).length }));
  const laborCosts = monthPayroll.reduce((acc, row) => {
    acc.net += Number(row.gaji_bersih || 0);
    return acc;
  }, { net: 0 });
  const monthLabelNow = monthLabel(monthDate(currentMonth()));
  $("page-content").innerHTML = `<section class="welcome-row"><div><span class="eyebrow">RINGKASAN OPERASIONAL &amp; KEUANGAN</span><h1>Selamat datang di MedHR</h1><p>Ringkasan SDM rumah sakit Â· ${esc(monthLabelNow)}</p></div><button class="button button-primary" id="quick-add"><i data-lucide="plus"></i> Tambah data</button></section>
    <section class="metric-grid">${metricCard("Total Karyawan Aktif", active.length, `${employees.length} total karyawan`, "users-round")}${metricCard("Hadir Hari Ini", todayAttendance.filter((row) => row.status_kehadiran === "Hadir").length, `${todayAttendance.length} catatan absensi hari ini`, "calendar-check-2", "metric-blue")}${metricCard("Lembur Menunggu", pending, "pengajuan perlu ditinjau", "clock-4", "metric-amber")}${metricCard("Payroll Bulan Ini", laborCosts.net, `${monthPayroll.length} data payroll Â· gaji bersih`, "wallet-cards", "metric-mint", true)}${metricCard("Rata-rata Kinerja", `${numeric(averageScore)} / 100`, `${performance.length} penilaian kinerja`, "award", "metric-purple")}</section>
    <section class="dashboard-grid"><article class="panel panel-pad"><div class="panel-heading"><div><span class="eyebrow">BULAN BERJALAN</span><h2>Ringkasan kehadiran</h2></div><button class="inline-link" data-open-view="absensi">Buka absensi <i data-lucide="arrow-up-right"></i></button></div>${barChart(attendanceCounts)}</article><article class="panel panel-pad"><div class="panel-heading"><div><span class="eyebrow">ENAM PERIODE TERAKHIR</span><h2>Payroll bulanan</h2></div><button class="inline-link" data-open-view="payroll">Semua payroll <i data-lucide="arrow-up-right"></i></button></div>${barChart(payrollTrend, "blue")}</article></section>
    <section class="dashboard-grid dashboard-grid-secondary"><article class="panel panel-pad"><div class="panel-heading"><div><span class="eyebrow">KOMPOSISI TENAGA KERJA</span><h2>Karyawan berdasarkan unit kerja</h2></div></div>${barChart(unitCounts, "green")}<div class="chart-subheading">Status pegawai</div>${barChart(statusCounts, "gold")}</article><article class="panel panel-pad"><div class="panel-heading"><div><span class="eyebrow">HASIL EVALUASI</span><h2>Distribusi predikat kinerja</h2></div><button class="inline-link" data-open-view="kinerja">Penilaian <i data-lucide="arrow-up-right"></i></button></div>${barChart(performanceCounts, "purple")}</article></section>
    <section class="dashboard-grid dashboard-grid-secondary"><article class="panel panel-pad"><div class="panel-heading"><div><span class="eyebrow">PENGGAJIAN TERBARU</span><h2>Payroll terakhir</h2></div><button class="inline-link" data-open-view="payroll">Kelola payroll <i data-lucide="arrow-up-right"></i></button></div>${compactPayroll([...payroll].sort((a, b) => String(b.periode).localeCompare(String(a.periode))).slice(0, 5))}</article><article class="panel panel-pad dashboard-note"><div class="panel-heading"><div><span class="eyebrow">SISTEM INFORMASI AKUNTANSI</span><h2>Biaya tenaga kerja terintegrasi</h2></div><i data-lucide="chart-no-axes-combined"></i></div><p>Persetujuan lembur memperbarui nilai lembur payroll secara otomatis. Gaji pokok, tunjangan, insentif, dan potongan membentuk informasi biaya penggajian.</p><button class="button button-quiet" data-open-view="laporan"><i data-lucide="file-chart-column"></i> Buka laporan &amp; ringkasan biaya</button></article></section>`;
  $("quick-add").addEventListener("click", openQuickAdd);
  icons();
}

function shiftMonth(month, offset) {
  const [year, monthNumber] = month.split("-").map(Number);
  const date = new Date(Date.UTC(year, monthNumber - 1 + offset, 1));
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
}

function formatCompactMoney(amount) {
  if (!amount) return "Rp0";
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", notation: "compact", maximumFractionDigits: 1 }).format(amount);
}

async function employeeOptions(selected = "") {
  if (!state.employees.length) await loadEmployees();
  const available = state.employees.filter((employee) => employee.status_aktif === "Aktif" || employee.id_karyawan === selected);
  return `<option value="">Pilih karyawan...</option>${available.map((person) => `<option value="${esc(person.id_karyawan)}" ${person.id_karyawan === selected ? "selected" : ""}>${esc(person.nama)} Â· ${esc(person.nik)}</option>`).join("")}`;
}

async function fieldMarkup(field, value, editing) {
  const required = field.required ? " required" : "";
  const limits = ["min", "max", "step", "minlength", "maxlength"].filter((key) => field[key] !== undefined).map((key) => `${key}="${esc(field[key])}"`).join(" ");
  const localDate = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString();
  const defaultDate = field.type === "month" ? localDate.slice(0, 7) : ["date"].includes(field.type) ? localDate.slice(0, 10) : "";
  const initial = value ?? field.default ?? defaultDate;
  const wide = field.wide ? " field-wide" : "";
  if (field.type === "employee") return `<label class="form-field${wide}"><span>${esc(field.label)}</span><select name="${esc(field.name)}"${required}>${await employeeOptions(initial)}</select></label>`;
  if (field.type === "select") return `<label class="form-field${wide}"><span>${esc(field.label)}</span><select name="${esc(field.name)}"${required}><option value="">Pilih ${esc(field.label.toLowerCase())}...</option>${field.options.map((option) => `<option value="${esc(option)}" ${initial === option ? "selected" : ""}>${esc(option)}</option>`).join("")}</select></label>`;
  const type = field.type || "text";
  const inputValue = type === "month" ? String(initial || "").slice(0, 7) : initial;
  if (type === "textarea") return `<label class="form-field${wide}"><span>${esc(field.label)}</span><textarea name="${esc(field.name)}" ${limits}${required}>${esc(inputValue)}</textarea></label>`;
  return `<label class="form-field${wide}"><span>${esc(field.label)}</span><input name="${esc(field.name)}" type="${esc(type)}" value="${esc(inputValue)}" ${limits}${required}${field.readonly ? " readonly" : ""}></label>`;
}

function modalOpen() {
  $("modal-backdrop").hidden = false;
  document.body.classList.add("modal-open");
  $("form-error").textContent = "";
}

async function openForm(key, row = null) {
  const config = configs[key];
  state.editing = { key, id: row?.[config.id] || null };
  $("modal-eyebrow").textContent = row ? "UBAH DATA" : "DATA BARU";
  $("modal-title").textContent = `${row ? "Edit" : "Tambah"} ${config.singular}`;
  $("modal-save").hidden = false;
  $("modal-save").querySelector("span").textContent = row ? "Simpan perubahan" : "Simpan data";
  const fields = await Promise.all(config.fields.map((field) => fieldMarkup(field, row?.[field.name], Boolean(row))));
  const preview = key === "lembur" ? `<div class="form-preview" id="overtime-preview">Durasi dan nominal dihitung otomatis oleh database.</div>` : key === "payroll" ? `<div class="form-preview" id="payroll-preview">Pilih karyawan dan periode untuk melihat ringkasan penggajian.</div>` : "";
  $("form-fields").innerHTML = fields.join("") + preview;
  $("modal-save").disabled = false;
  $("record-form").dataset.module = key;
  modalOpen();
  bindFormEvents(key);
  if (key === "payroll") await updatePayrollPreview(row);
  if (key === "lembur") updateOvertimePreview();
  icons();
  $("form-fields").querySelector("input,select,textarea")?.focus();
}

function bindFormEvents(key) {
  const form = $("record-form");
  if (key === "absensi") {
    form.querySelector('[name="status_kehadiran"]').addEventListener("change", (event) => {
      const present = event.target.value === "Hadir";
      form.querySelector('[name="jam_masuk"]').required = present;
      form.querySelector('[name="jam_keluar"]').required = present;
    });
  }
  if (key === "lembur") form.querySelectorAll('[name="jam_mulai"],[name="jam_selesai"],[name="tarif_lembur"]').forEach((input) => input.addEventListener("input", updateOvertimePreview));
  if (key === "payroll") {
    form.querySelector('[name="id_karyawan"]').addEventListener("change", () => void updatePayrollPreview());
    form.querySelector('[name="periode"]').addEventListener("change", () => void updatePayrollPreview());
    form.querySelectorAll('[name="tunjangan"],[name="insentif"],[name="potongan"]').forEach((input) => input.addEventListener("input", updatePayrollTotals));
    form.querySelector('[name="status_pembayaran"]').addEventListener("change", (event) => {
      const paidDate = form.querySelector('[name="tanggal_bayar"]');
      if (event.target.value === "Dibayar" && !paidDate.value) paidDate.value = today();
      if (event.target.value !== "Dibayar") paidDate.value = "";
    });
  }
}

function updateOvertimePreview() {
  const form = $("record-form");
  const start = form.elements.jam_mulai?.value;
  const finish = form.elements.jam_selesai?.value;
  const rate = Number(form.elements.tarif_lembur?.value || 0);
  if (!start || !finish) {
    $("overtime-preview").textContent = "Durasi dan nominal dihitung otomatis oleh database.";
    return;
  }
  let minutes = Number(finish.slice(0, 2)) * 60 + Number(finish.slice(3, 5)) - Number(start.slice(0, 2)) * 60 - Number(start.slice(3, 5));
  if (minutes < 0) minutes += 1440;
  const hours = Math.round(minutes / 60 * 100) / 100;
  $("overtime-preview").textContent = `Perkiraan ${numeric(hours)} jam Â· ${money(hours * rate)}. Nilai final dihitung database.`;
}

async function updatePayrollPreview(row = null) {
  const form = $("record-form");
  const employeeId = form.elements.id_karyawan.value;
  const period = form.elements.periode.value;
  const employee = state.employees.find((item) => item.id_karyawan === employeeId);
  let overtimeTotal = 0;
  if (employeeId && period) {
    $("payroll-preview").textContent = "Mengambil data lembur disetujui...";
    const start = monthDate(period);
    const [year, month] = period.split("-").map(Number);
    const finish = new Date(Date.UTC(year, month, 1)).toISOString().slice(0, 10);
    const { data, error } = await supabaseClient.from("lembur").select("total_lembur").eq("id_karyawan", employeeId).eq("status", "Disetujui").gte("tanggal", start).lt("tanggal", finish);
    if (error) {
      $("form-error").textContent = explainError(error);
      toast(explainError(error), "error");
      return;
    }
    overtimeTotal = (data || []).reduce((sum, item) => sum + Number(item.total_lembur || 0), 0);
  }
  const salary = employee ? Number(employee.gaji_pokok) : 0;
  form.dataset.payrollSalary = String(salary);
  form.dataset.approvedOvertime = String(overtimeTotal);
  updatePayrollTotals();
}

function updatePayrollTotals() {
  const form = $("record-form");
  if (!form.elements.tunjangan) return;
  const salary = Number(form.dataset.payrollSalary || 0);
  const overtimeTotal = Number(form.dataset.approvedOvertime || 0);
  const allowance = Number(form.elements.tunjangan?.value || 0);
  const incentive = Number(form.elements.insentif?.value || 0);
  const deduction = Number(form.elements.potongan?.value || 0);
  const gross = salary + overtimeTotal + allowance + incentive;
  $("payroll-preview").innerHTML = `<strong>Gaji pokok</strong> ${money(salary)} &nbsp;Â·&nbsp; <strong>Lembur disetujui</strong> ${money(overtimeTotal)}<br><strong>Perkiraan gaji kotor</strong> ${money(gross)} &nbsp;Â·&nbsp; <strong>Gaji bersih</strong> ${money(gross - deduction)}<small>Gaji pokok, lembur, dan total dihitung ulang oleh PostgreSQL saat disimpan.</small>`;
}

function closeForm() {
  $("modal-backdrop").hidden = true;
  document.body.classList.remove("modal-open");
  $("record-form").reset();
  $("modal-save").hidden = false;
  state.editing = null;
}

function collectRecord(form, config) {
  const record = {};
  for (const field of config.fields) {
    let value = new FormData(form).get(field.name);
    if (field.type === "number") value = value === "" ? 0 : Number(value);
    if (field.type === "month" && value) value = monthDate(value);
    if (value === "") value = null;
    record[field.name] = value;
  }
  if (config.key === "payroll" && record.status_pembayaran === "Dibayar" && !record.tanggal_bayar) record.tanggal_bayar = today();
  if (config.key === "payroll" && record.status_pembayaran !== "Dibayar") record.tanggal_bayar = null;
  return record;
}

async function saveRecord(event) {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity() || !state.editing) return;
  const { key, id } = state.editing;
  const config = configs[key];
  const record = collectRecord(form, config);
  if (key === "absensi" && record.status_kehadiran === "Hadir" && (!record.jam_masuk || !record.jam_keluar)) {
    $("form-error").textContent = "Jam masuk dan jam keluar wajib diisi untuk status Hadir.";
    return;
  }
  const button = $("modal-save");
  button.disabled = true;
  button.querySelector("span").textContent = "Menyimpan...";
  try {
    let query = supabaseClient.from(config.table);
    query = id ? query.update(record).eq(config.id, id) : query.insert(record);
    const { error } = await query;
    if (error) throw error;
    closeForm();
    toast(`${config.singular} berhasil ${id ? "diperbarui" : "ditambahkan"}.`);
    await renderCurrent();
  } catch (error) {
    $("form-error").textContent = explainError(error);
    toast(explainError(error), "error");
  } finally {
    button.disabled = false;
    button.querySelector("span").textContent = id ? "Simpan perubahan" : "Simpan data";
  }
}

async function handleRowAction(key, event) {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  const config = configs[key];
  const row = state.rows.find((item) => String(item[config.id]) === button.dataset.id);
  if (!row) return;
  const action = button.dataset.action;
  if (action === "edit") {
    try { await openForm(key, row); } catch (error) { toast(explainError(error), "error"); }
    return;
  }
  if (action === "detail") { openRecordDetail(key, row); return; }
  if (action === "slip") { openSlip(row); return; }
  if (action === "approve" || action === "reject") {
    const status = action === "approve" ? "Disetujui" : "Ditolak";
    try {
      const { error } = await supabaseClient.from(config.table).update({ status }).eq(config.id, row[config.id]);
      if (error) throw error;
      toast(`Pengajuan lembur ${status.toLowerCase()}.`);
      await renderCurrent();
    } catch (error) { toast(explainError(error), "error"); }
    return;
  }
  if (action === "delete") {
    const warning = key === "karyawan" ? " Absensi, lembur, penilaian, dan payroll karyawan ini juga akan terhapus." : "";
    if (!window.confirm(`Apakah Anda yakin ingin menghapus ${config.singular.toLowerCase()}${key === "karyawan" ? ` ${row.nama}` : ` milik ${row.karyawan?.nama || ""}`}?${warning}`)) return;
    try {
      const { error } = await supabaseClient.from(config.table).delete().eq(config.id, row[config.id]);
      if (error) throw error;
      toast(`${config.singular} berhasil dihapus.`);
      await renderCurrent();
    } catch (error) { toast(explainError(error), "error"); }
  }
}

function openRecordDetail(key, row) {
  const config = configs[key];
  $("detail-eyebrow").textContent = "DETAIL DATA";
  $("detail-title").textContent = `${config.singular} Â· ${row.karyawan?.nama || row.nama || ""}`.trim();
  $("print-slip").hidden = true;
  const derivedFields = {
    absensi: [["keterlambatan", "Keterlambatan (menit)"]],
    lembur: [["total_jam", "Total Jam"], ["total_lembur", "Total Lembur"]],
    kinerja: [["total_skor", "Total Skor"], ["predikat", "Predikat"]],
    payroll: [["gaji_pokok", "Gaji Pokok"], ["total_lembur", "Total Lembur"], ["gaji_kotor", "Gaji Kotor"], ["gaji_bersih", "Gaji Bersih"]]
  };
  const fields = [...config.fields.map(({ name, label }) => [name, label]), ...(derivedFields[key] || [])];
  $("detail-content").innerHTML = `<div class="record-detail-grid">${fields.map(([field, label]) => `<div class="record-detail-item${field === "keterangan" || field === "catatan" ? " record-detail-wide" : ""}"><span>${esc(label)}</span><strong>${cellContent(field, row)}</strong></div>`).join("")}</div>`;
  $("detail-backdrop").hidden = false;
  icons();
}

function openSlip(row) {
  const person = row.karyawan || {};
  $("detail-eyebrow").textContent = "DOKUMEN PENGGAJIAN";
  $("detail-title").textContent = `Slip gaji Â· ${person.nama || "Karyawan"}`;
  $("print-slip").hidden = false;
  $("detail-content").innerHTML = `<article class="slip"><header class="slip-head"><span class="brand-mark"><i data-lucide="heart-pulse"></i></span><h3>HOSPITAL HUMAN RESOURCE<br>&amp; PAYROLL MANAGEMENT SYSTEM</h3><p>SLIP GAJI</p></header><div class="slip-employee"><span>Nama<strong>${esc(person.nama || "-")}</strong></span><span>NIK<strong>${esc(person.nik || "-")}</strong></span><span>Jabatan<strong>${esc(person.jabatan || "-")}</strong></span><span>Unit Kerja<strong>${esc(person.unit_kerja || "-")}</strong></span><span>Periode<strong>${esc(monthLabel(row.periode))}</strong></span></div><div class="slip-section-title">PENDAPATAN</div><div class="slip-line"><span>Gaji Pokok</span><b>${money(row.gaji_pokok)}</b></div><div class="slip-line"><span>Tunjangan</span><b>${money(row.tunjangan)}</b></div><div class="slip-line"><span>Insentif</span><b>${money(row.insentif)}</b></div><div class="slip-line"><span>Lembur Disetujui</span><b>${money(row.total_lembur)}</b></div><div class="slip-total"><span>Gaji Kotor</span><span>${money(row.gaji_kotor)}</span></div><div class="slip-section-title">POTONGAN</div><div class="slip-line"><span>Potongan</span><b>${money(row.potongan)}</b></div><div class="slip-total slip-net"><span>GAJI BERSIH</span><span>${money(row.gaji_bersih)}</span></div><div class="slip-line"><span>Status Pembayaran</span><b>${esc(row.status_pembayaran)}</b></div><div class="slip-line"><span>Tanggal Pembayaran</span><b>${esc(dateLabel(row.tanggal_bayar))}</b></div><footer>Dokumen dibuat oleh MedHR Â· Integrated Human Resource &amp; Payroll Management System</footer></article>`;
  $("detail-backdrop").hidden = false;
  icons();
}

function openQuickAdd() {
  const options = Object.values(configs).map((item) => `<button class="quick-add-option" data-add-module="${item.key}"><i data-lucide="${({ karyawan: "users-round", absensi: "calendar-check-2", lembur: "clock-4", kinerja: "award", payroll: "wallet-cards" })[item.key]}"></i>Tambah ${esc(item.singular)}</button>`).join("");
  $("modal-eyebrow").textContent = "AKSES CEPAT";
  $("modal-title").textContent = "Data apa yang ingin ditambahkan?";
  $("form-fields").innerHTML = `<div class="quick-add-grid">${options}</div>`;
  $("form-error").textContent = "";
  $("modal-save").hidden = true;
  $("record-form").dataset.module = "";
  state.editing = null;
  modalOpen();
  $("form-fields").querySelector(".quick-add-grid").addEventListener("click", (event) => {
    const button = event.target.closest("[data-add-module]");
    if (button) void openForm(button.dataset.addModule);
  });
  icons();
}

function selectMarkup(id, label, options, selected = "") {
  return `<label class="form-field"><span>${esc(label)}</span><select id="${id}">${options.map(([value, text]) => `<option value="${esc(value)}" ${value === selected ? "selected" : ""}>${esc(text)}</option>`).join("")}</select></label>`;
}

async function renderReports() {
  await loadEmployees();
  const units = [...new Set(state.employees.map((person) => person.unit_kerja))].sort();
  const report = reportTypes[state.reportType];
  const statusOptions = {
    karyawan: ["Aktif", "Nonaktif", "Tetap", "Kontrak", "Honorer"],
    absensi: statuses,
    lembur: ["Menunggu", "Disetujui", "Ditolak"],
    kinerja: ["Sangat Baik", "Baik", "Cukup", "Kurang", "Sangat Kurang"],
    payroll: ["Draft", "Diproses", "Dibayar"]
  }[state.reportType];
  $("page-content").innerHTML = `<section class="page-heading"><div><span class="eyebrow">INFORMASI AKUNTANSI &amp; SDM</span><h1>Laporan &amp; Biaya Tenaga Kerja</h1><p>Filter, cetak, dan ekspor laporan operasional berbasis database.</p></div></section><section class="panel report-panel"><div class="report-toolbar">${selectMarkup("report-type", "Jenis Laporan", Object.entries(reportTypes).map(([value, item]) => [value, item.label]), state.reportType)}${selectMarkup("report-period", "Periode", [["", "Semua Periode"], ...Array.from({ length: 12 }, (_, index) => { const value = shiftMonth(currentMonth(), -index); return [value, monthLabel(value)]; })], state.reportPeriod)}${selectMarkup("report-unit", "Unit Kerja", [["", "Semua Unit"], ...units.map((unit) => [unit, unit])], state.reportUnit)}${selectMarkup("report-employee", "Karyawan", [["", "Semua Karyawan"], ...state.employees.map((person) => [person.id_karyawan, `${person.nama} Â· ${person.nik}`])], state.reportEmployee)}${selectMarkup("report-status", "Status / Predikat", [["", "Semua Status"], ...statusOptions.map((status) => [status, status])], state.reportStatus)}<button class="button button-primary" id="report-refresh"><i data-lucide="filter"></i> Tampilkan</button></div><div class="report-actions"><button class="button button-quiet" id="report-csv"><i data-lucide="download"></i> Export CSV</button><button class="button button-quiet" id="report-print"><i data-lucide="printer"></i> Cetak laporan</button></div><div class="report-summary" id="report-summary"></div><div class="table-scroll"><table class="data-table"><thead><tr>${report.columns.map(([, label]) => `<th>${esc(label)}</th>`).join("")}</tr></thead><tbody id="report-body"><tr><td class="empty-cell" colspan="${report.columns.length}">Pilih filter lalu tampilkan laporan.</td></tr></tbody></table></div><div class="report-foot" id="report-foot"></div></section><section class="panel panel-pad labor-panel"><div class="panel-heading"><div><span class="eyebrow">RINGKASAN BIAYA TENAGA KERJA</span><h2>Komponen payroll berdasarkan bulan &amp; unit kerja</h2></div></div><div class="labor-filters">${selectMarkup("cost-period", "Bulan", Array.from({ length: 12 }, (_, index) => { const value = shiftMonth(currentMonth(), -index); return [value, monthLabel(value)]; }), state.costPeriod || currentMonth())}${selectMarkup("cost-unit", "Unit Kerja", [["", "Semua Unit"], ...units.map((unit) => [unit, unit])], state.costUnit || "")}</div><div class="cost-grid" id="cost-grid"></div></section>`;
  ["report-type", "report-period", "report-unit", "report-employee", "report-status"].forEach((id) => $(id).addEventListener("change", () => {
    const previousReportType = state.reportType;
    state.reportType = $("report-type").value;
    state.reportPeriod = $("report-period").value;
    state.reportUnit = $("report-unit").value;
    state.reportEmployee = $("report-employee").value;
    state.reportStatus = $("report-status").value;
    if (state.reportType !== previousReportType) state.reportStatus = "";
    void renderReports();
  }));
  $("report-refresh").addEventListener("click", () => void loadReport());
  $("report-csv").addEventListener("click", exportCsv);
  $("report-print").addEventListener("click", printReport);
  $("cost-period").addEventListener("change", (event) => { state.costPeriod = event.target.value; void loadLaborCosts(); });
  $("cost-unit").addEventListener("change", (event) => { state.costUnit = event.target.value; void loadLaborCosts(); });
  icons();
  await Promise.all([loadReport(), loadLaborCosts()]);
}

function filterReportRows(rows, report) {
  return rows.filter((row) => {
    if (state.reportPeriod && report.date && !String(row[report.date] || "").startsWith(state.reportPeriod)) return false;
    if (state.reportEmployee && row.id_karyawan !== state.reportEmployee) return false;
    const unit = row.unit_kerja || row.karyawan?.unit_kerja;
    if (state.reportUnit && unit !== state.reportUnit) return false;
    if (state.reportStatus) {
      const status = state.reportType === "karyawan" ? (row.status_aktif === state.reportStatus || row.status_pegawai === state.reportStatus) : state.reportType === "kinerja" ? row.predikat : row.status || row.status_kehadiran || row.status_pembayaran;
      if (status !== state.reportStatus) return false;
    }
    return true;
  });
}

async function loadReport() {
  const report = reportTypes[state.reportType];
  $("report-body").innerHTML = `<tr><td class="empty-cell" colspan="${report.columns.length}">Memuat laporan...</td></tr>`;
  try {
    let query = supabaseClient.from(report.table).select(report.select);
    if (report.date && state.reportPeriod) {
      if (["absensi", "lembur"].includes(state.reportType)) {
        query = query.gte(report.date, monthDate(state.reportPeriod)).lt(report.date, monthDate(shiftMonth(state.reportPeriod, 1)));
      } else query = query.eq(report.date, monthDate(state.reportPeriod));
    }
    const { data, error } = await query.order(report.date || "created_at", { ascending: false });
    if (error) throw error;
    state.reportRows = filterReportRows(data || [], report);
    $("report-body").innerHTML = renderRows(report, state.reportRows, false);
    $("report-foot").textContent = `${state.reportRows.length} baris Â· ${report.label}`;
    const totalPayroll = state.reportRows.reduce((sum, row) => sum + Number(row.gaji_bersih || 0), 0);
    $("report-summary").innerHTML = `<span><strong>${state.reportRows.length}</strong> data ditemukan</span>${state.reportType === "payroll" ? `<span>Total gaji bersih <strong>${money(totalPayroll)}</strong></span>` : ""}`;
    icons();
  } catch (error) {
    $("report-body").innerHTML = `<tr><td class="empty-cell" colspan="${report.columns.length}">${esc(explainError(error))}</td></tr>`;
    toast(explainError(error), "error");
  }
}

async function loadLaborCosts() {
  const costGrid = $("cost-grid");
  try {
    const period = $("cost-period").value;
    const unit = $("cost-unit").value;
    const { data, error } = await supabaseClient.from("payroll").select("gaji_pokok,total_lembur,tunjangan,insentif,potongan,gaji_bersih,karyawan(unit_kerja)").eq("periode", monthDate(period));
    if (error) throw error;
    const rows = (data || []).filter((row) => !unit || row.karyawan?.unit_kerja === unit);
    const totals = rows.reduce((sum, row) => {
      ["gaji_pokok", "total_lembur", "tunjangan", "insentif", "potongan", "gaji_bersih"].forEach((key) => { sum[key] += Number(row[key] || 0); });
      return sum;
    }, { gaji_pokok: 0, total_lembur: 0, tunjangan: 0, insentif: 0, potongan: 0, gaji_bersih: 0 });
    costGrid.innerHTML = `<p class="cost-caption">${esc(monthLabel(period))}${unit ? ` Â· ${esc(unit)}` : " Â· Semua unit"} Â· ${rows.length} payroll</p><div class="cost-cards">${[["Total Gaji Pokok", "gaji_pokok"], ["Total Tunjangan", "tunjangan"], ["Total Insentif", "insentif"], ["Total Lembur", "total_lembur"], ["Total Potongan", "potongan"], ["Total Gaji Bersih", "gaji_bersih"]].map(([label, key]) => `<article class="cost-card"><span>${label}</span><strong>${money(totals[key])}</strong></article>`).join("")}</div>`;
  } catch (error) {
    costGrid.innerHTML = `<p class="report-error">${esc(explainError(error))}</p>`;
    toast(explainError(error), "error");
  }
}

function csvValue(value) {
  const text = String(value ?? "");
  const safe = /^[=+\-@\t\r]/.test(text) ? `'${text}` : text;
  return `"${safe.replace(/"/g, '""')}"`;
}

function exportCsv() {
  const report = reportTypes[state.reportType];
  const content = [report.columns.map(([, label]) => csvValue(label)).join(","), ...state.reportRows.map((row) => report.columns.map(([field]) => {
    if (field === "id_karyawan") return csvValue(employeeName(row));
    if (field === "periode") return csvValue(monthLabel(row.periode));
    return csvValue(row[field]);
  }).join(","))].join("\r\n");
  const blob = new Blob(["\ufeff", content], { type: "text/csv;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `medhr-laporan-${state.reportType}-${state.reportPeriod || "semua-periode"}.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
  toast("Laporan berhasil diekspor ke CSV.");
}

function printReport() {
  document.body.classList.add("print-report");
  window.print();
  window.setTimeout(() => document.body.classList.remove("print-report"), 1000);
}

async function renderCurrent() {
  if (!supabaseClient) { errorPage(new Error(supabaseConfigMessage)); return; }
  try {
    if (state.view === "dashboard") await renderDashboard();
    else if (state.view === "laporan") await renderReports();
    else await renderEntity(state.view);
  } catch (error) {
    console.error("MedHR data request failed:", error);
    errorPage(error);
    toast(explainError(error), "error");
  }
}

function setView(view) {
  if (!(view in labels)) return;
  state.view = view;
  state.search = "";
  state.date = "";
  state.filters = {};
  $("page-crumb").textContent = labels[view];
  document.querySelectorAll(".nav-link").forEach((item) => item.classList.toggle("is-active", item.dataset.view === view));
  $("sidebar").classList.remove("is-open");
  $("sidebar-overlay").classList.remove("is-visible");
  $("app-shell").classList.toggle("sidebar-collapsed", state.compact);
  void renderCurrent();
}

function enterApp() {
  $("landing").hidden = true;
  $("app-shell").hidden = false;
  $("today-label").textContent = new Intl.DateTimeFormat("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(new Date());
  setView("dashboard");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function returnToLanding() {
  $("app-shell").hidden = true;
  $("landing").hidden = false;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll("[data-enter-app]").forEach((button) => button.addEventListener("click", enterApp));
document.querySelectorAll("[data-back-landing]").forEach((button) => button.addEventListener("click", returnToLanding));
document.querySelectorAll(".nav-link").forEach((button) => button.addEventListener("click", () => setView(button.dataset.view)));
document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-open-view]");
  if (button) setView(button.dataset.openView);
});
$("record-form").addEventListener("submit", (event) => void saveRecord(event));
$("modal-close").addEventListener("click", closeForm);
$("modal-cancel").addEventListener("click", closeForm);
$("modal-backdrop").addEventListener("click", (event) => { if (event.target === $("modal-backdrop")) closeForm(); });
$("detail-close").addEventListener("click", () => { $("detail-backdrop").hidden = true; });
$("detail-cancel").addEventListener("click", () => { $("detail-backdrop").hidden = true; });
$("detail-backdrop").addEventListener("click", (event) => { if (event.target === $("detail-backdrop")) $("detail-backdrop").hidden = true; });
$("print-slip").addEventListener("click", () => window.print());
$("menu-toggle").addEventListener("click", () => { $("sidebar").classList.add("is-open"); $("sidebar-overlay").classList.add("is-visible"); });
$("sidebar-overlay").addEventListener("click", () => { $("sidebar").classList.remove("is-open"); $("sidebar-overlay").classList.remove("is-visible"); });
$("collapse-toggle").addEventListener("click", () => {
  state.compact = !state.compact;
  $("app-shell").classList.toggle("sidebar-collapsed", state.compact);
  $("collapse-toggle").innerHTML = `<i data-lucide="${state.compact ? "panel-left-open" : "panel-left-close"}"></i>`;
  icons();
});
$("landing-menu").addEventListener("click", () => document.querySelector(".landing-nav").classList.toggle("is-open"));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeForm();
    $("detail-backdrop").hidden = true;
    $("sidebar").classList.remove("is-open");
    $("sidebar-overlay").classList.remove("is-visible");
  }
});
window.addEventListener("afterprint", () => document.body.classList.remove("print-report"));
icons();

})();
