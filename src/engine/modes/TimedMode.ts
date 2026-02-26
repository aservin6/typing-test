import { EngineContext } from "../context/EngineContext";
import { TypingModeStrategy } from "./TypingModeStrategy";

export class TimedMode implements TypingModeStrategy {
  // Needs a timeLimitMs for construction
  constructor(private readonly timeLimitMs: number) {}

  // Engine doesn't stop until time runs out, thus no finish logic
  shouldFinishOnCharacter() {
    return false;
  }

  // Tick to check if time has exceeded timeLimitMs
  // then finish()
  shouldFinishOnTick(engine: EngineContext) {
    return engine.getElapsedTime() >= this.timeLimitMs;
  }
}
