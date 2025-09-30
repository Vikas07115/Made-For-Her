"use client";

import { useEffect, useRef, useState } from "react";

export default function BackgroundAudio() {
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const audioEl = audioRef.current;
    if (!audioEl) return;

    // Ensure muted autoplay (most browsers allow this reliably)
    audioEl.muted = true;
    audioEl.volume = 0.8;
    audioEl.play().catch(() => {});

    // Auto-unmute on first user interaction anywhere on the page
    const unmuteOnFirstInteraction = async () => {
      const a = audioRef.current;
      if (!a) return;
      try { await a.play(); } catch (_) {}
      a.muted = false;
      setIsMuted(false);
      removeListeners();
    };

    const removeListeners = () => {
      window.removeEventListener("pointerdown", unmuteOnFirstInteraction, { capture: true });
      window.removeEventListener("keydown", unmuteOnFirstInteraction, { capture: true });
      document.removeEventListener("visibilitychange", onVisibleTryPlay, { capture: true });
    };

    const onVisibleTryPlay = async () => {
      if (document.visibilityState !== "visible") return;
      const a = audioRef.current;
      if (!a) return;
      try { await a.play(); } catch (_) {}
    };

    window.addEventListener("pointerdown", unmuteOnFirstInteraction, { capture: true, once: true });
    window.addEventListener("keydown", unmuteOnFirstInteraction, { capture: true, once: true });
    document.addEventListener("visibilitychange", onVisibleTryPlay, { capture: true });

    return removeListeners;
  }, []);

  const toggleMute = async () => {
    const audioEl = audioRef.current;
    if (!audioEl) return;
    if (isMuted) {
      // Unmute on user gesture; ensure playback started
      try { await audioEl.play(); } catch (_) {}
      audioEl.muted = false;
      setIsMuted(false);
    } else {
      audioEl.muted = true;
      setIsMuted(true);
    }
  };

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none" }}>
      <audio
        ref={audioRef}
        src="/audio.mp3"
        preload="auto"
        loop
        playsInline
        autoPlay
        muted
      />
      <div
        style={{
          position: "fixed",
          bottom: 16,
          right: 16,
          pointerEvents: "auto",
          zIndex: 50,
        }}
      >
        <button
          onClick={toggleMute}
          style={{
            padding: "10px 14px",
            borderRadius: 9999,
            background: isMuted ? "#111" : "#fff",
            color: isMuted ? "#fff" : "#111",
            border: isMuted ? "1px solid #333" : "1px solid #ccc",
            boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
          }}
        >
          {isMuted ? "Unmute" : "Mute"}
        </button>
      </div>
    </div>
  );
}


