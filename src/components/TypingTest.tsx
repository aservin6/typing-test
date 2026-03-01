import { useEffect, useMemo, useState } from "react";
import { TimedMode } from "../core/engine/modes/TimedMode";
import { TypingEngine } from "../core/engine/TypingEngine";

const text = "hello world";
const textArray = text.split("");

export function TypingTest() {
  const engine = useMemo(() => {
    return new TypingEngine(text, new TimedMode(60000));
  }, []);

  const timeLimit = engine.getTimeLimit();

  const [state, setState] = useState(engine.getState());

  function handleStart() {
    if (!state.startTime) engine.start();
    setState({ ...engine.getState() });
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
    } else if (e.key === "Backspace") {
      engine.handleBackspace();
      setState({ ...engine.getState() });
    } else {
      engine.handleCharacter(e.key);
      setState({ ...engine.getState() });
    }

    console.log(state.typedCharacters);
  }

  function displayWords() {}

  useEffect(() => {
    if (state.status === "running") {
      const interval = setInterval(() => {
        engine.checkTime();
        setState({ ...engine.getState() });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [engine, state.status]);

  return (
    <div className="min-h-screen bg-neutral-800 font-mono">
      <div className="relative font-bold text-5xl">
        <textarea
          onKeyDown={handleInput}
          className="relative text-transparent z-50"
        ></textarea>
        <div className="absolute top-0 left-0 text-neutral-500">
          {textArray.map((c, i) => {
            return <span>{c}</span>;
          })}
        </div>
      </div>

      <div className="text-red-400 font-bold text-5xl">
        status: {state.status}
      </div>

      <div className="text-red-400 font-bold text-5xl">mode: {state.mode}</div>

      <div className="text-red-400 font-bold text-5xl">
        time limit: {timeLimit && timeLimit / 1000}
      </div>
      <div className="text-red-400 font-bold text-5xl">
        time left:{" "}
        {timeLimit &&
          (timeLimit / 1000 - engine.getElapsedTime() / 1000).toFixed(2)}
      </div>
      <button
        onClick={handleStart}
        className="bg-blue-500 p-3 text-white cursor-pointer"
      >
        Start
      </button>
    </div>
  );
}
