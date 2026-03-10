import { useEffect } from "react";
import { getEngineFromMode } from "../utils/get-engine-from-mode";
import { useTypingStore } from "../store/useTypingStore";

export function useCreateEngine() {
  const createEngine = useTypingStore((s) => s.createEngine);
  const mode = useTypingStore((s) => s.mode);

  useEffect(() => {
    createEngine(getEngineFromMode(mode));
  }, [mode, createEngine]);
}
