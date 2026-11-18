import { useCallback, useEffect, useRef, useState } from "react";
import "./Opening.css";

const LETTERS = "GRANOVA".split("");
const ROTATIONS = [-3, 2, -2, 3, -2, 2, -3];

function playChime(context) {
  const start = context.currentTime + .04;
  const notes = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66];
  notes.forEach((frequency, index) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const time = start + .12 * index;
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, time);
    gain.gain.setValueAtTime(.0001, time);
    gain.gain.exponentialRampToValueAtTime(.3, time + .02);
    gain.gain.exponentialRampToValueAtTime(.0001, time + .65);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(time);
    oscillator.stop(time + .7);
  });
  [1318.5, 1568, 1760].forEach((frequency, index) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const time = start + 1.15 + index * .18;
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, time);
    gain.gain.setValueAtTime(.0001, time);
    gain.gain.exponentialRampToValueAtTime(.16, time + .02);
    gain.gain.exponentialRampToValueAtTime(.0001, time + 1.1);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(time);
    oscillator.stop(time + 1.15);
  });
}

function Flower({ className, delay }) {
  return (
    <svg className={`opening-flower ${className}`} style={{ "--delay": delay }} viewBox="0 0 40 40" aria-hidden="true">
      <g fill="#f784c0">
        <circle cx="20" cy="9" r="7" /><circle cx="31" cy="17" r="7" />
        <circle cx="27" cy="30" r="7" /><circle cx="13" cy="30" r="7" /><circle cx="9" cy="17" r="7" />
      </g>
      <circle cx="20" cy="20" r="5" fill="#d9459f" />
    </svg>
  );
}

export default function Opening({ onComplete }) {
  const audioContext = useRef(null);
  const audioStarted = useRef(false);
  const [soundBlocked, setSoundBlocked] = useState(true);

  const playSound = useCallback(async () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return false;
      let context = audioContext.current;
      if (!context || context.state === "closed") {
        context = new AudioCtx();
        audioStarted.current = false;
      }
      audioContext.current = context;
      await context.resume();
      if (context.state !== "running") {
        setSoundBlocked(true);
        return false;
      }
      if (!audioStarted.current) {
        playChime(context);
        audioStarted.current = true;
      }
      setSoundBlocked(false);
      return true;
    } catch {
      setSoundBlocked(true);
      return false;
    }
  }, []);

  const finishOpening = useCallback(() => {
    audioContext.current?.close().catch(() => {});
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    playSound();
    const timer = window.setTimeout(finishOpening, 5200);
    return () => window.clearTimeout(timer);
    // If the browser blocks autoplay, the first tap starts the chime.
  }, [finishOpening, playSound]);

  const enterSite = async () => {
    if (!audioStarted.current) {
      const started = await playSound();
      if (started) return;
    }
    finishOpening();
  };

  return (
    <div className="opening-screen opening-play" tabIndex={0} aria-label="Opening Granova, klik untuk masuk" onClick={enterSite} onKeyDown={(event) => {
      if (event.key === "Enter" || event.key === " ") { event.preventDefault(); enterSite(); }
    }}>
      <div className="opening-card">
        <Flower className="opening-f1" delay="0" />
        <Flower className="opening-f2" delay="1" />
        <Flower className="opening-f3" delay="2" />
        <Flower className="opening-f4" delay="3" />
        <div className="opening-brand">
          <svg className="opening-bag" viewBox="0 0 100 112" aria-hidden="true">
            <path d="M33 14C20 30 14 60 14 78c0 14 12 24 36 24s36-10 36-24c0-18-6-48-19-64z" fill="#f4ecdc" stroke="#d8c9a8" strokeWidth="1.5" />
            <path d="M33 14c6 6 28 6 34 0-1-6-4-9-8-10H41c-4 1-7 4-8 10z" fill="#e8dcc0" />
            <path d="M33 14c-9-4-17-2-21 8M67 14c9-4 17-2 21 8M12 22c-4 22-4 48 0 70M88 22c4 22 4 48 0 70" fill="none" stroke="#e6d6b2" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="12" cy="94" r="4.5" fill="#e6d6b2" /><circle cx="88" cy="94" r="4.5" fill="#e6d6b2" />
            <circle cx="50" cy="60" r="21" fill="#fbd0e6" />
            <path d="M26 66c8-5 18-9 28-9 7 0 12-3 15-8 2-3 5-3 7-1-1 9-7 14-14 17-10 5-22 6-32 3-3-1-5-2-4-2z" fill="#fff" stroke="#6b3a0e" strokeWidth="2" strokeLinejoin="round" />
            <path d="M69 49c1-6 6-10 11-12-1 6-3 10-7 14z" fill="#fff" stroke="#6b3a0e" strokeWidth="2" strokeLinejoin="round" />
            <circle cx="37" cy="64" r="1.6" fill="#6b3a0e" />
            <g transform="translate(20 34) scale(.35)" fill="#f784c0"><circle cx="20" cy="9" r="7" /><circle cx="31" cy="17" r="7" /><circle cx="27" cy="30" r="7" /><circle cx="13" cy="30" r="7" /><circle cx="9" cy="17" r="7" /><circle cx="20" cy="20" r="5" fill="#d9459f" /></g>
            <g transform="translate(68 62) scale(.3)" fill="#f784c0"><circle cx="20" cy="9" r="7" /><circle cx="31" cy="17" r="7" /><circle cx="27" cy="30" r="7" /><circle cx="13" cy="30" r="7" /><circle cx="9" cy="17" r="7" /><circle cx="20" cy="20" r="5" fill="#d9459f" /></g>
          </svg>
          <div className="opening-word" aria-label="Granova">
            {LETTERS.map((letter, index) => <span key={`${letter}-${index}`} style={{ "--index": index, "--tilt": `${ROTATIONS[index]}deg` }} aria-hidden="true">{letter}</span>)}
          </div>
        </div>
        <p className="opening-tag">dijahit dari karung bekas</p>
        <div className="opening-bar"><i /></div>
        {soundBlocked && <button className="opening-enable-sound" type="button" onClick={async (event) => { event.stopPropagation(); await playSound(); }}>
          Aktifkan suara
        </button>}
        <svg className="opening-hills" viewBox="0 0 400 60" preserveAspectRatio="none" aria-hidden="true"><path d="M0 60V40C50 8 110 8 160 36S280 52 330 20c25-14 50-14 70-4v44z" fill="#6b3a0e" /></svg>
      </div>
    </div>
  );
}
