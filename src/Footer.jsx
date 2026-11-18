import "./footer.css";

/* Ganti dengan akun asli kamu (sekarang masih contoh) */
const INSTAGRAM = "granova.recraft";
const EMAIL = "halo@granova.id";

const IconWA = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3.5 20.5l1.3-4.4A8.5 8.5 0 1 1 8 19.3l-4.5 1.2z" />
    <path d="M9 8.8c.3 2.6 2.6 5 5.3 5.6l1.3-1.2-1.8-1-.8.7a4 4 0 0 1-2-2l.7-.8-1-1.8L9 8.8z" />
  </svg>
);
const IconIG = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r=".6" fill="currentColor" />
  </svg>
);
const IconMail = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3.5" y="5.5" width="17" height="13" rx="3" />
    <path d="M4.5 7.5l7.5 5.5 7.5-5.5" />
  </svg>
);

export default function Footer({ logo, links, wa }) {
  return (
    <footer className="ft">
      <div className="ft-stitch" aria-hidden="true" />

      <div className="ft-inner">
        <img src={logo} alt="Logo Granova" className="ft-logo" onError={(e) => (e.currentTarget.style.display = "none")} />
        <p className="ft-tagline">dari karung, jadi cerita.</p>

        <nav aria-label="Footer">
          <ul className="ft-links">
            {links.map((l) => (
              <li key={l.href}><a href={l.href}>{l.label}</a></li>
            ))}
          </ul>
        </nav>

        <ul className="ft-social">
          <li><a className="ft-icon ft-icon-main" href={wa} aria-label="WhatsApp" title="WhatsApp"><IconWA /></a></li>
          <li><a className="ft-icon" href={`https://instagram.com/${INSTAGRAM}`} target="_blank" rel="noopener" aria-label={`Instagram @${INSTAGRAM}`} title={`@${INSTAGRAM}`}><IconIG /></a></li>
          <li><a className="ft-icon" href={`mailto:${EMAIL}`} aria-label={`Email ${EMAIL}`} title={EMAIL}><IconMail /></a></li>
        </ul>
      </div>

      <small className="ft-copy">© {new Date().getFullYear()} Granova Recraft. Dijahit dari karung bekas.</small>
    </footer>
  );
}