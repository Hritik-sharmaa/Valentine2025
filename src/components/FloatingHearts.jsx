import { useMemo } from "react";

export default function FloatingHearts() {
  const hearts = useMemo(
    () =>
      Array.from({ length: 14 }, () => ({
        left: Math.random() * 100,
        delay: Math.random() * 10,
        duration: 8 + Math.random() * 10,
        size: 14 + Math.random() * 22,
      })),
    [],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {hearts.map((h, i) => (
        <span
          key={i}
          className="absolute bottom-0 select-none text-rose-300/70"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
            animation: `float-up ${h.duration}s linear ${h.delay}s infinite`,
          }}
        >
          ❤
        </span>
      ))}
    </div>
  );
}
