# MedHR — Hospital Human Resource & Payroll Management System

MedHR adalah aplikasi web Sistem Informasi Akuntansi untuk mengintegrasikan data karyawan rumah sakit, absensi, lembur, penilaian kinerja, payroll, slip gaji, dan laporan biaya tenaga kerja. Aplikasi memakai HTML, CSS, dan JavaScript tanpa framework, dengan Supabase PostgreSQL sebagai database.

> **Penting — konfigurasi demo akademik:** SQL mengaktifkan kebijakan RLS yang mengizinkan peran `anon` membaca dan mengubah seluruh data karyawan, absensi, penilaian, dan payroll. Hal ini diperlukan karena aplikasi tidak memakai halaman login. Gunakan hanya untuk tugas/demo dengan data fiktif di project Supabase terpisah. Jangan gunakan kebijakan tersebut untuk data rumah sakit sungguhan atau deploy publik.

## Teknologi dan struktur folder

```text
SISTEM_PAYROLL_HOSPITAL/
├── backend/
│   ├── app.js
│   └── supabase/
│       └── schema.sql
├── frontend/
│   ├── config.js
│   ├── app.bundle.js
│   ├── build.py
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   └── js/
│       ├── app.js
│       ├── karyawan.js
│       ├── absensi.js
│       ├── lembur.js
│       ├── kinerja.js
│       └── payroll.js
└── README.md
```

- Frontend: HTML5, CSS3 responsif, JavaScript ES modules, Supabase JS v2 CDN, Lucide icons.
- Database: Supabase PostgreSQL; skema inti terdiri dari **tepat lima tabel**.
- `backend/app.js`: server file statis Node.js opsional untuk menjalankan frontend lokal, tanpa dependencies atau `package.json`.

## ERD — lima entitas

```text
KARYAWAN (1) ──< ABSENSI
KARYAWAN (1) ──< LEMBUR
KARYAWAN (1) ──< PENILAIAN_KINERJA
KARYAWAN (1) ──< PAYROLL
```

Setiap tabel anak memiliki `id_karyawan` sebagai foreign key dengan `ON DELETE CASCADE`. Constraint membatasi NIK unik, satu absensi per karyawan per tanggal, serta satu penilaian dan payroll per karyawan per bulan. Perhitungan keterlambatan, jam/nominal lembur, skor/predikat kinerja, gaji pokok, lembur disetujui, gaji kotor, dan gaji bersih dilakukan atau divalidasi di PostgreSQL.

## Menyiapkan Supabase

1. Buat project Supabase khusus demo kuliah.
2. Buka **SQL Editor → New query**, salin seluruh isi `backend/supabase/schema.sql`, lalu jalankan. Skrip membuat lima tabel, constraint, index, function/trigger, RLS, policy demo, grant, dan data demo yang saling terhubung.
3. Buka **Project Settings → API** (atau **Data API / Connect**, bergantung versi dashboard) untuk mendapatkan **Project URL** dan **anon / publishable key**. Jangan pernah memakai `service_role` / secret key di browser.
4. Konfigurasi project ini sudah diisi di `frontend/config.js`. Jika memakai project Supabase lain, ganti dua string konfigurasi di bagian paling atas:

   ```js
   const supabaseUrl = "https://PROJECT-REF.supabase.co";
   const supabaseAnonKey = "sb_publishable_..."; // atau anon public key project
   ```

5. Simpan file. Setelah menjalankan SQL dan mengisi konfigurasi, halaman dapat membuat, membaca, memperbarui, menghapus, dan memfilter data langsung ke Supabase.

URL dan anon/publishable key digunakan di browser dan bukan pengganti kebijakan RLS; kebijakan anon yang sengaja terbuka hanya layak digunakan dengan data demo. Tidak ada `.env`, `env.example`, atau `package.json`.

### Mengulang skrip schema

Skrip dapat dijalankan ulang untuk menambahkan fungsi, trigger, policy, dan demo yang belum ada. Tabel dan catatan demo yang sudah ada tidak dihapus; seed menggunakan konflik unik untuk mempertahankan data lama. Untuk reset project demo sepenuhnya, hapus project/database demo melalui dashboard Supabase dan buat project demo baru sebelum menjalankan skrip kembali.

## Menjalankan aplikasi

**Pilihan 1 — buka langsung:** klik dua kali `frontend/index.html`. Script aplikasi sudah dibundel agar halaman juga berjalan tanpa JavaScript modules, yang diblokir browser pada alamat `file://`. Koneksi Supabase tetap memerlukan internet.

**Pilihan 2 — VS Code Live Server (direkomendasikan untuk pengembangan):**

1. Buka `frontend/index.html` di VS Code.
2. Klik **Go Live** dari ekstensi Live Server.
3. Buka URL lokal yang ditampilkan.

**Pilihan 3 — server lokal bawaan (Node.js):**

