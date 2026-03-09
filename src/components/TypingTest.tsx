import { ModeSelect } from "./ModeSelect";
import { useTypingStore } from "../store/useTypingStore";
import TypingContainer from "./TypingContainer";
import TypingTimer from "./TypingTimer";

export function TypingTest() {
  const { engine, state, mode, handleCharacter, handleBackspace } =
    useTypingStore();

  function handleInput(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (!engine) return;
    if (
      e.ctrlKey ||
      e.altKey ||
      e.metaKey ||
      e.shiftKey ||
      e.key === "Escape"
    ) {
      return;
    }

    if (e.key === "Backspace") {
      handleBackspace();
    } else if (e.key.length === 1) {
      // Only accept printable characters
      handleCharacter(e.key);
    }
  }

  return (
    <div className="min-h-screen bg-neutral-800 font-mono flex flex-col items-center justify-center gap-8">
      {/* Typing Area */}
      <div className="relative font-bold">
        <TypingTimer />
        {/* Hidden textarea */}
        <textarea
          onKeyDown={handleInput}
          className="absolute inset-0 opacity-0 z-50"
          autoFocus
        />
        <TypingContainer />
      </div>

      {/* Debug Info */}
      <div className="text-red-400 font-bold text-xl">
        status: {state?.status}
      </div>

      <div className="text-red-400 font-bold text-xl">mode: {mode}</div>

      <ModeSelect />
    </div>
  );
}
