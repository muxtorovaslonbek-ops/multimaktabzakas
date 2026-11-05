import { useRef, useState } from "react";
import { Play } from "lucide-react";
import video from "@/assets/ai_darslar_intro.mp4.asset.json";
import cover from "@/assets/intro_cover.jpg.asset.json";
import logo from "@/assets/logo.png";

export function Intro({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const start = () => {
    setPlaying(true);
    ref.current?.play();
  };

  return (
    <div className="intro-root fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-navy text-primary-foreground">
      <video
        ref={ref}
        src={video.url}
        poster={cover.url}
        playsInline
        controls={playing}
        onEnded={onClose}
        className="h-full w-full object-contain"
      />

      {!playing && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-navy/60 backdrop-blur-[2px]">
          <img src={logo} alt="" className="h-24 w-24 animate-floaty drop-shadow-[0_0_18px_oklch(0.7_0.2_240/.6)]" />
          <h1 className="mt-3 text-center text-5xl font-extrabold">Navoiy shahar 8-maktab</h1>
          <p className="mt-2 text-lg opacity-90">AI darslar · 9 ta til · To‘garaklar</p>
          <button
            onClick={start}
            aria-label="Videoni boshlash"
            className="shine mt-8 flex h-24 w-24 items-center justify-center rounded-full bg-brand shadow-soft animate-pulse-glow transition hover:scale-110"
          >
            <Play className="ml-1 h-10 w-10 fill-current" />
          </button>
          <p className="mt-3 text-sm opacity-80">Ko‘rish uchun bosing</p>
        </div>
      )}

      <button onClick={onClose} className="absolute right-6 top-6 z-20 rounded-full bg-primary-foreground/10 px-4 py-2 text-sm backdrop-blur hover:bg-primary-foreground/20">
        O‘tkazib yuborish ✕
      </button>
    </div>
  );
}
