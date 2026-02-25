import { EngineContext } from "../EngineContext";

export interface TypingModeStrategy {
  onCharacter(engine: EngineContext, result: "correct" | "incorrect"): void;
  onTick(engine: EngineContext): void;
}
