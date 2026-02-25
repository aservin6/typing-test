import { EngineState } from "./types";

export interface EngineContext {
  finish(): void;
  isComplete(result: "correct" | "incorrect"): boolean;
  isTimeUp(): boolean;
  getState(): EngineState;
}
