import { create } from "zustand";
import type { TypingEngine } from "../core/engine/TypingEngine";
import type { EngineState, Mode } from "../core/engine/types";
import { getEngineFromMode } from "../utils/get-engine-from-mode";

// Types of States & Actions
type TypingState = {
  engine: TypingEngine | null;
  state: EngineState | null;
  mode: Mode;
  timeLimit: number;
  elapsedTime: number;
};

type TypingActions = {
  setTimeLimit: (timeLimit: number) => void;
  setEngine: (engine: TypingEngine) => void;
  setMode: (mode: Mode) => void;
  handleCharacter: (key: string) => void;
  handleBackspace: () => void;
  start: () => void;
  reset: () => void;
  tick: () => void;
};

type TypingStore = TypingState & TypingActions;

function syncState(engine: TypingEngine) {
  return {
    state: { ...engine.getState() },
    elapsedTime: engine.getElapsedTime(),
  };
}

// States & Action values
export const useTypingStore = create<TypingStore>()((set, get) => ({
  engine: null,
  state: null,
  mode: "standard",
  timeLimit: 30000,
  elapsedTime: 0,
  setTimeLimit: (timeLimit) => set(() => ({ timeLimit })),
  setEngine: (engine: TypingEngine) => set({ engine, ...syncState(engine) }),
  setMode: (mode) => set({ mode }),
  handleCharacter: (key) => {
    const { engine } = get();
    if (!engine) return;
    engine.handleCharacter(key);

    set(syncState(engine));
  },
  handleBackspace: () => {
    const { engine } = get();
    if (!engine) return;
    engine.handleBackspace();

    set(syncState(engine));
  },
  start: () => {
    const { engine } = get();
    if (!engine) return;

    engine.start();

    set(syncState(engine));
  },
  reset: () => {
    const { mode } = get();

    // create new engine instance
    const newEngine = getEngineFromMode(mode);

    set({
      engine: newEngine,
      ...syncState(newEngine),
    });
  },
  tick: () => {
    const { engine } = get();
    if (!engine) return;
    if (get().mode !== "timed") return;

    engine.checkTime();

    set(syncState(engine));
  },
}));
