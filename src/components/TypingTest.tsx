import { useEffect, useMemo, useState } from "react";
import { TimedMode } from "../core/engine/modes/TimedMode";
import { TypingEngine } from "../core/engine/TypingEngine";

const text = "hello world";

export function TypingTest() {
  const engine = useMemo(() => {
    return new TypingEngine(text, new TimedMode(60000));
  }, []);

  const [state, setState] = useState(engine.getState());

  const timeLimit = engine.getTimeLimit();

  function sync() {
    setState({ ...engine.getState() });
  }

  function handleStart() {
    if (state.status === "idle") {
      engine.start();
      sync();
    }
  }

  function handleInput(e: React.KeyboardEvent<HTMLTextAreaElement>) {
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
      engine.handleBackspace();
    } else if (e.key.length === 1) {
      // Only accept printable characters
      engine.handleCharacter(e.key);
    }
    sync();
  }

  useEffect(() => {
    if (state.status === "running") {
      const interval = setInterval(() => {
        engine.checkTime();
        sync();
      }, 100);

      return () => clearInterval(interval);
    }
  }, [engine, state.status]);

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
        {/* Rendered Text */}
        <div className="flex flex-wrap">
          {state.targetText.split("").map((char, index) => {
            const charState = engine.getCharState(index);
            const isCurrent = index === engine.getCurrentIndex();

            let colorClass = "text-neutral-500";

            if (charState === "correct") {
              colorClass = "text-white";
            } else if (charState === "incorrect") {
              colorClass = "text-red-500";
            }

            return (
              <span key={index} className={`relative ${colorClass}`}>
                {char === " " ? "\u00A0" : char}

                {/* Cursor */}
                {isCurrent && (
                  <span className="absolute left-0 top-0 w-0.5 h-full bg-white animate-pulse" />
                )}
              </span>
            );
          })}
        </div>{" "}
      </div>

      {/* Debug Info */}
      <div className="text-red-400 font-bold text-xl">
        status: {state.status}
      </div>

      <div className="text-red-400 font-bold text-xl">mode: {state.mode}</div>

      <div className="text-red-400 font-bold text-xl">
        time limit: {timeLimit && timeLimit / 1000}
      </div>

      <div className="text-red-400 font-bold text-xl">
        time left:{" "}
        {timeLimit &&
          (timeLimit / 1000 - engine.getElapsedTime() / 1000).toFixed(2)}
      </div>

      <button
        onClick={handleStart}
        className="bg-blue-500 px-6 py-3 text-white cursor-pointer rounded"
      >
        Start
      </button>
    </div>
  );
}
