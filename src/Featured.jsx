import { useState, useEffect, useRef } from "react";
import "./Jemuran.css";
import { mulaiDari } from "./Sizes.js";

/* Foto dengan warna cadangan kalau gambar gagal dimuat */
function Photo({ src, alt, color }) {
  const [err, setErr] = useState(false);
  if (err) return <div className="jm-photo" style={{ background: color }} role="img" aria-label={alt} />;
  return <img src={src} alt={alt} className="jm-photo" onError={() => setErr(true)} />;
}

const FAVORIT = [
  { id: 1, label: "Paling dicari" },
  { id: 3, label: "Favorit pelanggan" },
  { id: 2, label: "Paling ramah bumi" },
];

export default function Featured({ products, wa }) {
  const stage = useRef(null);
  const [swing, setSwing] = useState(false);

  // ayunan satu kali saat section pertama kali terlihat
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setSwing(true); io.disconnect(); }
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const items = FAVORIT.map((f) => ({ ...products.find((p) => p.id === f.id), label: f.label }));

  return (
    <section id="produk" className="jm-section" aria-labelledby="jm-title">
      <div className="jm-head">
        <h2 id="jm-title">Produk Pilihan</h2>
        <p className="jm-sub">tiga favorit yang paling sering dibawa pulang</p>
      </div>

      <div className="jm-line" ref={stage}>
        <div className="jm-rope" aria-hidden="true" />
        <div className="jm-items">
          {/* tali melengkung: titik tengah paling turun, jepitan menempel mengikuti lengkungnya */}
          <div className="jm-rope" aria-hidden="true">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 0 Q50 200 100 0" className="jm-rope-base" />
              <path d="M0 0 Q50 200 100 0" className="jm-rope-twist" />
            </svg>
          </div>
          {items.map((p, i) => (
            <article key={p.id} className={`jm-item${i === 1 ? " jm-mid" : ""}${swing ? " jm-swing" : ""}`} style={{ "--d": `${i * 0.18}s` }}>
              <div className="jm-swinger">
              <span className="jm-pin" aria-hidden="true" />
              <div className="jm-print">
                <Photo src={p.img} alt={`Tas ${p.name}`} color={p.color} />
                <div className="jm-caption">
                  <p className="jm-label">{p.label}</p>
                  <h3>{p.name}</h3>
                  <div className="jm-foot">
                    <span className="jm-price">Mulai {mulaiDari()}</span>
                    <a className="jm-btn" href={`${wa}%20${encodeURIComponent(p.name)}`}>Pesan</a>
                  </div>
                </div>
              </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="jm-more">
        <p>masih banyak desain lain, lho</p>
        <a href="#katalog" className="jm-cta">
          <span>Lihat Katalog</span>
          <span className="jm-cta-circle" aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
