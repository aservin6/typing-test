export function ModeSelect({
  onChange,
  mode,
}: {
  onChange(mode: string): void;
  mode: string;
}) {
  return (
    <div className="flex items-center space-x-3 *:p-2.5 *:font-bold *:uppercase *:text-white *:rounded-lg">
      <button
        onClick={() => onChange("standard")}
        className={`bg-blue-400 ${mode === "standard" && "select-none opacity-50"}`}
      >
        Standard
      </button>

      <button
        onClick={() => onChange("timed")}
        className={`bg-blue-400 ${mode === "timed" && "select-none opacity-50"}`}
      >
        Timed
      </button>
      <button
        onClick={() => onChange("strict")}
        className={`bg-blue-400 ${mode === "strict" && "select-none opacity-50"}`}
      >
        Strict
      </button>
    </div>
  );
}
