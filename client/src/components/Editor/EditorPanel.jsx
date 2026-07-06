import Editor from "@monaco-editor/react";

import { Copy, RotateCw, Plus, Minus } from "lucide-react";

import { SNIPPETS } from "../../constants/snippets";

export default function EditorPanel({
  activeTheme,
  language,
  LANGUAGES,
  problemName,
  fontSize,
  setFontSize,
  showSnippets,
  setShowSnippets,
  insertSnippet,
  copyCode,
  copied,
  resetToDefaultCode,
  code,
  setCode,
  handleEditorWillMount,
}) {
  return (
    <div className="flex-1 h-full flex flex-col bg-[#0b0c10] min-w-0">
      <div
        className={`h-9 px-5 flex items-center justify-between bg-black/5 border-b ${activeTheme.border} relative z-10`}
      >
        <span className="font-semibold text-[11px] text-slate-400 tracking-wider geist-mono-500">
          {problemName}.{LANGUAGES[language].ext}
        </span>
        <div className="flex h-10 items-center gap-1.5 relative">
          <button
            onClick={() => setFontSize((f) => Math.max(10, f - 1))}
            className="w-6 h-6 flex items-center justify-center rounded text-[11px] font-bold border border-[#22263b] bg-[#171929] hover:bg-[#22263b] text-slate-300 cursor-pointer"
            title="Zoom out"
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="text-[10px] text-slate-400 font-mono w-6 text-center">
            {fontSize}
          </span>
          <button
            onClick={() => setFontSize((f) => Math.min(28, f + 1))}
            className="w-6 h-6 flex items-center justify-center rounded font-extrabold border border-[#22263b] bg-[#171929] hover:bg-[#22263b] text-slate-300 cursor-pointer"
            title="Zoom in"
          >
            <Plus className="w-3 h-3" />
          </button>

          {language === "cpp" && (
            <div className="relative">
              <button
                onClick={() => setShowSnippets((s) => !s)}
                className="px-2 h-6 rounded text-[11px] font-semibold border border-[#22263b] bg-[#171929] hover:bg-[#22263b] text-slate-300 cursor-pointer"
              >
                Snippets ▾
              </button>
              {showSnippets && (
                <div className="absolute right-0 top-7 w-44 rounded-lg border border-[#22263b] bg-[#12141f] shadow-2xl z-30 overflow-hidden">
                  {Object.keys(SNIPPETS).map((name) => (
                    <button
                      key={name}
                      onClick={() => insertSnippet(name)}
                      className="w-full text-left px-3 py-2 text-[11px] text-slate-300 hover:bg-[#1c1f33] cursor-pointer"
                    >
                      {name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <button
            onClick={copyCode}
            className="px-2 h-6 flex items-center gap-1.5 rounded text-[11px] font-semibold border border-[#22263b] bg-[#171929] hover:bg-[#22263b] text-slate-300 cursor-pointer transition-colors"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>{copied ? "Copied" : "Copy"}</span>
          </button>
          <button
            onClick={resetToDefaultCode}
            title="Reset to your saved template (or the built-in boilerplate)"
            className="px-2 h-6 rounded text-[11px] font-semibold border border-[#22263b] bg-[#171929] hover:bg-[#22263b] text-slate-300 cursor-pointer"
          >
            <RotateCw className="w-3 h-3" />
          </button>
        </div>
      </div>
      <div className="flex-1 relative">
        <Editor
          height="100%"
          language={LANGUAGES[language].monacoId}
          theme={activeTheme.monaco}
          value={code}
          beforeMount={handleEditorWillMount}
          onChange={(val) => setCode(val)}
          options={{
            fontFamily: 'Geist Mono, Menlo, Monaco, "Courier New", monospace',
            fontSize,
            lineHeight: 22,
            minimap: { enabled: false },
            automaticLayout: true,
            padding: { top: 16, bottom: 16 },
            cursorBlinking: "smooth",
            renderLineHighlight: "all",
            scrollbar: {
              verticalScrollbarSize: 0,
              horizontalScrollbarSize: 0,
            },
            letterSpacing: 0.1,
          }}
        />
      </div>
    </div>
  );
}
