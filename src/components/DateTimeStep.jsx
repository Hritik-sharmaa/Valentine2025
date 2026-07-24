import { useState } from "react";

function todayStr() {
  return new Date().toISOString().split("T")[0];
}

export default function DateTimeStep({ initialDate, initialTime, onBack, onNext }) {
  const [date, setDate] = useState(initialDate || "");
  const [time, setTime] = useState(initialTime || "");

  const canContinue = Boolean(date && time);

  return (
    <div className="flex w-full max-w-md flex-col gap-8 text-center">
      <div>
        <p className="text-sm font-medium uppercase tracking-widest text-rose-500">
          Step 2 of 4
        </p>
        <h2 className="mt-2 text-2xl font-bold text-rose-900 sm:text-3xl">
          When should I pick you up? 📅
        </h2>
      </div>

      <div className="flex flex-col gap-4 text-left">
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-rose-700">Date</span>
          <input
            type="date"
            min={todayStr()}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="rounded-xl border border-rose-200 bg-white px-4 py-3 text-rose-900 shadow-sm outline-none focus:ring-2 focus:ring-rose-400"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-rose-700">Time</span>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="rounded-xl border border-rose-200 bg-white px-4 py-3 text-rose-900 shadow-sm outline-none focus:ring-2 focus:ring-rose-400"
          />
        </label>
      </div>

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
          onClick={() => onNext({ date, time })}
          className="rounded-full bg-rose-500 px-8 py-3 font-semibold text-white shadow-lg shadow-rose-300/50 transition hover:bg-rose-600 disabled:cursor-not-allowed disabled:bg-rose-200 disabled:shadow-none"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
