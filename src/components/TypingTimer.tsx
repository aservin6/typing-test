import { useEffect } from "react";
import { useTypingStore } from "../store/useTypingStore";

export default function TypingTimer() {
  const { tick, state, elapsedTime, timeLimit } = useTypingStore();
  const remainingTime = timeLimit - elapsedTime;

  useEffect(() => {
    const interval = setInterval(() => {
      tick();
    }, 250);

    return () => clearInterval(interval);
  }, [tick]);

  return (
    <>
      {state?.status === "running" && (
        <div className="absolute -top-full text-red-300 text-3xl left-0">
          {Math.floor(remainingTime / 1000)}
        </div>
      )}
    </>
  );
}
