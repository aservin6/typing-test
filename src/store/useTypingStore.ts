import { create } from "zustand";
import type { TypingEngine } from "../core/engine/TypingEngine";
import type { EngineState } from "../core/engine/types";

type TypingStore = {
  engine: TypingEngine;
  state: EngineState;
  mode: string;
  createEngine: () => void;
  setMode: (mode: string) => void;
  handleInput: (input: string) => void;
  start: () => void;
  reset: () => void;
};

const useTypingStore = create((set) => {});
