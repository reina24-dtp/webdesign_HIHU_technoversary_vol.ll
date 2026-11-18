import "./Footer.css";

export default function Footer({ logo, links = [], wa }) {
  const primaryLinks = links.slice(0, 3);
  const exploreLinks = links.slice(3);
  return (
    <footer className="ft">
      <div className="ft-grid">
        <div className="ft-brand-block">
          <a className="ft-brand" href="#home">
            <img src={logo?.replace(/^public\//, "/")} alt="" className="ft-logo" onError={(event) => { event.currentTarget.style.display = "none"; }} />
            <span>Granova Recraft</span>
          </a>
          <p className="ft-tagline">dari karung, jadi cerita.</p>
          <small className="ft-copy">© {new Date().getFullYear()} Granova Recraft.</small>
        </div>

        <nav className="ft-column" aria-label="Navigasi footer">
          <h2>Navigasi</h2>
          <ul>{primaryLinks.map((link) => <li key={link.href}><a href={link.href}>{link.label}</a></li>)}</ul>
        </nav>

        <nav className="ft-column" aria-label="Jelajahi footer">
          <h2>Jelajahi</h2>
          <ul>{exploreLinks.map((link) => <li key={link.href}><a href={link.href}>{link.label}</a></li>)}</ul>
        </nav>

        <div className="ft-column ft-contact-column">
          <h2>Hubungi Kami</h2>
          <p>Ada pertanyaan atau ingin pesan tas?</p>
          <a className="ft-contact" href={wa}>WhatsApp <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </footer>
  );
}
