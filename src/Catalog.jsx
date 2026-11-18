import { useState } from "react";
import "./katalog.css";

/* Foto dengan warna cadangan kalau gambar gagal dimuat */
function Photo({ src, alt, color }) {
  const [err, setErr] = useState(false);
  if (err) return <div className="jk-photo" style={{ background: color }} role="img" aria-label={alt} />;
  return <img src={src} alt={alt} className="jk-photo" loading="lazy" onError={() => setErr(true)} />;
}

export default function Catalog({ products, tags, wa }) {
  const [tag, setTag] = useState("Semua");
  const list = tag === "Semua" ? products : products.filter((p) => p.tag === tag);
  const count = (t) => (t === "Semua" ? products.length : products.filter((p) => p.tag === t).length);
  const base = wa.split("?")[0];
  const custom = `${base}?text=${encodeURIComponent("Halo Granova, aku mau pesan tas dengan desain sendiri")}`;

  return (
    <section id="katalog" className="jk-section" aria-labelledby="jk-title">
      <div className="jk-head">
        <h2 id="jk-title">Katalog</h2>
        <p className="jk-sub">pilih motif yang paling kamu banget</p>
      </div>

      <div className="jk-filter" role="group" aria-label="Filter katalog">
        {tags.map((t) => (
          <button key={t} type="button" aria-pressed={tag === t} className={tag === t ? "jk-chip on" : "jk-chip"} onClick={() => setTag(t)}>
            {t} <span>{count(t)}</span>
          </button>
        ))}
      </div>
      <p className="jk-count" aria-live="polite">{list.length} desain</p>

      <div className="jk-grid" key={tag}>
        {list.map((p, i) => (
          <article key={p.id} className="jk-card" style={{ "--i": i }}>
            <div className="jk-frame" style={{ background: p.color }}>
              <Photo src={p.img} alt={`Tas ${p.name}`} color={p.color} />
              <span className="jk-stamp">{p.tag}</span>
              <a className="jk-go" href={`${wa}%20${encodeURIComponent(p.name)}`} aria-label={`Pesan ${p.name} lewat WhatsApp`}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M7 17L17 7M8 7h9v9" />
                </svg>
              </a>
            </div>
            <h3>{p.name}</h3>
            <p className="jk-price">{p.price}</p>
          </article>
        ))}

        <a className="jk-custom" href={custom}>
          <span className="jk-hole" aria-hidden="true" />
          <span className="jk-custom-text">
            <strong>Punya desain sendiri?</strong>
            <span>Kirim motifmu lewat WhatsApp, kami bantu cek ukuran dan hasil sablonnya.</span>
          </span>
          <span className="jk-go jk-go-static" aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}