import { useState } from "react";
import "./App.css";

/* ====== GANTI PATH GAMBAR DENGAN ASET KAMU (taruh di folder /public/images) ====== */
const IMG = {
  logo: "/images/logo-granova.png",
  heroBag: "/images/tas-hero.png",
  story: "/images/koleksi-tas.png",
};

const NAV_LEFT = [
  { label: "Home", href: "#home" },
  { label: "Tentang", href: "#tentang" },
  { label: "Produk Pilihan", href: "#produk" },
];
const NAV_RIGHT = [
  { label: "Katalog", href: "#katalog" },
  { label: "Cara Menjaga", href: "#cara-menjaga" },
  { label: "Testimoni", href: "#testimoni" },
];

const PRODUCTS = [
  { id: 1, name: "Kucing Manis", tag: "Hewan", price: "Rp 45.000", img: "/images/p1.png", color: "#F2DCC9" },
  { id: 2, name: "Save Our City", tag: "Minimalis", price: "Rp 45.000", img: "/images/p2.png", color: "#DCE8D8" },
  { id: 3, name: "Hello Summer", tag: "Ceria", price: "Rp 45.000", img: "/images/p3.png", color: "#FCE7B0" },
  { id: 4, name: "Ikan Warna-warni", tag: "Hewan", price: "Rp 45.000", img: "/images/p4.png", color: "#D6E6F2" },
  { id: 5, name: "Paus Biru", tag: "Hewan", price: "Rp 45.000", img: "/images/p5.png", color: "#D6E6F2" },
  { id: 6, name: "Kucing Calico", tag: "Ceria", price: "Rp 45.000", img: "/images/p6.png", color: "#F9D3E6" },
];
const TAGS = ["Semua", "Ceria", "Hewan", "Minimalis"];

const STATS = [
  { value: "100%", label: "bahan dari karung bekas" },
  { value: "1 karung", label: "jadi beberapa tas serut" },
  { value: "0", label: "karung berakhir jadi sampah" },
];

const STEPS = [
  { title: "Cuci lembut", text: "Cuci dengan tangan memakai sabun lembut. Hindari pemutih." },
  { title: "Jangan diperas keras", text: "Tekan perlahan agar sablon motif tetap awet." },
  { title: "Jemur di tempat teduh", text: "Balik bagian dalam tas, jemur tanpa terik langsung." },
  { title: "Setrika dari dalam", text: "Setrika suhu rendah dari sisi belakang tas." },
];

const TESTIMONIALS = [
  { name: "Nadia", role: "Mahasiswi", text: "Motifnya lucu banget, dan aku suka karena tasnya dari bahan bekas. Kuat dipakai bawa buku." },
  { name: "Rizky", role: "Pelanggan", text: "Dipakai buat kado, penerimanya senang. Jahitannya rapi dan ceritanya bagus." },
  { name: "Bu Sari", role: "Guru", text: "Cocok untuk suvenir kegiatan sekolah tentang daur ulang. Anak-anak suka." },
];

const FAQ = [
  { q: "Tasnya terbuat dari apa?", a: "Dari karung bekas beras, tepung, dan gula yang dibersihkan, dijahit, lalu disablon." },
  { q: "Apakah bisa pesan motif sendiri?", a: "Bisa. Kirim desainmu lewat WhatsApp, kami bantu cek ukuran dan hasil sablonnya." },
  { q: "Berapa lama pengerjaan?", a: "Stok siap kirim 1–2 hari. Pesanan custom sekitar 5–7 hari kerja." },
  { q: "Apakah tas tahan air?", a: "Tidak sepenuhnya tahan air. Hindari hujan deras agar bahan dan sablon awet." },
];

const WA = "https://wa.me/6280000000000?text=Halo%20Granova%2C%20aku%20mau%20pesan%20tas";

function Img({ src, alt, className, fallback = "#EADFCF" }) {
  const [err, setErr] = useState(false);
  if (err) return <div className={className} style={{ background: fallback }} aria-label={alt} role="img" />;
  return <img src={src} alt={alt} className={className} onError={() => setErr(true)} />;
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const link = (l) => (
    <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
  );
  return (
    <header className="nav-wrap">
      <nav className="nav" aria-label="Navigasi utama">
        <div className="nav-links">{NAV_LEFT.map(link)}</div>
        <a href="#home" className="nav-logo" aria-label="Granova Recraft">
          <Img src={IMG.logo} alt="Logo Granova Recraft" className="nav-logo-img" fallback="#fff" />
        </a>
        <div className="nav-links">{NAV_RIGHT.map(link)}</div>
        <button className="burger" aria-label="Buka menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          <span /><span /><span />
        </button>
      </nav>
      {open && (
        <div className="nav-mobile">
          {[...NAV_LEFT, ...NAV_RIGHT].map(link)}
        </div>
      )}
    </header>
  );
}

