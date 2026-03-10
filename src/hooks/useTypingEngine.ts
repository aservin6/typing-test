import { useTypingStore } from "../store/useTypingStore";

export function useTypingEngine() {
  const state = useTypingStore((s) => s.state);
  const elapsedTime = useTypingStore((s) => s.elapsedTime);
  const mode = useTypingStore((s) => s.mode);
  const timeLimit = useTypingStore((s) => s.timeLimit);

  const handleCharacter = useTypingStore((s) => s.handleCharacter);
  const handleBackspace = useTypingStore((s) => s.handleBackspace);
  const setMode = useTypingStore((s) => s.setMode);
  const setTimeLimit = useTypingStore((s) => s.setTimeLimit);

  const start = useTypingStore((s) => s.start);
  const reset = useTypingStore((s) => s.reset);
  const tick = useTypingStore((s) => s.tick);

  return {
    state,
    elapsedTime,
    mode,
    timeLimit,
    setMode,
    setTimeLimit,
    handleCharacter,
    handleBackspace,
    start,
    reset,
    tick,
  };
}
