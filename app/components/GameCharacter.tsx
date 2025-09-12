"use client";

import { useEffect, useState, type CSSProperties } from "react";

type AvPayload = { emoji?: string };

type StarStyle = CSSProperties & { [key: string]: string | number | undefined };

export default function GameCharacter() {
  const [emoji, setEmoji] = useState("🧑‍💻");

  useEffect(() => {
    const onSel = (e: Event) => {
      const payload = (e as CustomEvent).detail?.avatar as AvPayload | undefined;
      if (payload?.emoji) setEmoji(payload.emoji);
    };
    window.addEventListener("avatar:selected", onSel as EventListener);
    return () => window.removeEventListener("avatar:selected", onSel as EventListener);
  }, []);

  return (
    <div className="emoji-stage">
      <div className="stars" aria-hidden>
        {Array.from({ length: 14 }).map((_, i) => {
          const style: StarStyle = { ["--i"]: i };
          return <span key={i} className="star" style={style} />;
        })}
      </div>
      <div className="emoji-icon floaty" aria-label="Character">{emoji}</div>
    </div>
  );
}
