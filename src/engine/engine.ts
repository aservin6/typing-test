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
    this.state = createInitialState(this.state.targetText);
  }

  public handleCharacter(input: string) {
    if (!this.canAcceptInput()) return;

    if (this.state.status === "idle") {
      this.start();
    }

    const result = this.validateCharacter(input);

    this.addTypedCharacter(input, result);
    this.updateCounts(result);

    this.shouldFinish();

    if (this.isComplete(result)) {
      this.finish();
    }
  }

  public handleBackspace() {
    if (this.state.typedCharacters.length === this.state.targetText.length) {
      this.state.status = "running";
      this.state.endTime = null;
    }
    if (this.state.typedCharacters.length === 0) {
      return;
    }

    const lastTypedCharacter = this.state.typedCharacters.pop();

    if (!lastTypedCharacter) return;

    if (lastTypedCharacter.result === "correct") {
      this.state.correctCount--;
    } else {
      this.state.incorrectCount--;
    }

    this.shouldFinish();
  }

  private canAcceptInput(): boolean {
    if (this.state.status === "finished") return false;

    return true;
  }

  private validateCharacter(input: string): "correct" | "incorrect" {
    const currentIndex = this.state.typedCharacters.length;
    const expectedChar = this.state.targetText[currentIndex];

    return input === expectedChar ? "correct" : "incorrect";
  }

  private addTypedCharacter(char: string, result: "correct" | "incorrect") {
    this.state.typedCharacters.push({ char, result });
  }

  private updateCounts(result: "correct" | "incorrect") {
    if (result === "correct") {
      this.state.correctCount++;
    } else {
      this.state.incorrectCount++;
    }
  }

  private isComplete(result: "correct" | "incorrect"): boolean {
    const isLastChar =
      this.state.typedCharacters.length === this.state.targetText.length;
    return isLastChar && result === "correct";
  }

  private shouldFinish(): boolean {
    if (this.state.typedCharacters.length !== this.state.targetText.length) {
      return false;
    }

    const last =
      this.state.typedCharacters[this.state.typedCharacters.length - 1];

    return last?.result === "correct";
  }
}
