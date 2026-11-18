/* Daftar ukuran & harga. Ubah di sini, katalog dan produk pilihan ikut berubah. */
export const SIZES = [
  { label: "Kecil", price: 25000 },
  { label: "Besar", price: 35000 },
];

export const rupiah = (n) => "Rp " + n.toLocaleString("id-ID");
export const mulaiDari = () => rupiah(Math.min(...SIZES.map((s) => s.price)));