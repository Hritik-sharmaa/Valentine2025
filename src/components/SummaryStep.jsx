function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(timeStr) {
  if (!timeStr) return "";
  const [h, m] = timeStr.split(":");
  const d = new Date();
  d.setHours(Number(h), Number(m));
  return d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
}

export default function SummaryStep({ answers, onBack, onConfirm }) {
  const foodText = [...answers.foods, answers.other].filter(Boolean).join(", ");

  return (
    <div className="flex w-full max-w-md flex-col gap-8 text-center">
      <div>
        <p className="text-sm font-medium uppercase tracking-widest text-rose-500">
          Step 4 of 4
        </p>
        <h2 className="mt-2 text-2xl font-bold text-rose-900 sm:text-3xl">
          Here's our plan 💕
        </h2>
      </div>

      <div className="flex flex-col gap-4 rounded-2xl border border-rose-200 bg-white/80 p-6 text-left shadow-sm">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-rose-400">When</p>
          <p className="text-lg font-medium text-rose-900">
            {formatDate(answers.date)} at {formatTime(answers.time)}
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-rose-400">Food</p>
          <p className="text-lg font-medium text-rose-900">{foodText}</p>
        </div>
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
          onClick={onConfirm}
          className="rounded-full bg-rose-500 px-8 py-3 font-semibold text-white shadow-lg shadow-rose-300/50 transition hover:bg-rose-600"
        >
          Okay, got it! →
        </button>
      </div>
    </div>
  );
}
