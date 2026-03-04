import type { TransformedText } from "../types/types";

export default function transformText(text: string) {
  let textArray: TransformedText[] = [];
  let wordIndex = 0;
  let characters: string[] = [];
  const splitText = text.split("");

  splitText.forEach((char, index) => {
    if (char === " ") {
      textArray.push({ type: "space" });
      wordIndex++;
      characters = [];
    } else {
      characters.push(char);
      if (splitText.at(index + 1) === " " || splitText.length === index + 1) {
        textArray.push({ type: "word", characters, wordIndex });
      }
    }
  });
  return textArray;
}
