export interface EngineState {
  status: "idle" | "running" | "finished";
  targetText: string;
  currentWordIndex: number;
  currentCharIndex: number;
  input: string;
  correctCount: number;
  incorrectCount: number;
  mode: Mode;
  startTime: number | null;
  endTime: number | null;
}

// export interface TypedCharacter {
//   char: string;
//   result: "correct" | "incorrect";
// }

export type Mode = "standard" | "strict" | "timed";
