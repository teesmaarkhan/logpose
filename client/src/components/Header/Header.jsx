import {
  Download,
  Import,
  ChevronDown,
  Check,
  TimerIcon,
  Play,
  Pause,
  LoaderCircle,
  RotateCcw,
  Gauge,
  Terminal,
} from "lucide-react";
import { formatClock } from "../../utils/formatClock";
import LimitsModal from "../Modals/LimitsModal";
const brandIcon =
  "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/copyq.png";

export default function Header({
  activeTheme,
  accent,

  cfUrl,
  setCfUrl,

  fetchCases,
  loading,

  language,
  setLanguage,

  timerSeconds,
  timerRunning,

  toggleTimer,
  resetTimer,

  error,

  showLimits,
  setShowLimits,

  limits,
  setLimits,

  showScratch,
  setShowScratch,

  showShortcuts,
  setShowShortcuts,

  runningCode,

  executeCodeHandler,

  testCases,

  downloadCode,

  isDownloaded,

  LANGUAGES,
}) {
  return (
    <>
      <header
        className={`flex items-center justify-between px-6 h-14 ${activeTheme.sidebar} border-b ${activeTheme.border} relative z-30 shadow-[0_2px_20px_rgba(0,0,0,0.05)] transition-colors duration-300`}
      >
        <div className="flex items-center gap-5 w-full overflow-x-auto">
          <div className="flex items-center h-7 shrink-0">
            <img
              src={brandIcon}
              alt="Profile"
              className="h-8 w-8 object-cover shadow-sm"
            />
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <input
              type="text"
              placeholder="Paste Codeforces Problem URL here..."
              value={cfUrl}
              onChange={(e) => setCfUrl(e.target.value)}
              className={`px-4 py-2 w-[380px] border ${activeTheme.inputBg} ${activeTheme.border} ${activeTheme.focusRing} ${activeTheme.isLight ? "text-slate-800" : "text-white"} font-sans text-[12px] outline-none placeholder-slate-400 transition-all shadow-sm`}
            />
            <button
              onClick={fetchCases}
              disabled={loading}
              className="px-4 h-9 font-semibold text-[12px] tracking-wide border transition-all 
    active:scale-[0.98] cursor-pointer bg-[#1b1e30] hover:bg-[#23273e] text-slate-200 
    border-[#2b304d] disabled:opacity-40 flex items-center justify-center gap-1.5"
            >
              {loading ? (
                <>
                  <LoaderCircle className="w-4 h-4 animate-spin" />
                  <span>Syncing...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Get Testcases</span>
                </>
              )}
            </button>
          </div>

          <div className="relative inline-flex items-center">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className={`h-9 pl-3 pr-8 border font-semibold text-[12px] rounded-lg outline-none cursor-pointer appearance-none transition-all duration-200 shadow-sm min-w-[130px] ${activeTheme.inputBg} ${activeTheme.border} ${
                activeTheme.isLight
                  ? "text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-400 focus:border-indigo-500"
                  : "text-slate-200 bg-[#131520]/80 hover:bg-[#1a1d30] hover:border-[#313754] focus:border-indigo-500"
              }`}
            >
              {Object.entries(LANGUAGES).map(([key, l]) => (
                <option
                  key={key}
                  value={key}
                  className={
                    activeTheme.isLight
                      ? "bg-white text-slate-800"
                      : "bg-[#141625] text-slate-200"
                  }
                >
                  {l.label}
                </option>
              ))}
            </select>
            <div
              className={`absolute right-2.5 pointer-events-none opacity-50 ${activeTheme.isLight ? "text-slate-600" : "text-slate-400"}`}
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </div>
          </div>

          <div
            className={`flex items-center gap-2 h-9 px-2.5 border rounded-lg shrink-0 whitespace-nowrap ${activeTheme.inputBg} ${activeTheme.border}`}
          >
            <TimerIcon className="w-3.5 h-3.5 text-slate-400 shrink-0" />

            <span className="font-mono font-semibold text-[12px] text-slate-200 tabular-nums min-w-[48px] text-center select-none shrink-0">
              {formatClock(timerSeconds)}
            </span>

            <div className="flex items-center gap-0.5 shrink-0">
              <button
                onClick={() => toggleTimer()}
                title={timerRunning ? "Pause timer" : "Start timer"}
                className="w-5 h-5 flex items-center justify-center rounded hover:bg-white/10 text-slate-300 cursor-pointer transition-colors shrink-0"
              >
                {timerRunning ? (
                  <Pause className="w-3 h-3" />
                ) : (
                  <Play className="w-3 h-3" />
                )}
              </button>

              <button
                onClick={() => {
                  resetTimer();
                }}
                title="Reset timer"
                className="w-5 h-5 flex items-center justify-center rounded hover:bg-white/10 text-slate-300 cursor-pointer transition-colors shrink-0"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>
          </div>

          {error && (
            <span className="shrink-0 text-red-500 font-medium bg-red-500/5 px-3 py-1.5 rounded-lg border border-red-500/10 text-[11px]">
              {error}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0 pl-4">
          <div className="relative">
            <button
              onClick={() => setShowLimits((s) => !s)}
              title="Time / memory limits"
              className={`h-8 w-8 flex items-center justify-center border transition-all cursor-pointer ${activeTheme.border} ${activeTheme.inputBg} ${activeTheme.isLight ? "text-slate-600" : "text-slate-300"}`}
            >
              <Gauge className="w-4 h-4" />
            </button>
            <LimitsModal
              show={showLimits}
              activeTheme={activeTheme}
              limits={limits}
              setLimits={setLimits}
            />
          </div>

          <button
            onClick={() => setShowScratch((s) => !s)}
            title="Custom quick-run"
            className={`h-8 w-8 flex items-center justify-center border transition-all cursor-pointer ${activeTheme.border} ${activeTheme.inputBg} ${activeTheme.isLight ? "text-slate-600" : "text-slate-300"}`}
          >
            <Terminal className="w-4 h-4" />
          </button>

          <button
            onClick={() => setShowShortcuts((s) => !s)}
            title="Keyboard shortcuts"
            className={`h-8  w-8 flex items-center justify-center border font-bold text-[13px] transition-all cursor-pointer ${activeTheme.border} ${activeTheme.inputBg} ${activeTheme.isLight ? "text-slate-600" : "text-slate-300"}`}
          >
            ⌘
          </button>

          <button
            onClick={executeCodeHandler}
            disabled={runningCode || testCases.length === 0}
            className={`px-3 h-8 text-[13px] border font-semibold tracking-wide transition-all 
    duration-300 flex items-center gap-1.5 cursor-pointer disabled:bg-[#151726] disabled:text-slate-500 
    disabled:shadow-none disabled:pointer-events-none
    bg-[#059669] hover:bg-[#058569]/90 border-[#25283f] text-slate-200 shadow-lg`}
          >
            {runningCode ? (
              <LoaderCircle className="w-4 h-4 animate-spin" />
            ) : (
              <Play className="w-4 h-4 fill-current" />
            )}
            <span>{runningCode ? "Running" : "Run"}</span>
          </button>

          <button
            onClick={downloadCode}
            disabled={isDownloaded}
            className={`px-3 h-8 text-[11px] border font-semibold tracking-wide transition-all duration-300 
    flex items-center gap-1.5 cursor-pointer shadow-lg select-none
    ${
      isDownloaded
        ? "bg-emerald-600/20 border-emerald-500/40 text-emerald-400"
        : "bg-[#151726] hover:bg-[#1c1f33] border-[#25283f] text-slate-200"
    }`}
          >
            {isDownloaded ? (
              <>
                <Check className="w-4 h-4 text-emerald-400 animate-in zoom-in duration-200" />
                <span className="animate-in fade-in duration-200">Saved</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Save</span>
              </>
            )}
          </button>
        </div>

        {showShortcuts && (
          <div
            className={`absolute top-16 right-6 w-64 rounded-xl border ${activeTheme.border} ${activeTheme.cardBg} shadow-2xl p-4 z-40 text-[11px] space-y-2`}
          >
            <p className="font-bold text-[10px] uppercase tracking-wider text-slate-400 mb-1">
              Keyboard Shortcuts
            </p>
            {[
              ["Run testcases", "⌘  + Enter"],
              ["Reset editor", "⌘  + Shift + K"],
              ["Zoom in / out", "⌘ + = / -"],
            ].map(([label, keys]) => (
              <div key={label} className="flex items-center justify-between">
                <span className="text-slate-400">{label}</span>
                <span className={`font-mono font-semibold ${accent.text}`}>
                  {keys}
                </span>
              </div>
            ))}
          </div>
        )}
      </header>
    </>
  );
}
