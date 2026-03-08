import { useEffect } from "react";
import { ModeSelect } from "./ModeSelect";
import { useTypingStore } from "../store/useTypingStore";
import TypingContainer from "./TypingContainer";

export function TypingTest() {
  const { engine, state, mode, handleCharacter, handleBackspace } =
    useTypingStore();
  const timeLimit = engine?.getTimeLimit();

  function handleInput(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (!engine) return;
    if (
      e.ctrlKey ||
      e.altKey ||
      e.metaKey ||
      e.shiftKey ||
      e.key === "Escape"
    ) {
      return;
    }

    if (e.key === "Backspace") {
      handleBackspace();
    } else if (e.key.length === 1) {
      // Only accept printable characters
      handleCharacter(e.key);
    }
  }

  useEffect(() => {
    if (!engine || !state) return;
    if (state.status === "running") {
      const interval = setInterval(() => {
        engine.checkTime();
      }, 100);

      return () => clearInterval(interval);
    }
  }, [engine, state]);

  return (
    <div className="min-h-screen bg-neutral-800 font-mono flex flex-col items-center justify-center gap-8">
      {/* Typing Area */}
      <div className="relative text-5xl font-bold">
        {/* Hidden textarea */}
        <textarea
          onKeyDown={handleInput}
          className="absolute inset-0 opacity-0 z-50"
          autoFocus
        />
        <TypingContainer />
      </div>

      {/* Debug Info */}
      <div className="text-red-400 font-bold text-xl">
        status: {state?.status}
      </div>

      <div className="text-red-400 font-bold text-xl">mode: {mode}</div>

      <div className="text-red-400 font-bold text-xl">
        time left:{" "}
        {timeLimit &&
          (timeLimit / 1000 - engine?.getElapsedTime() / 1000).toFixed(2)}
      </div>
      <ModeSelect />
    </div>
  );
}
