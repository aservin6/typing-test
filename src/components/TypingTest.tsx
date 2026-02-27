import { useEffect, useMemo, useState } from "react";
import { TimedMode } from "../core/engine/modes/TimedMode";
import { TypingEngine } from "../core/engine/TypingEngine";

const text = "hello world";

export function TypingTest() {
  const engine = useMemo(() => {
    return new TypingEngine(text, new TimedMode(5000));
  }, []);

  const timeLimit = engine.getTimeLimit();

  const [state, setState] = useState(engine.getState());

  function handleStart() {
    if (!state.startTime) engine.start();
    setState({ ...engine.getState() });
  }

  useEffect(() => {
    const interval = setInterval(() => {
      engine.checkTime();
      setState({ ...engine.getState() });
    }, 100);

    return () => clearInterval(interval);
  }, [engine]);

  return (
    <div className="min-h-screen bg-neutral-800">
      <div className="text-red-400 font-bold text-5xl">
        target: {state.targetText}
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
        s
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
