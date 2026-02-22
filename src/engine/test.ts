import { TypingEngine } from "./engine";

const engine = new TypingEngine("hello");

console.log(engine.getState());
engine.handleCharacter("h");
engine.handleCharacter("e");
engine.handleCharacter("l");
engine.handleCharacter("l");
engine.handleCharacter("o");
console.log(engine.getState());
