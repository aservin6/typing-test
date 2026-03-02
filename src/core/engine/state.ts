import type { EngineState } from "./types";

export function createInitialState(targetText: string): EngineState {
  return {
    status: "idle",
    targetText,
    currentWordIndex: 0,
    currentCharIndex: 0,
    input: "",
    correctCount: 0,
    incorrectCount: 0,
    mode: "standard",
    startTime: null,
    endTime: null,
  };
}
