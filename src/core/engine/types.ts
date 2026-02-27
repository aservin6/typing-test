export interface EngineState {
  status: "idle" | "running" | "finished";
  targetText: string;
  typedCharacters: TypedCharacter[];
  correctCount: number;
  incorrectCount: number;
  mode: Mode;
  startTime: number | null;
  endTime: number | null;
}

export interface TypedCharacter {
  char: string;
  result: "correct" | "incorrect";
}

export type Mode = "standard" | "strict" | "timed";
