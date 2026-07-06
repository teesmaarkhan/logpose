import { Play, Trash, LoaderCircle } from "lucide-react";

export default function Sidebar({

    activeTheme,
    accent,

    sidebarWidth,

    activeTab,
    setActiveTab,

    testCases,
    runResults,

    passCount,

    showAddCase,
    setShowAddCase,

    runningCode,

    newInput,
    setNewInput,

    newOutput,
    setNewOutput,

    addCustomCase,

    removeCase,

    runSingleCase,

    runningIdx,

    fastest,
    slowest,
    peakMem,

    diffLines,
    openDiff,

}) {

    return (
      <div
        style={{ width: sidebarWidth }}
        className={`h-full flex flex-col border-l ${activeTheme.border} ${activeTheme.sidebar} transition-colors duration-300 shrink-0`}
      >
        <div
          className={`h-11 px-4 flex items-center justify-between border-b ${activeTheme.border} bg-black/5 shrink-0`}
        >
          <div className="flex bg-slate-500/5 p-0.5 rounded-lg border border-slate-500/10">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-3 py-1 font-semibold rounded-md text-[11px] transition-all cursor-pointer ${
                activeTab === "all"
                  ? activeTheme.isLight
                    ? "bg-white text-slate-800 border border-slate-200 shadow-sm"
                    : "bg-[#1c1f33] text-white border border-[#2b304d]"
                  : "text-slate-400 hover:text-slate-300"
              }`}
            >
              {testCases.length === 1 ? "Testcase" : "Testcases"} (
              {testCases.length})
            </button>
            {runResults.length > 0 && (
              <button
                onClick={() => setActiveTab("failed")}
                className={`px-3 py-1 font-semibold rounded-md text-[11px] transition-all cursor-pointer ${
                  activeTab === "failed"
                    ? "bg-red-500/10 text-red-500 border border-red-500/20"
                    : "text-slate-400 hover:text-red-400"
                }`}
              >
                {runResults.length - passCount} Failures
              </button>
            )}
          </div>
          <button
            onClick={() => setShowAddCase((s) => !s)}
            disabled={runningCode || testCases.length === 0}
            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold border transition-all cursor-pointer ${activeTheme.border} ${activeTheme.isLight ? "bg-slate-100 hover:bg-slate-200 text-slate-700" : "bg-[#171929] hover:bg-[#22263b] text-slate-300"} disabled:bg-[#151726] disabled:text-slate-500 
              disabled:shadow-none disabled:pointer-events-none`}
          >
            + New Testcase
          </button>
        </div>

        {showAddCase && (
          <div
            className={`m-4 mb-0 p-3 rounded-xl ${activeTheme.cardBg} border ${activeTheme.border} space-y-2 shrink-0`}
          >
            <textarea
              value={newInput}
              onChange={(e) => setNewInput(e.target.value)}
              placeholder="Input"
              rows={2}
              className={`w-full rounded-lg border px-2 py-1.5 text-[11px] font-mono outline-none resize-none ${activeTheme.inputBg} ${activeTheme.border} ${activeTheme.isLight ? "text-slate-700" : "text-slate-200"}`}
            />
            <textarea
              value={newOutput}
              onChange={(e) => setNewOutput(e.target.value)}
              placeholder="Expected output (optional)"
              rows={2}
              className={`w-full rounded-lg border px-2 py-1.5 text-[11px] font-mono outline-none resize-none ${activeTheme.inputBg} ${activeTheme.border} ${activeTheme.isLight ? "text-slate-700" : "text-slate-200"}`}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowAddCase(false)}
                className="px-3 py-1 rounded-md text-[11px] font-semibold text-slate-400 hover:text-slate-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={addCustomCase}
                className="px-3 py-1 rounded-md text-[11px] font-semibold text-white cursor-pointer bg-[#059669] hover:bg-[#058569]/90 border border-[#25283f] transition-all"
              >
                Add case
              </button>
            </div>
          </div>
        )}

        {testCases.length > 0 && (
          <div
            className={`m-4 p-4 rounded-xl ${activeTheme.cardBg} flex flex-col gap-2.5 shrink-0 transition-all`}
          >
            <div className="flex items-center justify-between text-[11px] font-medium">
              <span className="text-slate-400 uppercase tracking-wider font-semibold text-[10px]">
                Verdict Overview
              </span>
              <span
                className={`font-bold ${runResults.length > 0 ? (passCount === testCases.length ? "text-emerald-500" : "text-amber-400") : "text-slate-400"}`}
              >
                {runResults.length > 0
                  ? `${passCount} of ${testCases.length} Passed (${Math.round((passCount / testCases.length) * 100)}%)`
                  : `${testCases.length} cases sync'd`}
              </span>
            </div>
            <div
              className={`w-full ${activeTheme.isLight ? "bg-slate-100" : "bg-slate-950"} h-2 rounded-full overflow-hidden p-[2px] border ${activeTheme.border}`}
            >
              <div
                className={`bg-gradient-to-r ${accent.bar} h-full rounded-full transition-all duration-500`}
                style={{
                  width:
                    testCases.length > 0
                      ? `${(passCount / testCases.length) * 100}%`
                      : "0%",
                }}
              ></div>
            </div>
            {runResults.length > 0 && (
              <div className="flex items-center gap-4 text-[10px] font-mono text-slate-400 pt-1 border-t border-slate-500/10">
                <span>⚡ fastest {fastest ?? "—"}s</span>
                <span>🐢 slowest {slowest ?? "—"}s</span>
                <span>📦 peak {peakMem ?? "—"} KB</span>
              </div>
            )}
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4">
          {testCases.length === 0 ? (
            <div
              className={`h-52 flex flex-col items-center justify-center text-center text-slate-400 p-6 border-2 border-dashed ${activeTheme.border} rounded-xl bg-black/5`}
            >
              <span className="text-2xl mb-2">📥</span>
              <p className="text-[12px] font-medium max-w-[220px] leading-relaxed">
                Paste a Codeforces problem link above, or add your own case, to
                stream testcases down instantly.
              </p>
            </div>
          ) : (
            testCases.map((tc, idx) => {
              const result = runResults[idx];
              if (activeTab === "failed" && result?.status === "Accepted")
                return null;

              let badgeColor =
                "text-slate-400 bg-slate-500/10 border-slate-500/20";
              let outputRowStyle = "text-slate-600 dark:text-slate-300";
              let metricTextColor = "text-slate-400";

              if (result?.status === "Accepted") {
                badgeColor =
                  "text-emerald-600 bg-emerald-500/10 border-emerald-500/20";
                outputRowStyle =
                  "text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/[0.02]";
                metricTextColor = "text-emerald-500/70";
              } else if (result?.status === "TLE" || result?.status === "MLE") {
                badgeColor =
                  "text-amber-500 bg-amber-500/10 border-amber-500/20";
                outputRowStyle =
                  "text-amber-500 dark:text-amber-400 font-bold bg-amber-500/[0.02]";
                metricTextColor = "text-amber-500/70";
              } else if (result) {
                badgeColor = "text-rose-500 bg-rose-500/10 border-rose-500/20";
                outputRowStyle =
                  "text-rose-600 dark:text-rose-400 font-bold bg-rose-500/[0.02]";
                metricTextColor = "text-rose-500/70";
              }

              const diffOpen = !!openDiff[idx];
              const rows = diffOpen ? diffLines(tc.output, result?.stdout) : [];

              return (
                <div
                  key={idx}
                  className={`rounded-xl ${activeTheme.cardBg} border ${activeTheme.border} overflow-hidden shadow-sm transition-all duration-200 hover:scale-[1.005]`}
                >
                  <div
                    className={`flex justify-between items-center px-4 py-3 ${activeTheme.cardHeader} border-b ${activeTheme.border}`}
                  >
                    <span className="font-bold text-slate-400 text-[11px] font-mono flex items-center gap-2">
                      Case 0{idx + 1}
                      {tc.custom && (
                        <span className="text-[8px] px-1.5 py-0.5 rounded bg-slate-500/10 border border-slate-500/20 uppercase tracking-wider">
                          custom
                        </span>
                      )}
                    </span>
                    <div className="flex items-center gap-3">
                      {result && (
                        <span
                          className={`text-[10px] font-semibold font-mono ${metricTextColor}`}
                        >
                          {result.time}s • {result.memory} KB
                        </span>
                      )}
                      {result && (
                        <span
                          className={`text-[9px] px-2.5 py-0.5 rounded-md border font-bold uppercase tracking-wider ${badgeColor}`}
                        >
                          {result.status}
                        </span>
                      )}
                      <button
                        onClick={() => runSingleCase(idx)}
                        disabled={runningIdx === idx}
                        title="Run just this case"
                        className="w-6 h-6 flex items-center justify-center rounded text-emerald-400 hover:bg-emerald-500/10 cursor-pointer disabled:opacity-40"
                      >
                        {runningIdx === idx ? (
                          <LoaderCircle className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Play className="w-3.5 h-3.5 fill-current" />
                        )}
                      </button>
                      {tc.custom && (
                        <button
                          onClick={() => removeCase(idx)}
                          className="text-[9px] px-1.5 py-0.5  text-rose-400 font-bold cursor-pointer"
                        >
                          <Trash className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="divide-y divide-slate-500/10">
                    <div
                      className={`flex items-start px-4 py-3 ${activeTheme.rowEven} group`}
                    >
                      <span className="w-20 text-[10px] text-slate-400 font-bold uppercase tracking-wider pt-0.5 flex items-center gap-1.5">
                        Input
                      </span>
                      <pre className="flex-1 text-slate-600 dark:text-slate-300 whitespace-pre-wrap font-mono leading-relaxed">
                        {tc.input}
                      </pre>
                    </div>

                    <div
                      className={`flex items-start px-4 py-3 ${activeTheme.rowOdd} group`}
                    >
                      <span className="w-20 text-[10px] text-slate-400 font-bold uppercase tracking-wider pt-0.5 flex items-center gap-1.5">
                        Target
                      </span>
                      <pre className="flex-1 text-slate-500 dark:text-slate-400 whitespace-pre-wrap font-mono leading-relaxed">
                        {tc.output || (
                          <span className="italic opacity-50">(none set)</span>
                        )}
                      </pre>
                    </div>

                    {result && (
                      <div
                        className={`flex items-start px-4 py-3 ${outputRowStyle} border-t ${activeTheme.border}`}
                      >
                        <span className="w-20 text-[10px] text-slate-400 font-bold uppercase tracking-wider pt-0.5">
                          Return
                        </span>
                        <pre className="flex-1 whitespace-pre-wrap font-mono leading-relaxed">
                          {result.stdout ||
                            result.stderr ||
                            "No bytes written to console."}
                        </pre>
                      </div>
                    )}

                    {diffOpen && (
                      <div className="px-4 py-3 space-y-1 bg-black/10">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                          Diff — target vs return
                        </span>
                        {rows.map((r, i) => (
                          <div
                            key={i}
                            className="grid grid-cols-2 gap-2 font-mono text-[10.5px]"
                          >
                            <pre
                              className={`px-2 py-0.5 rounded ${r.match ? "text-slate-400" : "bg-rose-500/10 text-rose-400"}`}
                            >
                              {r.e || "·"}
                            </pre>
                            <pre
                              className={`px-2 py-0.5 rounded ${r.match ? "text-slate-400" : "bg-emerald-500/10 text-emerald-400"}`}
                            >
                              {r.a || "·"}
                            </pre>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    );

}