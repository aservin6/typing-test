import { useRef, useState } from "react";
import { TimedMode } from "../core/engine/modes/TimedMode";
import { TypingEngine } from "../core/engine/TypingEngine";

const text = "hello world";

export function TypingTest() {
  const engineRef = useRef(new TypingEngine(text, new TimedMode(30000)));

  const [state, setState] = useState(engineRef.current.getState());

  return (
    <>
      <div className="text-red-500 font-bold text-5xl">
        target: {state.targetText}
      </div>

      <div className="text-red-500 font-bold text-5xl">
        status: {state.status}
      </div>
    </>
  );
}
