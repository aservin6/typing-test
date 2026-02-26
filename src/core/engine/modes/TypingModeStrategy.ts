import type { EngineContext } from "../context/EngineContext";

// Interface for each Typing Mode
export interface TypingModeStrategy {
  shouldFinishOnCharacter(
    engine: EngineContext,
    result: "correct" | "incorrect",
  ): boolean;

  shouldFinishOnTick(engine: EngineContext): boolean;
}
