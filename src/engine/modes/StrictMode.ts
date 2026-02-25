import { EngineContext } from "../EngineContext";
import { TypingModeStrategy } from "./TypingModeStrategy";

export class StrictMode implements TypingModeStrategy {
  onCharacter(engine: EngineContext, result: "correct" | "incorrect") {
    if (result === "incorrect") {
      engine.finish();
      return;
    }

    if (engine.isComplete(result)) {
      engine.finish();
    }
  }

  onTick() {}
}
