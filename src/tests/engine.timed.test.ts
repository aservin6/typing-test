import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { TypingEngine } from "../engine/engine";
import * as scoring from "../engine/scoring.ts";

describe("TypingEngine - Timed Mode", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.spyOn(Date, "now").mockImplementation(() => 0);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it("starts timer on first character input", () => {
    const engine = new TypingEngine("hello");
    engine.getState().mode = "timed";

    engine.handleCharacter("h");

    const state = engine.getState();

    expect(state.status).toBe("running");
    expect(state.startTime).not.toBeNull();
  });

  it("finishes when time limit is reached", () => {
    const engine = new TypingEngine("hello world");
    engine.getState().mode = "timed";

    engine.handleCharacter("h");

    // simulate 30 seconds passing
    vi.spyOn(scoring, "getElapsedTime").mockReturnValue(30000);

    engine.checkTime();

    const state = engine.getState();

    expect(state.status).toBe("finished");
    expect(state.endTime).not.toBeNull();
  });

  it("does not finish before time limit", () => {
    const engine = new TypingEngine("hello world");
    engine.getState().mode = "timed";

    engine.handleCharacter("h");

    vi.spyOn(scoring, "getElapsedTime").mockReturnValue(29000);

    engine.checkTime();

    expect(engine.getState().status).toBe("running");
  });

  it("does not allow input after time expires", () => {
    const engine = new TypingEngine("hello");
    engine.getState().mode = "timed";

    engine.handleCharacter("h");

    vi.spyOn(scoring, "getElapsedTime").mockReturnValue(30000);

    engine.checkTime();

    engine.handleCharacter("e");

    expect(engine.getState().typedCharacters.length).toBe(1);
  });
});