function ArrowButton({ href, children }) {
  return (
    <a href={href} className="btn">
      <span>{children}</span>
      <span className="btn-circle">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 17L17 7M8 7h9v9" />
        </svg>
      </span>
    </a>
  );
}

function Hero() {
  return (
    <section id="home" className="hero">
      <span className="hero-watermark" aria-hidden="true">GRANOVA</span>
      <div className="hero-left">
        <p className="script">dijahit dari karung bekas</p>
        <h1>Dari karung, jadi cerita.</h1>
      </div>
      <Img src={IMG.heroBag} alt="Tas serut Granova motif This is my happy place" className="hero-bag" fallback="#F9D3E6" />
      <div className="hero-right">
        <p>Tas serut ceria yang lahir dari karung bekas beras, tepung, dan gula. Satu tas berarti satu karung yang tidak berakhir sebagai sampah.</p>
        <ArrowButton href="#katalog">Lihat Koleksi</ArrowButton>
      </div>
    </section>
  );
}

function WaveBand() {
  return (
    <div className="wave" aria-hidden="true">
      <svg viewBox="0 0 1440 220" preserveAspectRatio="none">
        <defs>
          <path id="wavePath" d="M-200 120 C 0 40, 200 40, 360 110 S 700 190, 900 110 S 1250 40, 1640 120" />
        </defs>
        <path
          d="M0 90 C 180 10, 340 30, 480 100 S 800 180, 980 100 S 1280 10, 1440 60 L1440 170 C 1300 130, 1160 190, 980 200 S 640 250, 480 190 S 160 90, 0 150 Z"
          fill="var(--brown)"
        />
        <text className="wave-text">
          <textPath href="#wavePath" startOffset="0">
            <animate attributeName="startOffset" from="0" to="-320" dur="18s" repeatCount="indefinite" />
            {Array.from({ length: 16 }).map((_, i) => (
              <tspan key={i} dx="70">Granova</tspan>
            ))}
          </textPath>
        </text>
      </svg>
    </div>
  );
}

