import { useEffect, useRef, useState } from "react";
import "./App.css";
import Featured from "./Featured.jsx";
import Catalog from "./Catalog.jsx"; 
import Footer from "./Footer.jsx";           
import Opening from "./Opening.jsx";

/* ====== GANTI PATH GAMBAR DENGAN ASET KAMU (taruh di folder /public/images) ====== */
const IMG = {
  logo: "/images/granova.png",
  heroBag: "/images/hero-asset.png",
  story: "/images/about.png",
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
  { name: "Kak Ryujin", role: "Mahasiswi", image: "/images/Kak%20Ryujin.jpg", text: "Motifnya lucu banget, dan aku suka karena tasnya dari bahan bekas. Kuat dipakai bawa buku." },
  { name: "Nadia", role: "Mahasiswi", image: "/images/nadia.jpeg", text: "Motifnya lucu banget, dan aku suka karena tasnya dari bahan bekas. Kuat dipakai bawa buku." },
  { name: "Kak Jojo", role: "Pelanggan", image: "/images/kak%20jojo.jpg", text: "Dipakai buat kado, penerimanya senang. Jahitannya rapi dan ceritanya bagus." },
  { name: "Bu Sari", role: "Guru", image: "/images/bu%20sari.jpeg", text: "Cocok untuk suvenir kegiatan sekolah tentang daur ulang. Anak-anak suka." },
];

const FAQ = [
  { q: "Tasnya terbuat dari apa?", a: "Tas Granova dibuat dari karung kain bekas yang dibersihkan, lalu dijahit kembali menjadi tas serut." },
  { q: "Apakah bisa pesan motif sendiri?", a: "Bisa. Kirim desainmu lewat WhatsApp, kami bantu cek ukuran dan hasil sablonnya." },
  { q: "Berapa lama pengerjaan?", a: "Stok siap kirim 1–2 hari. Pesanan custom sekitar 5–7 hari kerja." },
  { q: "Apakah tas tahan air?", a: "Tidak sepenuhnya tahan air. Hindari hujan deras agar bahan dan sablon awet." },
];

const WA = "https://wa.me/628197659045?text=Halo%20Granova%2C%20aku%20mau%20pesan%20tas";

