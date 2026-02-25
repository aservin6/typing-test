import { DEFAULT_TIME_LIMIT } from "../constants";
import { TypingEngine } from "../engine";
import { EngineContext } from "../EngineContext";
import { TypingModeStrategy } from "./TypingModeStrategy";

export class TimedMode implements TypingModeStrategy {
  constructor(private timeLimit = DEFAULT_TIME_LIMIT) {}
  onCharacter(engine: EngineContext, result: "correct" | "incorrect") {
    const state = engine.getState();
    if (!state.timeLimit) {
      state.timeLimit = this.timeLimit;
    }
  }

  onTick(engine: TypingEngine) {
    if (engine.isTimeUp()) {
      engine.finish();
    }
  }
}
