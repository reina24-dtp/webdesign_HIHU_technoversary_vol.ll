import { useEffect, useRef, useState } from "react";
import "./katalog.css";
import { SIZES, rupiah, mulaiDari } from "./Sizes.js";

/* Foto dengan warna cadangan kalau gambar gagal dimuat */
function Photo({ src, alt, color }) {
  const [err, setErr] = useState(false);
  if (err) return <span className="jk-photo" style={{ background: color }} role="img" aria-label={alt} />;
  return <img src={src} alt={alt} className="jk-photo" loading="lazy" onError={() => setErr(true)} />;
}

export default function Catalog({ products, tags, wa }) {
  const [tag, setTag] = useState("Semua");
  const [sel, setSel] = useState(null);      // produk yang sedang dibuka di jendela detail
  const [size, setSize] = useState(SIZES[0].label);
  const dlg = useRef(null);

  const list = tag === "Semua" ? products : products.filter((p) => p.tag === tag);
  const count = (t) => (t === "Semua" ? products.length : products.filter((p) => p.tag === t).length);
  const custom = `${wa.split("?")[0]}?text=${encodeURIComponent("Halo Granova, aku mau pesan tas dengan desain sendiri")}`;

  // buka/tutup <dialog> bawaan browser (Esc, fokus, backdrop sudah ditangani browser)
  useEffect(() => {
    const d = dlg.current;
    if (!d) return;
    if (sel && !d.open) d.showModal();
    if (!sel && d.open) d.close();
    document.body.style.overflow = sel ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [sel]);

  const open = (p) => { setSize(SIZES[0].label); setSel(p); };

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
            <button type="button" className="jk-frame" style={{ "--bg": p.color }} onClick={() => open(p)} aria-label={`Lihat detail ${p.name}`}>
              <Photo src={p.img} alt={`Tas ${p.name}`} color={p.color} />
              <span className="jk-stamp">{p.tag}</span>
              <span className="jk-price">Mulai {mulaiDari()}</span>
              <span className="jk-plus" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
              </span>
            </button>
            <h3>{p.name}</h3>
          </article>
        ))}

        <a className="jk-custom" href={custom}>
          <span className="jk-hole" aria-hidden="true" />
          <span className="jk-custom-text">
            <strong>Punya desain sendiri?</strong>
            <span>Kirim motifmu lewat WhatsApp, kami bantu cek ukuran dan hasil sablonnya.</span>
          </span>
          <span className="jk-go" aria-hidden="true">↗</span>
        </a>
      </div>

      {/* Jendela detail */}
      <dialog ref={dlg} className="jk-modal" onClose={() => setSel(null)} onClick={(e) => { if (e.target === e.currentTarget) setSel(null); }} aria-labelledby="jk-modal-title">
        {sel && (
          <div className="jk-modal-body">
            <button type="button" className="jk-close" onClick={() => setSel(null)} aria-label="Tutup">×</button>
            <div className="jk-modal-photo" style={{ "--bg": sel.color }}>
              <Photo src={sel.img} alt={`Tas ${sel.name}`} color={sel.color} />
            </div>
            <div className="jk-modal-info">
              <span className="jk-stamp jk-stamp-inline">{sel.tag}</span>
              <h3 id="jk-modal-title">{sel.name}</h3>
              <p className="jk-modal-price">{rupiah(SIZES.find((s) => s.label === size).price)}</p>
              <p className="jk-modal-label">Ukuran tas</p>
              <div className="jk-sizes" role="group" aria-label="Pilih ukuran">
                {SIZES.map((s) => (
                  <button key={s.label} type="button" aria-pressed={size === s.label} className={size === s.label ? "jk-size on" : "jk-size"} onClick={() => setSize(s.label)}>
                    {s.label}<small>{rupiah(s.price)}</small>
                  </button>
                ))}
              </div>
              <a className="jk-order" href={`${wa}%20untuk%20produk%20${encodeURIComponent(sel.name)}%20ukuran%20${encodeURIComponent(size)}`}>
                <span>Pesan lewat WhatsApp</span>
                <span className="jk-go" aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
