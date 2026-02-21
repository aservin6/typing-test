import { createInitialState } from "./state";
import { EngineState } from "./types";

export class TypingEngine {
  private state: EngineState;

  public constructor(targetText: string) {
    this.state = createInitialState(targetText);
  }

  public getState(): EngineState {
    return this.state;
  }

  private handleCharacter(input: string) {
    if (this.state.status === "idle") {
      this.state.status = "running";
    } else if (this.state.status === "finished") {
      return;
    }

    if (this.state.startTime === null) {
      this.state.startTime = Date.now();
    }

    this.state.typedCharacters.push({
      char: input,
      result:
        input === this.state.targetText[this.state.typedCharacters.length]
          ? "correct"
          : "incorrect",
    });
  }
}
