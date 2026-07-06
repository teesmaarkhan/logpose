import { LoaderCircle, Play, Terminal, X } from "lucide-react";

export default function ScratchRunner({
  show,
  onClose,

  activeTheme,

  scratchInput,
  setScratchInput,

  scratchRunning,
  runScratch,

  scratchError,

  scratchResult,
}) {
  if (!show) return null;

  return (
    <div
      className={`absolute top-25 left-20 w-[500px] border ${activeTheme.border} ${activeTheme.cardBg} shadow-2xl z-40 overflow-hidden`}
    >
      <div
        className={`flex items-center justify-between px-4 py-3 ${activeTheme.cardHeader} border-b ${activeTheme.border}`}
      >
        <span className="font-bold text-[11px] uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Terminal className="w-3.5 h-3.5" />
          Custom Quick-Run
        </span>

        <button
          onClick={onClose}
          className="w-6 h-6 flex items-center justify-center rounded hover:bg-white/10 text-slate-400 cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="p-4 space-y-2">
        <p className="text-[14px] text-slate-500">
          Run the current code against any stdin — no expected output needed.
          Great for sanity-checking edge cases.
        </p>

        <textarea
          rows={4}
          value={scratchInput}
          onChange={(e) => setScratchInput(e.target.value)}
          placeholder="stdin..."
          className={`w-full rounded-sm border px-2 py-1.5 text-[13px] font-mono outline-none resize-none ${activeTheme.inputBg} ${activeTheme.border} text-slate-200`}
        />

        <button
          disabled={scratchRunning}
          onClick={runScratch}
          className="w-full px-3 py-1.5 text-[11px] font-semibold text-white cursor-pointer bg-[#059669] hover:bg-[#058569]/90 border border-[#25283f] transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
        >
          {scratchRunning ? (
            <LoaderCircle className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Play className="w-3.5 h-3.5 fill-current" />
          )}

          <span className="text-[13px]">Run</span>
        </button>

        {scratchError && (
          <p className="text-[11px] text-rose-400 font-mono whitespace-pre-wrap">
            {scratchError}
          </p>
        )}

        {scratchResult && (
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
              <span>Output</span>

              <span>
                {scratchResult.time}s • {scratchResult.memory} KB
              </span>
            </div>

            <pre
              className={`text-[11px] font-mono whitespace-pre-wrap border px-2 py-1.5 max-h-50 overflow-auto ${activeTheme.inputBg} ${activeTheme.border} text-slate-200`}
            >
              {scratchResult.stdout ||
                scratchResult.stderr ||
                "No bytes written to console."}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
