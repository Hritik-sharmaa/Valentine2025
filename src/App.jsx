import React, { useState, useEffect } from "react";
import { Heart, Stars, Sparkles } from "lucide-react";
import "./index.css";

const App = () => {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const [isFloating, setIsFloating] = useState(true);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });
  const [name, setName] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const nameParam = params.get("name");
    setName(nameParam || "");
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFloating((prev) => !prev);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const phrases = [
    "No",
    "Are you sure?",
    "Really sure?",
    "Please think again!",
    "Last chance!",
    "Let's go pookieee",
    "Surely not?",
    "You might regret this!",
    "Give it another thought!",
    "Are you absolutely sure?",
    "This could be a mistake!",
    "Have a heart!",
    "Don't be so cold!",
    "Change of heart?",
    "Wouldn't you reconsider?",
    "Is that your final answer?",
    "You're breaking my heart ;(",
    "Please say yessssssss..... :(",
    "Pookiee pleaseeeee "
  ];

  const getNoButtonText = () => phrases[Math.min(noCount, phrases.length - 1)];

  const moveButton = () => {
    const containerWidth = Math.min(512, window.innerWidth - 32); // max-w-lg with padding
    const containerHeight = Math.min(400, window.innerHeight * 0.6); // 60vh with max height
    const buttonWidth = windowSize.width < 640 ? 100 : 150; // Smaller button size
    const buttonHeight = 40;

    const maxX = containerWidth - buttonWidth;
    const maxY = containerHeight - buttonHeight;

    const newX = Math.max(Math.min(Math.random() * maxX, maxX), 0);
    const newY = Math.max(Math.min(Math.random() * maxY, maxY), 0);

    setButtonPosition({ x: newX, y: newY });
    setNoCount(noCount + 1);
  };

  const getYesButtonSize = () => {
    const containerWidth = Math.min(512, window.innerWidth - 32);
    const baseSize = windowSize.width < 640 ? 14 : 18;
    const increment = windowSize.width < 640 ? 4 : 6;
    const maxSize = containerWidth / 8; // Limit maximum size relative to container
    return Math.min(baseSize + noCount * increment, maxSize);
  };

  const BackgroundHearts = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className={`absolute animate-float opacity-20 ${
            isFloating ? "translate-y-2" : "-translate-y-2"
          } transition-transform duration-1500`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.3}s`,
          }}>
          <Heart
            size={Math.random() * 20 + 10}
            color="#ec4899"
            fill="#ec4899"
          />
        </div>
      ))}
    </div>
  );

  if (yesPressed) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-pink-50 to-red-50 p-4 relative overflow-hidden">
        <BackgroundHearts />
        <div className="text-center relative z-10 animate-fade-in-up">
          <div className="absolute -top-12 left-1/2 -translate-x-1/2">
            <Sparkles className="text-pink-500 animate-spin-slow" size={48} />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-pink-600 animate-bounce-slow">
            Yaaay! 🎉
          </h1>
          <p className="text-xl md:text-2xl text-gray-800 px-4 mb-8 animate-fade-in">
            Can't wait for our Valentine's date {name}! ❤️
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            {[...Array(16)].map((_, i) => (
              <Heart
                key={i}
                className="animate-bounce"
                style={{ animationDelay: `${i * 0.1}s` }}
                color="#ec4899"
                fill="#ec4899"
                size={windowSize.width < 640 ? 24 : 32}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-pink-50 to-red-50 p-4 relative overflow-hidden">
      <BackgroundHearts />
      <div className="text-center w-full max-w-lg relative z-10">
        <div className="mb-8 flex justify-center">
          <Stars className="text-pink-500 animate-spin-slow" size={32} />
        </div>
        <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-8 text-pink-600 shadow-text relative animate-pulse-slow">
          Will you be my Valentine? 🌹
        </h1>

        <div className="relative h-[100vh] w-full max-w-lg overflow-visible">
          <div className="absolute left-1/2 -translate-x-1/2 w-full flex justify-center items-center">
            <button
              className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 whitespace-nowrap overflow-hidden"
              style={{
                fontSize: `${getYesButtonSize()}px`,
                padding: `${Math.max(8, getYesButtonSize() / 3)}px ${Math.max(
                  16,
                  getYesButtonSize() / 2
                )}px`,
              }}
              onClick={() => setYesPressed(true)}>
              Yes! ❤️
            </button>
          </div>

          <button
            className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-2 px-4 rounded-lg absolute transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-95"
            style={{
              left: buttonPosition.x,
              top: buttonPosition.y,
              fontSize: windowSize.width < 640 ? "16px" : "20px",
              maxWidth: windowSize.width < 640 ? "160px" : "220px",
            }}
            onMouseEnter={moveButton}
            onTouchStart={moveButton}
            onClick={moveButton}>
            {getNoButtonText()}
          </button>
        </div>
      </div>
      <p>
        Created by{" "}
        <a
          href="https://www.instagram.com/ric_codes/"
          className="underline text-blue-500">
          Hritik sharma
        </a>
      </p>
    </div>
  );
};

export default App;
