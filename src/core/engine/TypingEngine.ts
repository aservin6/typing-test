import type { EngineContext } from "./context/EngineContext";
import type { TypingModeStrategy } from "./modes";
import { createInitialState } from "./state";
import type { EngineState } from "./types";

export class TypingEngine implements EngineContext {
  private state: EngineState;
  private strategy: TypingModeStrategy;
  private startTime: number | null = null;

  constructor(targetText: string, strategy: TypingModeStrategy) {
    this.state = createInitialState(targetText);
    this.strategy = strategy;
  }

  // =========================
  // Context Methods
  // =========================

  public getState(): EngineState {
    return this.state;
  }

  public getElapsedTime(): number {
    if (!this.startTime) return 0;
    return Date.now() - this.startTime;
  }

  public isComplete(result: "correct" | "incorrect"): boolean {
    const isLastChar =
      this.state.typedCharacters.length === this.state.targetText.length;

    return isLastChar && result === "correct";
  }

  // =========================
  // Engine Lifecycle
  // =========================

  public start() {
    this.state.status = "running";
    this.startTime = Date.now();
  }

  private finish() {
    this.state.status = "finished";
    this.state.endTime = Date.now();
  }

  public reset() {
    this.state = createInitialState(this.state.targetText);
    this.startTime = null;
  }

  public checkTime() {
    if (this.strategy.shouldFinishOnTick(this)) {
      this.finish();
    }
  }

  // =========================
  // Input Handling
  // =========================

  public handleCharacter(input: string) {
    if (!this.canAcceptInput()) return;

    if (this.state.status === "idle") {
      this.start();
    }

    const result = this.validateCharacter(input);
    this.addTypedCharacter(input, result);
    this.updateCounts(result);

    if (this.strategy.shouldFinishOnCharacter(this, result)) {
      this.finish();
    }
  }

  public handleBackspace() {
    if (this.state.typedCharacters.length === 0) return;

    const lastTypedCharacter = this.state.typedCharacters.pop();
    if (!lastTypedCharacter) return;

    if (lastTypedCharacter.result === "correct") {
      this.state.correctCount--;
    } else {
      this.state.incorrectCount--;
    }

    if (this.state.status === "finished") {
      this.state.status = "running";
      this.state.endTime = null;
    }
  }

  // =========================
  // Internal Helpers
  // =========================

  private canAcceptInput(): boolean {
    return this.state.status !== "finished";
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
}
