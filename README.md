# Granova Recraft

Granova Recraft adalah website katalog tas serut yang dibuat dari karung kain bekas. Website ini mengenalkan cerita dan produk Granova, sekaligus memudahkan pengunjung melihat koleksi dan memesan melalui WhatsApp.

## Fitur

- Intro animasi Granova saat website dibuka.
- Bagian cerita brand dan produk pilihan.
- Katalog dengan filter kategori, detail produk, dan pilihan ukuran.
- Panduan merawat tas, testimoni, dan pertanyaan umum.
- Tautan pemesanan WhatsApp.
- Tampilan responsif untuk desktop dan perangkat seluler.

## Teknologi

- React 18
- Vite 5
- CSS

## Menjalankan di komputer lokal

Pastikan Node.js dan npm sudah terpasang, lalu buka terminal di folder proyek ini.

```bash
npm install
npm run dev
```

Buka alamat yang ditampilkan Vite, biasanya <http://localhost:5173>. Untuk menghentikan server, tekan `Ctrl+C` di terminal.

Jika PowerShell Windows memblokir perintah `npm`, gunakan `npm.cmd`:

```powershell
npm.cmd install
npm.cmd run dev
```

## Build untuk produksi

```bash
npm run build
npm run preview
```

Hasil build dibuat di folder `dist/`. Perintah preview menampilkan hasil build secara lokal.

## Struktur utama

```text
src/
  App.jsx        Halaman, konten, dan komponen utama
  App.css        Gaya utama dan responsif
  Catalog.jsx    Katalog produk
  Featured.jsx   Produk pilihan
  Footer.jsx     Footer
  Opening.jsx    Intro animasi
public/images/   Logo dan gambar produk
```
