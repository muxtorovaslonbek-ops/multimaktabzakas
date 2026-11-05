import { useEffect, useRef, useState } from "react";
import logo from "@/assets/logo.png";
import teacher from "@/assets/teacher.png";

const words = ["Hello", "Привет", "안녕하세요", "Hallo", "Merhaba", "Bonjour", "مرحبا", "你好", "こんにちは"];

function playSound() {
  const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const ctx = new AC();
  const master = ctx.createGain();
  master.gain.value = 0.25;
  master.connect(ctx.destination);
  const t0 = ctx.currentTime;
  // rising whoosh
  const o = ctx.createOscillator(); const g = ctx.createGain();
  o.type = "sawtooth"; o.frequency.setValueAtTime(60, t0); o.frequency.exponentialRampToValueAtTime(900, t0 + 2.2);
  g.gain.setValueAtTime(0, t0); g.gain.linearRampToValueAtTime(0.35, t0 + 1.8); g.gain.linearRampToValueAtTime(0, t0 + 2.4);
  const f = ctx.createBiquadFilter(); f.type = "lowpass"; f.frequency.value = 1400;
  o.connect(f).connect(g).connect(master); o.start(t0); o.stop(t0 + 2.5);
  // impact + chord
  const hit = t0 + 2.4;
  const b = ctx.createOscillator(); const bg = ctx.createGain();
  b.frequency.setValueAtTime(140, hit); b.frequency.exponentialRampToValueAtTime(35, hit + 0.8);
  bg.gain.setValueAtTime(1, hit); bg.gain.exponentialRampToValueAtTime(0.001, hit + 1.2);
  b.connect(bg).connect(master); b.start(hit); b.stop(hit + 1.3);
  [261.6, 329.6, 392, 523.3].forEach((fr, i) => {
    const s = ctx.createOscillator(); const sg = ctx.createGain();
    s.type = "triangle"; s.frequency.value = fr;
    const st = hit + i * 0.08;
    sg.gain.setValueAtTime(0, st); sg.gain.linearRampToValueAtTime(0.18, st + 0.05); sg.gain.exponentialRampToValueAtTime(0.001, st + 3);
    s.connect(sg).connect(master); s.start(st); s.stop(st + 3.1);
  });
  // sparkle arpeggio
  [1046, 1318, 1568, 2093, 1568, 2637].forEach((fr, i) => {
    const s = ctx.createOscillator(); const sg = ctx.createGain();
    s.type = "sine"; s.frequency.value = fr; const st = t0 + 3.4 + i * 0.12;
    sg.gain.setValueAtTime(0.12, st); sg.gain.exponentialRampToValueAtTime(0.001, st + 0.5);
    s.connect(sg).connect(master); s.start(st); s.stop(st + 0.6);
  });
  return ctx;
}

function speak() {
  if (!("speechSynthesis" in window)) return;
  const u = new SpeechSynthesisUtterance("Salom! Navoiy shahar sakkizinchi maktabiga xush kelibsiz. Keling, yangi tillarni birga o'rganamiz!");
  const v = speechSynthesis.getVoices().find((x) => /tr|uz/i.test(x.lang)) ?? null;
  if (v) u.voice = v;
  u.rate = 0.95; u.pitch = 1.15;
  speechSynthesis.cancel(); speechSynthesis.speak(u);
}

export function Intro({ onClose }: { onClose: () => void }) {
  const [stage, setStage] = useState(0);
  const ctxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    ctxRef.current = playSound();
    const ts = [
      setTimeout(() => setStage(1), 2400),
      setTimeout(() => { setStage(2); speak(); }, 3600),
      setTimeout(() => setStage(3), 7500),
    ];
    return () => { ts.forEach(clearTimeout); ctxRef.current?.close(); speechSynthesis?.cancel(); };
  }, []);

  return (
    <div className="intro-root fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-navy text-primary-foreground">
      <div className="intro-grid absolute inset-0" />
      {Array.from({ length: 40 }).map((_, i) => (
        <span key={i} className="intro-star absolute rounded-full bg-brand-glow"
          style={{ left: `${(i * 37) % 100}%`, top: `${(i * 53) % 100}%`, width: 2 + (i % 4), height: 2 + (i % 4), animationDelay: `${(i % 10) * 0.2}s` }} />
      ))}
      {words.map((w, i) => (
        <span key={w} className="intro-word absolute text-3xl font-extrabold"
          style={{ ["--a" as string]: `${i * 40}deg`, animationDelay: `${i * 0.15}s` }}>{w}</span>
      ))}

      <div className={`intro-flash absolute inset-0 ${stage >= 1 ? "on" : ""}`} />
      <div className="intro-ring absolute h-[340px] w-[340px] rounded-full" />
      <div className="intro-ring absolute h-[340px] w-[340px] rounded-full [animation-delay:.6s]" />

      <div className="relative z-10 flex flex-col items-center text-center">
        <img src={logo} alt="" className={`intro-logo h-40 w-40 ${stage >= 1 ? "in" : ""}`} />
        <h1 className={`intro-title mt-4 text-6xl font-extrabold ${stage >= 1 ? "in" : ""}`}>
          {"Navoiy shahar 8-maktab".split("").map((c, i) => (
            <span key={i} style={{ animationDelay: `${i * 0.04}s` }}>{c === " " ? "\u00A0" : c}</span>
          ))}
        </h1>
        <p className={`intro-sub mt-3 text-xl ${stage >= 2 ? "in" : ""}`}>Xush kelibsiz! 9 ta til · AI ustoz · To‘garaklar</p>
        {stage >= 3 && (
          <button onClick={onClose} className="intro-cta shine mt-8 rounded-2xl bg-brand px-10 py-4 text-xl font-bold animate-pulse-glow">
            Kirish →
          </button>
        )}
      </div>

      <img src={teacher} alt="" className={`intro-teacher absolute bottom-0 right-10 h-[60vh] ${stage >= 2 ? "in" : ""}`} />

      <button onClick={onClose} className="absolute right-6 top-6 z-20 rounded-full bg-primary-foreground/10 px-4 py-2 text-sm backdrop-blur hover:bg-primary-foreground/20">
        O‘tkazib yuborish ✕
      </button>
    </div>
  );
}
