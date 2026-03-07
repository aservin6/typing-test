import { create } from "zustand";
import type { TypingEngine } from "../core/engine/TypingEngine";
import type { EngineState, Mode } from "../core/engine/types";
import { getEngineFromMode } from "../utils/get-engine-from-mode";

// Types of States & Actions
type TypingStore = {
  engine: TypingEngine | null;
  state: EngineState | null;
  mode: Mode;
  createEngine: (engine: TypingEngine) => void;
  setMode: (mode: Mode) => void;
  handleInput: (input: string) => void;
  start: () => void;
  reset: () => void;
};

// States & Action values
export const useTypingStore = create<TypingStore>()((set, get) => ({
  engine: null,
  state: null,
  mode: "standard",
  createEngine: (engine) => set(() => ({ engine, state: engine.getState() })),
  setMode: (mode) => set(() => ({ mode })),
  handleInput: (input) => {
    const { engine } = get();
    if (!engine) return;
    engine.handleCharacter(input);

    set({ state: engine.getState() });
  },
  start: () => {
    const { engine } = get();
    if (!engine) return;

    engine.start();

    set({ state: engine?.getState() });
  },
  reset: () => {
    const { mode } = get();

    // create new engine instance
    const newEngine = getEngineFromMode(mode);

    set({
      engine: newEngine,
      state: newEngine.getState(),
    });
  },
}));
