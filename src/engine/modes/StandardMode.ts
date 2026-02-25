import { EngineContext } from "../EngineContext";
import { TypingModeStrategy } from "./TypingModeStrategy";

export class StandardMode implements TypingModeStrategy {
  onCharacter(engine: EngineContext, result: "correct" | "incorrect") {
    if (engine.isComplete(result)) {
      engine.finish();
    }
  }
  onTick() {}
}
