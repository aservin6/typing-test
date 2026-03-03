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
    this.state.mode = strategy.getModeName();
  }

  // =========================
  // Public Getters
  // =========================

  public getState(): EngineState {
    return this.state;
  }

  public getInput(): string {
    return this.state.input;
  }

  public getCurrentIndex(): number {
    return this.state.input.length;
  }

  public getCharState(index: number): "pending" | "correct" | "incorrect" {
    if (index >= this.state.input.length) return "pending";

    const expected = this.state.targetText[index];
    const actual = this.state.input[index];

    return expected === actual ? "correct" : "incorrect";
  }

  public getTimeLimit(): number | null {
    if ("getTimeLimit" in this.strategy) {
      return this.strategy.getTimeLimit?.() ?? null;
    }
    return null;
  }

  public getElapsedTime(): number {
    if (!this.startTime) return 0;
    return Date.now() - this.startTime;
  }

  // =========================
  // Lifecycle
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

  public handleCharacter(char: string) {
    if (this.state.status === "finished") return;

    if (this.state.status === "idle") {
      this.start();
    }

    // Ignore input beyond target length
    if (this.state.input.length > this.state.targetText.length) return;

    if (
      char !== this.state.targetText.at(this.getCurrentIndex()) &&
      this.strategy.shouldFinishOnCharacter(this, "incorrect")
    ) {
      this.finish();
    }

    this.state.input += char;

    if (this.strategy.shouldFinishOnCharacter(this, "correct")) {
      this.finish();
    }
  }

  public handleBackspace() {
    if (this.state.input.length === 0) return;

    if (this.state.status === "finished") {
      return;
    }

    this.state.input = this.state.input.slice(0, -1);
  }

  // =========================
  // Derived Stats
  // =========================

  public getCorrectCount(): number {
    let count = 0;
    for (let i = 0; i < this.state.input.length; i++) {
      if (this.state.input[i] === this.state.targetText[i]) {
        count++;
      }
    }
    return count;
  }

  public getIncorrectCount(): number {
    return this.state.input.length - this.getCorrectCount();
  }

  public isComplete(): boolean {
    return (
      this.state.input.length === this.state.targetText.length &&
      this.state.input.at(this.getCurrentIndex()) ===
        this.state.targetText.at(this.getCurrentIndex())
    );
  }
}