function Img({ src, alt, className, fallback = "#EADFCF" }) {
  const [err, setErr] = useState(false);
  if (err) return <div className={className} style={{ background: fallback }} aria-label={alt} role="img" />;
  return <img src={src} alt={alt} className={className} onError={() => setErr(true)} />;
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const previousScrollY = useRef(0);
  const [scrolled, setScrolled] = useState(() => window.scrollY > 40);
  useEffect(() => {
    previousScrollY.current = window.scrollY;
    const updateScrollState = () => {
      const currentScrollY = window.scrollY;
      const difference = currentScrollY - previousScrollY.current;
      if (currentScrollY <= 40) setScrolled(false);
      else if (difference > 2) setScrolled(true);
      else if (difference < -2) setScrolled(false);
      previousScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);
  const link = (l) => (
    <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
  );
  return (
    <header className={`nav-wrap${scrolled ? " is-scrolled" : ""}`}>
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
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [typedLength, setTypedLength] = useState(prefersReducedMotion ? 7 : 0);
  useEffect(() => {
    if (prefersReducedMotion) return;
    let length = 0;
    let deleting = false;
    let timeoutId;
    const tick = () => {
      if (deleting) {
        length -= 1;
        setTypedLength(length);
        if (length === 0) {
          deleting = false;
          timeoutId = window.setTimeout(tick, 450);
        } else {
          timeoutId = window.setTimeout(tick, 110);
        }
        return;
      }
      length += 1;
      setTypedLength(length);
      if (length === 7) {
        deleting = true;
        timeoutId = window.setTimeout(tick, 900);
      } else {
        timeoutId = window.setTimeout(tick, 180);
      }
    };
    timeoutId = window.setTimeout(tick, 250);
    return () => window.clearTimeout(timeoutId);
  }, [prefersReducedMotion]);
  return (
    <section id="home" className="hero">
      <span className="hero-watermark" aria-hidden="true">{"GRANOVA".slice(0, typedLength)}</span>
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
          <path id="waveTextPath" d="M-320 120 C-240 90,-80 90,0 120 S160 150,320 120 S480 90,640 120 S800 150,960 120 S1120 90,1280 120 S1440 150,1600 120 S1760 90,1920 120" />
        </defs>
        <path
          d="M-320 78 C-240 48,-80 48,0 78 S160 108,320 78 S480 48,640 78 S800 108,960 78 S1120 48,1280 78 S1440 108,1600 78 S1760 48,1920 78 L1920 142 C1760 112,1760 112,1600 142 C1440 172,1440 172,1280 142 C1120 112,1120 112,960 142 C800 172,800 172,640 142 C480 112,480 112,320 142 C160 172,160 172,0 142 C-80 112,-240 112,-320 142 Z"
          fill="var(--brown)"
        />
        <text className="wave-text">
          <textPath href="#waveTextPath" startOffset="0">
            <animate attributeName="startOffset" from="0" to="-132" dur="8s" repeatCount="indefinite" />
            {Array.from({ length: 24 }).map((_, i) => (
              <tspan key={i} dx="52" textLength="80" lengthAdjust="spacingAndGlyphs">Granova</tspan>
            ))}
          </textPath>
        </text>
      </svg>
    </div>
  );
}

function Story() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, { threshold: 0.15 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);
  return (
    <section id="tentang" ref={sectionRef} className={`story${isVisible ? " is-visible" : ""}`}>
      <div className="story-title">
        <span>Cerita dibalik</span>
        <h2>Granova</h2>
      </div>
      <div className="story-gallery" aria-label="Tiga pilihan tas Granova">
        <div className="story-wave" aria-hidden="true">
          <svg viewBox="0 0 1000 400" preserveAspectRatio="none">
            <defs>
              <linearGradient id="storyWaveFill" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#f6b7d8" />
                <stop offset="100%" stopColor="#e987b6" />
              </linearGradient>
            </defs>
            <path d="M0 82 C105 25 165 111 275 72 C382 34 444 50 535 79 C642 113 700 29 808 57 C890 78 941 38 1000 62 L1000 316 C907 350 850 286 758 324 C651 368 590 302 500 330 C404 360 340 302 250 331 C157 360 76 303 0 326 Z" fill="url(#storyWaveFill)" />
          </svg>
        </div>
        <Img src="/images/p2.png" alt="Tas Granova motif Hello Summer" className="story-side story-side-left" />
        <Img src={IMG.heroBag} alt="Tas Granova motif This Is My Happy Place" className="story-photo" />
        <Img src="/images/p3.png" alt="Tas Granova motif Save Our City" className="story-side story-side-right" />
      </div>
      <div className="story-body">
        <div className="story-copy">
          <span className="story-kicker">Cerita dan filosofi Granova</span>
          <h3>Lebih dari Sekadar Tas</h3>
          <p>
            Granova Recraft bermula dari tumpukan karung bekas yang biasanya dibuang. Kami mencucinya,
            menjahitnya menjadi tas serut, lalu memberinya motif yang membuat siapa pun senang membawanya.
          </p>
          <p>Setiap tas punya sejarahnya sendiri: pernah berisi beras, tepung, atau gula, sekarang menemani harimu.</p>
        </div>
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

function Care() {
  return (
    <section id="cara-menjaga" className="section care">
      <div className="care-banner">
        <div className="care-photo-wrap">
          <Img src="/images/Hijabi%20Woman%20with%20Whale%20Drawstring%20Bag.png" alt="Perempuan berhijab membawa tas serut Granova motif paus" className="care-photo" />
          <span className="care-spark care-spark-one" aria-hidden="true">✳</span>
          <span className="care-spark care-spark-two" aria-hidden="true">✦</span>
        </div>
        <div className="care-intro">
          <span className="care-kicker">Granova care guide · 4 langkah mudah</span>
          <h2>Cara Menjaga</h2>
          <p>Rawat tasmu dengan lembut agar motif tetap cerah dan bisa menemanimu lebih lama.</p>
          <span className="care-note"><i /> Kebiasaan kecil, umur tas lebih panjang</span>
        </div>
      </div>
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
  const renderCards = (duplicate = false) => TESTIMONIALS.map((t) => (
    <article className="testi-card" key={`${duplicate ? "copy-" : ""}${t.name}`} aria-hidden={duplicate || undefined}>
      <p className="testi-card-quote">“{t.text}”</p>
      <div className="testi-card-meta">
        {t.image ? <img className="testi-avatar-photo" src={t.image} alt={`Foto ${t.name}`} /> : <span className="testi-avatar" aria-hidden="true">{t.name.charAt(0)}</span>}
        <span className="testi-person"><strong>{t.name}</strong><small>{t.role}</small></span>
        <span className="testi-stars" aria-label="5 dari 5 bintang">★★★★★</span>
      </div>
    </article>
  ));
  return (
    <section id="testimoni" className="section testi testimonials-conveyor">
      <div className="testi-head">
        <span>ULASAN PELANGGAN</span>
        <h2>Apa Kata Mereka</h2>
        <p><strong aria-label="5 bintang">★★★★★</strong> Dari pelanggan Granova</p>
      </div>
      <div className="testi-window">
        <div className="testi-track">
          <div className="testi-group">{renderCards()}</div>
          <div className="testi-group" aria-hidden="true">{renderCards(true)}</div>
        </div>
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

function OrderNow() {
  const repeat = (keyPrefix) => Array.from({ length: 12 }, (_, i) => (
    <span className="order-word" key={`${keyPrefix}-${i}`}>ORDER NOW <i aria-hidden="true">✦</i> GRANOVA</span>
  ));
  return (
    <section className="order-now" aria-label="Pesan tas Granova">
      <a className="order-now-link" href={WA} aria-label="Order now, pesan tas Granova">
        <div className="order-ribbon" aria-hidden="true">
          <div className="order-track">
            <div className="order-group">{repeat("first")}</div>
            <div className="order-group">{repeat("second")}</div>
          </div>
        </div>
        <Img src="/images/Hijabi%20Woman%20with%20Cat-Print%20Drawstring%20Bag.png" alt="" className="order-photo" />
      </a>
    </section>
  );
}


export default function App() {
  const [showOpening, setShowOpening] = useState(true);
  return (
    <>
      {showOpening && <Opening onComplete={() => setShowOpening(false)} />}
      <Navbar />
      <main>
        <Hero />
        <WaveBand />
        <Story />
        <Featured products={PRODUCTS} wa={WA} />
        <Catalog products={PRODUCTS} tags={TAGS} wa={WA} />
        <Care />
        <Testimonials />
        <Faq />
        <OrderNow />
      </main>
      <Footer logo={IMG.logo} links={[...NAV_LEFT, ...NAV_RIGHT]} wa={WA} />
    </>
  );
}
