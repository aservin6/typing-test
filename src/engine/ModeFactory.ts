import { StandardMode } from "./modes/StandardMode";
import { StrictMode } from "./modes/StrictMode";
import { TimedMode } from "./modes/TimedMode";

export function createMode(mode: "standard" | "strict" | "timed") {
  switch (mode) {
    case "strict":
      return new StrictMode();
    case "timed":
      return new TimedMode();
    default:
      return new StandardMode();
  }
}
