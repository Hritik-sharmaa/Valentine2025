import { useRef, useState } from "react";

const NO_LABELS = [
  "No",
  "Are you sure?",
  "Really sure?",
  "Think again!",
  "Last chance...",
  "Surely not?",
  "You might regret this",
  "C'mon, reconsider",
  "Pretty please?",
  "It's just one date!",
];

export default function AskStep({ onYes }) {
  const containerRef = useRef(null);
  const [noPos, setNoPos] = useState(null);
  const [dodgeCount, setDodgeCount] = useState(0);

  const dodge = () => {
    const container = containerRef.current;
    if (!container) return;
    const bounds = container.getBoundingClientRect();
    const btnW = 180;
    const btnH = 52;
    const maxX = Math.max(bounds.width - btnW, 0);
    const maxY = Math.max(bounds.height - btnH, 0);
    setNoPos({ x: Math.random() * maxX, y: Math.random() * maxY });
    setDodgeCount((c) => c + 1);
  };

  const yesScale = 1 + Math.min(dodgeCount * 0.08, 1.2);
  const noLabel = NO_LABELS[Math.min(dodgeCount, NO_LABELS.length - 1)];

  return (
    <div className="flex flex-col items-center gap-10 text-center">
      <div>
        <p className="text-sm font-medium uppercase tracking-widest text-rose-500">
          A question for you
        </p>
        <h1 className="mt-2 text-3xl font-bold text-rose-900 sm:text-4xl">
          Will you go on a date with me? 💌
        </h1>
      </div>

      <div ref={containerRef} className="relative h-56 w-full max-w-md sm:h-64">
        <button
          type="button"
          onClick={onYes}
          style={{ transform: `translate(-50%, -50%) scale(${yesScale})` }}
          className="absolute left-1/2 top-1/2 rounded-full bg-rose-500 px-8 py-3 font-semibold whitespace-nowrap text-white shadow-lg shadow-rose-300/50 transition-transform duration-300 hover:bg-rose-600"
        >
          Yes 💖
        </button>

        <button
          type="button"
          onMouseEnter={dodge}
          onTouchStart={dodge}
          onClick={dodge}
          style={
            noPos
              ? {
                  left: noPos.x,
                  top: noPos.y,
                  transition: "left 0.25s ease, top 0.25s ease",
                }
              : { left: "50%", top: "70%", transform: "translateX(-50%)" }
          }
          className="absolute rounded-full bg-white px-6 py-3 text-sm font-medium whitespace-nowrap text-rose-400 shadow ring-1 ring-rose-200"
        >
          {noLabel}
        </button>
      </div>

      <p className="text-xs text-rose-400">
        (hint: there's only one honest answer here 😉)
      </p>
    </div>
  );
}
