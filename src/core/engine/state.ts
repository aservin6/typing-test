import type { EngineState } from "./types";

export function createInitialState(targetText: string): EngineState {
  return {
    status: "idle",
    targetText,
    typedCharacters: [],
    correctCount: 0,
    incorrectCount: 0,
    mode: "standard",
    startTime: null,
    endTime: null,
  };
}
