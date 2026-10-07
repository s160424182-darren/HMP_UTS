# SI MOBILE (Sistem Informasi Penjualan Mobile)

SI MOBILE adalah aplikasi berbasis Ionic-Angular yang dibuat untuk mengelola data produk, keranjang belanja, dan riwayat transaksi secara interaktif. Aplikasi ini dibuat dengan struktur navigasi Side Menu dan Tabs.

## 🚀 Cara Instalasi

Pastikan telah menginstall [Node.js](https://nodejs.org/) dan [Ionic CLI](https://ionicframework.com/docs/intro/cli) di perangkat Anda.

1. **Clone repositori** ini atau ekstrak folder proyek ke komputer Anda.
2. Buka Terminal atau Command Prompt, lalu arahkan ke dalam direktori proyek:
   ```bash
   cd SIMOBILE
4. Install Depencency yang dibutuhkan:
   ```bash
   npm install

## 🏃‍♂️ Cara Menjalankan Aplikasi

Setelah proses instalasi selesai, Anda dapat menjalankan aplikasi secara lokal di browser dengan perintah berikut:
  .```bash
    ionic serve

## ✨ Daftar Fitur yang Berhasil Diimplementasikan

Aplikasi ini mencakup seluruh fitur operasional sistem manajemen toko tanpa menggunakan database eksternal (data disimpan sementara menggunakan statik Service Array sesuai batasan materi).

1. Dashboard Interaktif
Menampilkan ringkasan data toko secara real-time.
Menghitung total produk yang terdaftar.
Menghitung total transaksi yang terjadi pada hari ini.
Menampilkan nama produk dengan penjualan terbanyak (Best Seller).
2. Manajemen Produk (CRUD)
Katalog Produk: Menampilkan daftar seluruh produk dengan gambar thumbnail, nama, kategori, harga, dan sisa stok.
Detail Produk: Menampilkan informasi spesifik produk yang diklik.
Tambah Produk: Form input dengan validasi ketat (nama tidak boleh kosong, stok tidak boleh negatif) untuk menambahkan produk baru ke dalam katalog.
Edit Produk: Memungkinkan pengguna untuk memperbarui data produk yang sudah ada (harga, stok, nama) dan menyimpannya kembali ke sistem.
3. Sistem Keranjang Belanja (Cart)
Memasukkan produk dari katalog ke dalam keranjang belanja.
Tombol aksi untuk langsung menghapus barang dari keranjang belanja.
Kalkulasi total harga belanjaan secara otomatis.
Menampilkan alert peringatan apabila stok produk tidak mencukupi permintaan.
4. Checkout & Transaksi
Tombol Konfirmasi Transaksi yang secara otomatis:
Mengurangi stok asli dari produk yang dibeli.
Menyimpan data transaksi ke dalam riwayat.
Mengosongkan keranjang belanja.
Menampilkan Alert Box bahwa transaksi berhasil.
5. Riwayat Transaksi (History)
Menampilkan seluruh daftar riwayat transaksi yang pernah dilakukan.
Dilengkapi dengan tanggal transaksi, total pembayaran, dan rincian kuantitas produk yang dibeli.
Data diperbarui secara otomatis ketika transaksi baru berhasil dicheckout.
6. Fitur Tambahan (Settings & Profile)
Pengaturan Dark Mode: Toggle manual untuk mengubah tema warna aplikasi menjadi mode gelap atau terang sesuai keinginan pengguna secara langsung tanpa bergantung pada OS.
Profil Pengguna: Menampilkan data statis profil pengguna.
Halaman Tentang: Menampilkan informasi mengenai aplikasi ini.
7. Navigasi Lanjutan
Side Menu (Hamburger Menu): Akses cepat ke halaman Tentang, Profil, dan Pengaturan.
Bottom Tabs: Navigasi bawah untuk perpindahan instan antara Dashboard, Produk, Transaksi, dan Profil.
