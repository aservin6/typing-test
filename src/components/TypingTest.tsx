import {
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
import { TimedMode } from "../core/engine/modes/TimedMode";
import { TypingEngine } from "../core/engine/TypingEngine";

const text = "hello world";
const textArray = text.split("");
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

  function handleInput(e: ChangeEvent<HTMLTextAreaElement>) {
    engine.handleCharacter(e.target.value);
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
      <div className="relative text-red-400 font-bold text-5xl">
        <textarea onChange={handleInput} className="relative z-50"></textarea>
        <div className="absolute top-0 left-0 text-neutral-500">
          {textArray.map((char: string) => {
            return <span>{char}</span>;
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
      <div className="text-red-400 font-bold text-5xl">
        typed characters:{" "}
        {state.typedCharacters.map((c) => {
          return <div>{c.char}</div>;
        })}
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
