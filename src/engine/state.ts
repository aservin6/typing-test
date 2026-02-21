import { EngineState } from "./types";

export function createInitialState(targetText: string): EngineState {
  return {
    status: "idle",
    targetText,
    typedCharacters: [],
    correctCount: 0,
    incorrectCount: 0,
    mode: "text",
    startTime: null,
    endTime: null,
  };
}
