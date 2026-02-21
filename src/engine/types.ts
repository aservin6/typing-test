export interface EngineState {
  status: "idle" | "running" | "finished";
  targetText: string;
  typedCharacters: TypedCharacter[];
  correctCount: number;
  incorrectCount: number;
  mode: "text" | "time";
  timeLimit?: number;
  startTime: number | null;
  endTime: number | null;
}

interface TypedCharacter {
  char: string;
  result: "correct" | "incorrect";
}
