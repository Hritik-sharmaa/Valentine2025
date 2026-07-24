import { useState } from "react";

const FOODS = [
  { id: "pizza", label: "Pizza", emoji: "🍕" },
  { id: "sushi", label: "Sushi", emoji: "🍣" },
  { id: "italian", label: "Italian", emoji: "🍝" },
  { id: "burgers", label: "Burgers", emoji: "🍔" },
  { id: "bbq", label: "BBQ", emoji: "🍖" },
  { id: "dessert", label: "Just dessert", emoji: "🍰" },
  { id: "indian", label: "Indian", emoji: "🍛" },
  { id: "surprise", label: "Surprise me", emoji: "✨" },
];

export default function FoodStep({ initialFoods, initialOther, onBack, onNext }) {
  const [selected, setSelected] = useState(initialFoods || []);
  const [other, setOther] = useState(initialOther || "");

  const toggle = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const canContinue = selected.length > 0 || other.trim().length > 0;

  return (
    <div className="flex w-full max-w-md flex-col gap-8 text-center">
      <div>
        <p className="text-sm font-medium uppercase tracking-widest text-rose-500">
          Step 3 of 4
        </p>
        <h2 className="mt-2 text-2xl font-bold text-rose-900 sm:text-3xl">
          What are you in the mood for? 🍽️
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {FOODS.map((f) => {
          const active = selected.includes(f.id);
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => toggle(f.id)}
              className={`flex flex-col items-center gap-1 rounded-2xl border px-3 py-4 text-sm font-medium transition ${
                active
                  ? "border-rose-500 bg-rose-500 text-white shadow-lg shadow-rose-300/50"
                  : "border-rose-200 bg-white text-rose-700 hover:border-rose-300"
              }`}
            >
              <span className="text-2xl">{f.emoji}</span>
              {f.label}
            </button>
          );
        })}
      </div>

      <label className="flex flex-col gap-1 text-left">
        <span className="text-sm font-medium text-rose-700">Something else?</span>
        <input
          type="text"
          value={other}
          onChange={(e) => setOther(e.target.value)}
          placeholder="Tell me what you're craving"
          className="rounded-xl border border-rose-200 bg-white px-4 py-3 text-rose-900 shadow-sm outline-none focus:ring-2 focus:ring-rose-400"
        />
      </label>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="text-sm font-medium text-rose-400 hover:text-rose-600"
        >
          ← Back
        </button>
        <button
          type="button"
          disabled={!canContinue}
          onClick={() =>
            onNext({
              foods: selected.map((id) => FOODS.find((f) => f.id === id).label),
              other: other.trim(),
            })
          }
          className="rounded-full bg-rose-500 px-8 py-3 font-semibold text-white shadow-lg shadow-rose-300/50 transition hover:bg-rose-600 disabled:cursor-not-allowed disabled:bg-rose-200 disabled:shadow-none"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
