import { Copy, X } from "lucide-react";

export default function CompilerErrorModal({ open, compilerError, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60">
      <div className="w-[850px] max-w-[90vw] max-h-[80vh] bg-[#111111] rounded-xl border border-red-500/30 shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-red-500/20">
          <h2 className="text-red-400 text-lg font-bold">Compilation Error</h2>

          <div className="flex gap-2">
            <button
              onClick={() => navigator.clipboard.writeText(compilerError)}
              className="px-3 py-1 rounded bg-slate-700 hover:bg-slate-600 text-sm cursor-pointer flex items-center gap-2"
            >
              <Copy className="w-4 h-4" />
              Copy
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded hover:bg-slate-700 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-5 overflow-auto max-h-[60vh]">
          <pre className="font-mono text-sm text-red-300 whitespace-pre-wrap">
            {compilerError}
          </pre>
        </div>
      </div>
    </div>
  );
}
