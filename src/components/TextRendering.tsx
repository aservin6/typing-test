import type { TypingEngine } from "../core/engine/TypingEngine";
import transformText from "../utils/transform-text";

export default function TextRendering({
  engine,
  text,
}: {
  engine: TypingEngine;
  text: string;
}) {
  let globalIndex = 0;
  const textArray = transformText(text);
  return (
    <div>
      {/* Rendered Text */}
      <div className="flex flex-wrap max-w-5xl text-3xl break-keep whitespace-break-spaces font-semibold leading-relaxed tracking-wider custom-font">
        {textArray.map((item, itemIndex) => {
          // SPACE
          if (item.type === "space") {
            const index = globalIndex++;
            const isCurrent = index === engine.getCurrentIndex();

            return (
              <span
                key={`space-${itemIndex}`}
                className={`relative inline-block w-3`}
              >
                {" "}
                {isCurrent && (
                  <span className="absolute left-0 top-0 w-0.5 h-full bg-white animate-pulse" />
                )}
              </span>
            );
          }

          // WORD
          if (item.type === "word") {
            return (
              <div key={`word-${item.wordIndex}`} className="inline-flex">
                {item.characters?.map((char, charIndex) => {
                  const index = globalIndex++;

                  const charState = engine.getCharState(index);
                  const isCurrent = index === engine.getCurrentIndex();

                  const colorClass =
                    charState === "correct"
                      ? "text-white"
                      : charState === "incorrect"
                        ? "text-red-400"
                        : "text-neutral-400";

                  return (
                    <span
                      key={`char-${item.wordIndex}-${charIndex}`}
                      className={`relative ${colorClass}`}
                    >
                      {char}

                      {isCurrent && (
                        <span className="absolute left-0 top-0 w-0.5 h-full bg-white animate-pulse" />
                      )}
                    </span>
                  );
                })}
              </div>
            );
          }

          return null;
        })}{" "}
      </div>
    </div>
  );
}