function Story() {
  return (
    <section id="tentang" className="story">
      <Img src={IMG.story} alt="Koleksi tas serut Granova" className="story-photo" fallback="#EADFCF" />
      <div className="story-title">
        <span>Cerita dibalik</span>
        <h2>Granova</h2>
      </div>
      <div className="story-body">
        <p>
          Granova Recraft bermula dari tumpukan karung bekas yang biasanya dibuang. Kami mencucinya,
          menjahitnya menjadi tas serut, lalu memberinya motif yang membuat siapa pun senang membawanya.
        </p>
        <p>Setiap tas punya sejarahnya sendiri: pernah berisi beras, tepung, atau gula, sekarang menemani harimu.</p>
        <ul className="stats">
          {STATS.map((s) => (
            <li key={s.label}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ProductCard({ p }) {
  return (
    <article className="card">
      <Img src={p.img} alt={`Tas ${p.name}`} className="card-img" fallback={p.color} />
      <h3>{p.name}</h3>
      <p className="card-meta">{p.tag} • {p.price}</p>
    </article>
  );
}

function Featured() {
  const [active, setActive] = useState(1);
  const [size, setSize] = useState("Sedang");
  const go = (step) => setActive((current) => (current + step + PRODUCTS.length) % PRODUCTS.length);
  const product = PRODUCTS[active];
  return (
    <section id="produk" className="featured-section">
      <div className="featured-shell">
        <div className="featured-heading">
          <div><span className="featured-kicker">Dari karung jadi kesayangan</span><h2 className="panel-title">Produk Pilihan</h2></div>
          <p>Motif ceria, dibuat ulang dengan cerita baru.</p>
        </div>
        <div className="featured-stage">
          <div className="featured-orbit" aria-hidden="true" />
          {[-2, -1, 1, 2].map((offset) => {
            const side = PRODUCTS[(active + offset + PRODUCTS.length) % PRODUCTS.length];
            return <button key={`${offset}-${side.id}`} className={`peek-card peek-${offset < 0 ? "left" : "right"} peek-${Math.abs(offset)}`} onClick={() => go(offset)} aria-label={`Lihat ${side.name}`}>
              <Img src={side.img} alt={`Tas ${side.name}`} className="peek-img" fallback={side.color} />
              <span className="peek-title">{side.name}</span><span className="peek-meta">{side.tag} · {side.price}</span>
            </button>;
          })}
          <article className="featured-product" key={product.id}>
            <div className="featured-photo-wrap"><Img src={product.img} alt={`Tas ${product.name}`} className="featured-photo" fallback={product.color} />
              <button className="carousel-arrow arrow-left" onClick={() => go(-1)} aria-label="Produk sebelumnya">‹</button>
              <button className="carousel-arrow arrow-right" onClick={() => go(1)} aria-label="Produk berikutnya">›</button>
            </div>
            <div className="featured-info"><span className="featured-tag">{product.tag} · Recrafted</span><h3>{product.name}</h3><strong className="featured-price">{product.price}</strong>
              <label className="size-select">Ukuran tas<select value={size} onChange={(event) => setSize(event.target.value)}><option>Kecil</option><option>Sedang</option><option>Besar</option></select></label>
              <a className="featured-order" href={`${WA}%20untuk%20produk%20${encodeURIComponent(product.name)}%20ukuran%20${encodeURIComponent(size)}`}>Pesan tas ini <span>↗</span></a>
            </div>
          </article>
        </div>
        <div className="featured-controls"><div className="featured-dots" aria-label={`Produk ${active + 1} dari ${PRODUCTS.length}`}>{PRODUCTS.map((p, i) => <button key={p.id} className={i === active ? "active" : ""} onClick={() => setActive(i)} aria-label={`Pilih ${p.name}`} />)}</div><span>{String(active + 1).padStart(2, "0")} <i>/</i> {String(PRODUCTS.length).padStart(2, "0")}</span></div>
      </div>
    </section>
  );
}

function Catalog() {
  const [tag, setTag] = useState("Semua");
  const list = tag === "Semua" ? PRODUCTS : PRODUCTS.filter((p) => p.tag === tag);
  return (
    <section id="katalog" className="section">
      <h2 className="section-title">Katalog</h2>
      <div className="chips" role="tablist" aria-label="Filter katalog">
        {TAGS.map((t) => (
          <button key={t} role="tab" aria-selected={tag === t} className={tag === t ? "chip on" : "chip"} onClick={() => setTag(t)}>
            {t}
          </button>
        ))}
      </div>
      <div className="grid grid-3">
        {list.map((p) => <ProductCard key={p.id} p={p} />)}
      </div>
      <div className="center"><ArrowButton href={WA}>Pesan lewat WhatsApp</ArrowButton></div>
    </section>
  );
}

function Care() {
  return (
    <section id="cara-menjaga" className="section care">
      <h2 className="section-title">Cara Menjaga</h2>
      <p className="section-sub">Rawat tasmu agar bisa menemanimu bertahun-tahun.</p>
      <ol className="steps">
        {STEPS.map((s, i) => (
          <li key={s.title}>
            <span className="step-no">{i + 1}</span>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Testimonials() {
  const [i, setI] = useState(0);
  const t = TESTIMONIALS[i];
  const go = (d) => setI((i + d + TESTIMONIALS.length) % TESTIMONIALS.length);
  return (
    <section id="testimoni" className="section testi">
      <h2 className="section-title">Testimoni</h2>
      <figure className="quote" aria-live="polite">
        <blockquote>“{t.text}”</blockquote>
        <figcaption>{t.name}, {t.role}</figcaption>
      </figure>
      <div className="testi-ctrl">
        <button onClick={() => go(-1)} aria-label="Testimoni sebelumnya">←</button>
        <span>{i + 1} / {TESTIMONIALS.length}</span>
        <button onClick={() => go(1)} aria-label="Testimoni berikutnya">→</button>
      </div>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section faq">
      <h2 className="section-title">Pertanyaan Umum</h2>
      <div className="faq-list">
        {FAQ.map((f, idx) => (
          <div key={f.q} className={open === idx ? "faq-item open" : "faq-item"}>
            <button aria-expanded={open === idx} onClick={() => setOpen(open === idx ? -1 : idx)}>
              {f.q}<span aria-hidden="true">{open === idx ? "−" : "+"}</span>
            </button>
            {open === idx && <p>{f.a}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}

function Cta() {
  return (
    <section className="cta">
      <h2>Satu karung, satu cerita baru.</h2>
      <p>Pesan tas serut Granova atau kirim desain motifmu sendiri.</p>
      <ArrowButton href={WA}>Hubungi Kami</ArrowButton>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <Img src={IMG.logo} alt="Logo Granova" className="footer-logo" fallback="#fff" />
      <nav aria-label="Footer">
        {[...NAV_LEFT, ...NAV_RIGHT].map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
      </nav>
      <small>© {new Date().getFullYear()} Granova Recraft. Dijahit dari karung bekas.</small>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WaveBand />
        <Story />
        <Featured />
        <Catalog />
        <Care />
        <Testimonials />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
