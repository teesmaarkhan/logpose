import { Gauge } from "lucide-react";

export default function LimitsModal({ show, activeTheme, limits, setLimits }) {
  if (!show) return null;

  return (
    <div
      className={`absolute top-10 right-0 w-56 rounded-xl border ${activeTheme.border} ${activeTheme.cardBg} shadow-2xl p-4 z-40 space-y-3`}
    >
      <p className="font-bold text-[10px] uppercase tracking-wider text-slate-400">
        Problem Limits
      </p>

      <label className="flex items-center justify-between gap-2 text-[11px] text-slate-300">
        Time limit
        <input
          type="number"
          value={limits.timeLimit}
          min={1}
          step={0.5}
          onChange={(e) =>
            setLimits((prev) => ({
              ...prev,
              timeLimit: Number(e.target.value),
            }))
          }
          className={`w-20 px-2 py-1 rounded border text-[11px] font-mono outline-none ${activeTheme.inputBg} ${activeTheme.border}`}
        />
      </label>

      <label className="flex items-center justify-between gap-2 text-[11px] text-slate-300">
        Memory
        <input
          type="number"
          value={limits.memLimit}
          min={4}
          step={16}
          onChange={(e) =>
            setLimits((prev) => ({
              ...prev,
              memLimit: Number(e.target.value),
            }))
          }
          className={`w-20 px-2 py-1 rounded border text-[11px] font-mono outline-none ${activeTheme.inputBg} ${activeTheme.border}`}
        />
      </label>

      <p className="text-[10px] text-slate-500">
        Accepted runs over these limits become TLE / MLE.
      </p>
    </div>
  );
}
