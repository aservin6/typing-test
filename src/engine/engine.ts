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

  public start() {
    this.state.status = "running";
    this.state.startTime = Date.now();
  }

  public finish() {
    this.state.status = "finished";
    this.state.endTime = Date.now();
  }

  public reset() {
    this.state.status = "idle";
    this.state.startTime = null;
    this.state.endTime = null;
  }

  public handleCharacter(input: string) {
    if (this.state.status === "idle") {
      this.start();
    } else if (this.state.status === "finished") {
      return;
    }

    if (this.state.startTime === null) {
      this.state.startTime = Date.now();
    }

    const currentIndex = this.state.typedCharacters.length;
    const expectedChar = this.state.targetText[currentIndex];
    const isCorrect = input === expectedChar;

    this.state.typedCharacters.push({
      char: input,
      result: isCorrect ? "correct" : "incorrect",
    });

    if (isCorrect) {
      this.state.correctCount++;
    } else {
      this.state.incorrectCount++;
    }

    if (this.state.targetText.length === this.state.typedCharacters.length) {
      this.finish();
    }
  }
}
