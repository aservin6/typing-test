import type { Mode } from "../core/engine/types";
import { useTypingEngine } from "../hooks/useTypingEngine";

export function ModeSelect() {
  const { mode, setMode } = useTypingEngine();

  function handleChange(mode: Mode) {
    setMode(mode);
  }
  return (
    <div className="flex items-center space-x-3 *:p-2.5 *:font-bold *:uppercase *:text-white *:rounded-lg">
      <button
        onClick={() => handleChange("standard")}
        className={`bg-blue-400 ${mode === "standard" && "select-none opacity-50"}`}
      >
        Standard
      </button>

      <button
        onClick={() => handleChange("timed")}
        className={`bg-blue-400 ${mode === "timed" && "select-none opacity-50"}`}
      >
        Timed
      </button>
      <button
        onClick={() => handleChange("strict")}
        className={`bg-blue-400 ${mode === "strict" && "select-none opacity-50"}`}
      >
        Strict
      </button>
    </div>
  );
}