```powershell
node backend/app.js
```

Buka `http://localhost:8080`. Untuk port lain di PowerShell:

```powershell
$env:PORT=8001; node backend/app.js
```

Ketika aplikasi dibuka, pengguna langsung melihat landing page. Tombol **Masuk ke Sistem** dan **Mulai Kelola Data** membuka workspace tanpa login. Jika mengubah file di `frontend/config.js` atau `frontend/js/`, buat ulang bundle sebelum membuka aplikasi atau push: `py frontend/build.py` (Windows) atau `python3 frontend/build.py` (macOS/Linux).

## Fitur aplikasi

- Dashboard memuat jumlah karyawan aktif, absensi hadir hari ini, lembur menunggu, total payroll bulan berjalan, dan rata-rata skor kinerja langsung dari tabel Supabase.
- Grafik ringkasan absensi, tren payroll enam periode, karyawan per unit/status, dan distribusi predikat dibangun dari data database.
- CRUD karyawan, absensi, lembur, penilaian kinerja, dan payroll memakai Supabase; form modal, pencarian, filter, konfirmasi hapus, toast, dan refresh data.
- Absensi hanya satu catatan per karyawan per tanggal; PostgreSQL otomatis menghitung keterlambatan dari jam masuk setelah pukul 08.00.
- Pengajuan lembur dapat disetujui/ditolak; total durasi dan nominal dihitung PostgreSQL, dan payroll bulan terkait disinkronkan ketika lembur disetujui/diubah.
- Skor penilaian (0–100), total skor, dan predikat dihitung PostgreSQL.
- Payroll memperoleh gaji pokok karyawan dan total lembur disetujui dari database. Tunjangan, insentif, dan potongan dapat diisi pada form; total gaji dihitung otomatis.
- Slip gaji menampilkan identitas, pendapatan, potongan, status, dan tanggal bayar; tombol cetak memakai `window.print()`.
- Laporan karyawan, absensi, lembur, kinerja, payroll menyediakan filter periode, unit, karyawan, status/predikat, cetak, dan ekspor CSV.
- Ringkasan biaya tenaga kerja menampilkan gaji pokok, tunjangan, insentif, lembur, potongan, serta gaji bersih berdasarkan bulan dan unit kerja.
- Sidebar dapat diciutkan di layar besar dan menjadi menu drawer di ponsel; tabel dapat digulir horizontal.

## Deploy ke GitHub Pages

1. Isi `frontend/config.js` dengan Project URL dan anon/publishable key demo yang sudah diatur (RLS anon terbuka berarti key dan semua data demo bisa diakses publik).
2. Push repository ke GitHub dan buka **Settings → Pages**.
3. Pilih **GitHub Actions** sebagai deployment source. Workflow `.github/workflows/pages.yml` akan membangun Pages saat push ke branch `main`.
4. Workflow membangun ulang bundle aplikasi dari kode sumber secara otomatis sebelum deploy. Project URL dan anon/publishable key diambil dari `frontend/config.js`; jangan masukkan service-role key.
5. Setelah workflow selesai, buka URL Pages. Pastikan URL project Supabase dapat diakses dan SQL schema sudah dijalankan.

> Berbeda dengan aplikasi login, anon key memang terlihat di browser. Perlindungan data pada versi demo ini tidak disediakan oleh secret key, sehingga jangan gunakan data personal maupun payroll asli.

## Troubleshooting

- **Dashboard menampilkan “Hubungkan Supabase”:** cek Project URL dan anon/publishable key di `frontend/config.js`, pastikan library CDN dapat dimuat, lalu refresh.
- **Tabel tidak ditemukan:** jalankan seluruh `backend/supabase/schema.sql` pada SQL Editor Supabase; pastikan nama tabel tepat.
- **RLS / permission denied:** cek apakah seluruh policy demo dan grant anon pada akhir file schema berhasil dijalankan. Ingat, kebijakan demo tersebut membuka CRUD anon.
- **NIK, absensi, kinerja, atau payroll duplikat:** setiap pelanggaran constraint unik dilaporkan sebagai notifikasi; perbaiki record lama atau gunakan tanggal/periode/karyawan yang berbeda.
- **Payroll duplikat:** satu karyawan hanya memiliki satu record per bulan. Edit record bulan tersebut alih-alih membuat duplikat.
- **Halaman langsung dibuka tetapi bundle belum mengikuti perubahan kode:** jalankan `py frontend/build.py` (Windows) atau `python3 frontend/build.py` (macOS/Linux).
- **GitHub Pages tidak menampilkan data:** pastikan workflow Pages selesai sukses, `frontend/config.js` berisi kredensial project yang benar, project Supabase aktif, dan skema/policy anon sudah diterapkan.
- **Periksa error runtime:** buka Developer Tools → Console dan Network untuk melihat error query Supabase atau library eksternal.
