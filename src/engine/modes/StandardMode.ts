import { EngineContext } from "../EngineContext";
import { TypingModeStrategy } from "./TypingModeStrategy";

export class StandardMode implements TypingModeStrategy {
  // Engine stops once all words have been typed
  shouldFinishOnCharacter(
    engine: EngineContext,
    result: "correct" | "incorrect",
  ) {
    return engine.isComplete(result);
  }

  // No tick to finish() logic needed for non timed mode
  shouldFinishOnTick() {
    return false;
  }
}
