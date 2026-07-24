import { useState } from "react";
import FloatingHearts from "./components/FloatingHearts.jsx";
import Confetti from "./components/Confetti.jsx";
import AskStep from "./components/AskStep.jsx";
import DateTimeStep from "./components/DateTimeStep.jsx";
import FoodStep from "./components/FoodStep.jsx";
import SummaryStep from "./components/SummaryStep.jsx";
import FinalStep from "./components/FinalStep.jsx";

export default function App() {
  const [step, setStep] = useState("ask");
  const [answers, setAnswers] = useState({
    date: "",
    time: "",
    foods: [],
    other: "",
  });

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-rose-50 via-pink-50 to-rose-100 px-4 py-10">
      <FloatingHearts />
      {step === "final" && <Confetti />}

      <div key={step} className="relative z-10 flex w-full justify-center animate-pop-in">
        {step === "ask" && <AskStep onYes={() => setStep("datetime")} />}

        {step === "datetime" && (
          <DateTimeStep
            initialDate={answers.date}
            initialTime={answers.time}
            onBack={() => setStep("ask")}
            onNext={({ date, time }) => {
              setAnswers((a) => ({ ...a, date, time }));
              setStep("food");
            }}
          />
        )}

        {step === "food" && (
          <FoodStep
            initialFoods={[]}
            initialOther={answers.other}
            onBack={() => setStep("datetime")}
            onNext={({ foods, other }) => {
              setAnswers((a) => ({ ...a, foods, other }));
              setStep("summary");
            }}
          />
        )}

        {step === "summary" && (
          <SummaryStep
            answers={answers}
            onBack={() => setStep("food")}
            onConfirm={() => setStep("final")}
          />
        )}

        {step === "final" && <FinalStep />}
      </div>
    </div>
  );
}
