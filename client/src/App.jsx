import { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import { LANGUAGES } from "./constants/languages";
import { SNIPPETS } from "./constants/snippets";
import { THEMES, ACCENT } from "./constants/themes";
import { diffLines } from "./utils/diffLines";
import { formatClock } from "./utils/formatClock";
import { handleEditorWillMount } from "./utils/monacoTheme";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useTimer } from "./hooks/useTimer";
import Confetti from "./components/Common/Confetti";
import CompilerErrorModal from "./components/Modals/CompilerErrorModal";
import ScratchRunner from "./components/Modals/ScratchRunner";
import LimitsModal from "./components/Modals/LimitsModal";
import Header from "./components/Header/Header";  
import EditorPanel from "./components/Editor/EditorPanel";
import Sidebar from "./components/Sidebar/Sidebar";
import {
  fetchTestCases,
  executeCode,
  executeSingleCase,
  executeScratch,
} from "./services/compilerApi";
import {
  Download,
  Import,
  ChevronDown,
  Check,
  Play,
  Pause,
  Trash,
  Copy,
  Plus,
  LoaderCircle,
  RotateCw,
  RotateCcw,
  X,
  Minus,
  Timer as TimerIcon,
  Gauge,
  Terminal,
} from "lucide-react";



function App() {
  const [themeKey] = useState("dracula");
  const [language, setLanguage] = useState("cpp");
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [problemName, setProblemName] = useState("mercury");
  const initialCode = {};

  Object.keys(LANGUAGES).forEach((lang) => {
    initialCode[lang] = LANGUAGES[lang].boilerplate;
  });

  const [codeByLang, setCodeByLang] = useLocalStorage(
    "editor-code",
    initialCode,
  );

const defaultTemplates = {};

Object.keys(LANGUAGES).forEach((k) => {
  defaultTemplates[k] = null;
});

const [customTemplates] = useLocalStorage("templates", defaultTemplates);

  const [cfUrl, setCfUrl] = useState("");
  const [testCases, setTestCases] = useState([]);
  const [runResults, setRunResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [runningCode, setRunningCode] = useState(false);
  const [runningIdx, setRunningIdx] = useState(null);
  const [error, setError] = useState("");
  const [compilerError, setCompilerError] = useState("");
  const [showCompilerError, setShowCompilerError] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  const [fontSize, setFontSize] = useState(16);
  const [sidebarWidth, setSidebarWidth] = useState(540);
  const [openDiff] = useState({});
  const [showAddCase, setShowAddCase] = useState(false);
  const [newInput, setNewInput] = useState("");
  const [newOutput, setNewOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showSnippets, setShowSnippets] = useState(false);

  const {
    seconds: timerSeconds,
    running: timerRunning,
    toggle: toggleTimer,
    reset: resetTimer,
    start: startTimer,
    pause: pauseTimer,
    setSeconds: setTimerSeconds,
    setRunning: setTimerRunning,
  } = useTimer();

  const [limits, setLimits] = useLocalStorage("limits", {
    timeLimit: 2,
    memLimit: 256,
  });
  const [showLimits, setShowLimits] = useState(false);

  const [showScratch, setShowScratch] = useState(false);
  const [scratchInput, setScratchInput] = useState("");
  const [scratchResult, setScratchResult] = useState(null);
  const [scratchRunning, setScratchRunning] = useState(false);
  const [scratchError, setScratchError] = useState("");

  const resizingRef = useRef(false);

  const activeTheme = THEMES[themeKey] || THEMES.dracula;
  const accent = ACCENT[activeTheme.accent];
  const code = codeByLang[language];
  const passCount = runResults.filter((r) => r.status === "Accepted").length;
  const allPassed =
    testCases.length > 0 &&
    runResults.length === testCases.length &&
    passCount === testCases.length;

  const setCode = (val) =>
    setCodeByLang((prev) => ({ ...prev, [language]: val ?? "" }));
  const resetToDefaultCode = () =>
    setCodeByLang((prev) => ({
      ...prev,
      [language]: customTemplates[language] || LANGUAGES[language].boilerplate,
    }));
  const insertSnippet = (name) => {
    setCodeByLang((prev) => ({
      ...prev,
      [language]: prev[language] + SNIPPETS[name],
    }));
    setShowSnippets(false);
  };
  const copyCode = () => {
    navigator.clipboard?.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  const downloadCode = () => {
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${problemName}.${LANGUAGES[language].ext}`;
    a.click();
    URL.revokeObjectURL(url);
    setIsDownloaded(true);
    setTimeout(() => setIsDownloaded(false), 2000);
  };

  const fetchCases = async () => {
    if (!cfUrl) return;

    setLoading(true);
    setError("");
    setRunResults([]);

    try {
      const data = await fetchTestCases(cfUrl);

      setTestCases(data.testCases);

      if (data.problemName) {
        setProblemName(data.problemName.replace(/[^a-zA-Z0-9_-]/g, "_"));
      }

      startTimer();
      setTimerSeconds(0);
    } catch (err) {
      setError(err.message);
      setTestCases([]);
    } finally {
      setLoading(false);
    }
  };

  const applyLimitVerdict = (result) => {
    if (!result) return result;
    const t = parseFloat(result.time);
    const m = parseFloat(result.memory);
    if (result.status === "Accepted") {
      if (!isNaN(t) && t > limits.timeLimit) {
        return { ...result, status: "TLE" };
      }
      if (!isNaN(m) && m > limits.memLimit * 1024) {
        return { ...result, status: "MLE" };
      }
    }
    return result;
  };

  const executeCodeHandler = async () => {
    if (!testCases.length) return;

    setRunningCode(true);

    setError("");

    setCompilerError("");

    setShowCompilerError(false);

    try {
      const data = await executeCode(code, testCases, language);

      setRunResults(data.results.map(applyLimitVerdict));
    } catch (err) {
      setCompilerError(err.message);

      setShowCompilerError(true);
    } finally {
      setRunningCode(false);
    }
  };

  const runSingleCase = async (idx) => {
    const tc = testCases[idx];

    if (!tc) return;

    setRunningIdx(idx);

    try {
      const data = await executeSingleCase(code, tc, language);

      const result = applyLimitVerdict(data.results[0]);

      setRunResults((prev) => {
        const next = [...prev];

        next[idx] = result;

        return next;
      });
    } catch (err) {
      setCompilerError(err.message);

      setShowCompilerError(true);
    } finally {
      setRunningIdx(null);
    }
  };

  const runScratch = async () => {
    setScratchRunning(true);

    setScratchError("");

    setScratchResult(null);

    try {
      const data = await executeScratch(code, scratchInput, language);

      setScratchResult(data.results[0]);
    } catch (err) {
      setScratchError(err.message);
    } finally {
      setScratchRunning(false);
    }
  };

  const addCustomCase = () => {
    if (!newInput.trim()) return;
    setTestCases((tc) => [
      ...tc,
      { input: newInput, output: newOutput, custom: true },
    ]);
    setNewInput("");
    setNewOutput("");
    setShowAddCase(false);
  };
  const removeCase = (idx) => {
    setTestCases((tc) => tc.filter((_, i) => i !== idx));
    setRunResults((rr) => rr.filter((_, i) => i !== idx));
  };

  useEffect(() => {
    if (allPassed) {
      setShowConfetti(true);
      pauseTimer();
      const t = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(t);
    }
  }, [allPassed]);

  useEffect(() => {
    const handler = (e) => {
      const mod = e.ctrlKey || e.metaKey;
      if (!mod) return;
      if (e.key === "Enter") {
        e.preventDefault();
        executeCode();
      } else if (e.shiftKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        resetToDefaultCode();
      } else if (e.key === "=" || e.key === "+") {
        e.preventDefault();
        setFontSize((f) => Math.min(28, f + 1));
      } else if (e.key === "-") {
        e.preventDefault();
        setFontSize((f) => Math.max(10, f - 1));
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  useEffect(() => {
    const onMove = (e) => {
      if (!resizingRef.current) return;
      const newWidth = window.innerWidth - e.clientX;
      setSidebarWidth(Math.min(760, Math.max(380, newWidth)));
    };
    const onUp = () => {
      resizingRef.current = false;
      document.body.style.cursor = "default";
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  const times = runResults
    .map((r) => parseFloat(r?.time))
    .filter((n) => !isNaN(n));
  const mems = runResults
    .map((r) => parseFloat(r?.memory))
    .filter((n) => !isNaN(n));
  const fastest = times.length ? Math.min(...times) : null;
  const slowest = times.length ? Math.max(...times) : null;
  const peakMem = mems.length ? Math.max(...mems) : null;

  return (
    <div
      className={`relative flex flex-col h-screen font-sans text-[12px] antialiased select-none tracking-normal overflow-hidden ${activeTheme.bg} ${activeTheme.text} transition-colors duration-300`}
    >
      {showConfetti && <Confetti />}
      <CompilerErrorModal
        open={showCompilerError}
        compilerError={compilerError}
        onClose={() => setShowCompilerError(false)}
      />

      <Header
        activeTheme={activeTheme}
        accent={accent}
        cfUrl={cfUrl}
        setCfUrl={setCfUrl}
        fetchCases={fetchCases}
        loading={loading}
        language={language}
        setLanguage={setLanguage}
        timerSeconds={timerSeconds}
        timerRunning={timerRunning}
        toggleTimer={toggleTimer}
        resetTimer={resetTimer}
        error={error}
        showLimits={showLimits}
        setShowLimits={setShowLimits}
        limits={limits}
        setLimits={setLimits}
        showScratch={showScratch}
        setShowScratch={setShowScratch}
        showShortcuts={showShortcuts}
        setShowShortcuts={setShowShortcuts}
        runningCode={runningCode}
        executeCodeHandler={executeCodeHandler}
        testCases={testCases}
        downloadCode={downloadCode}
        isDownloaded={isDownloaded}
        LANGUAGES={LANGUAGES}
      />

      <ScratchRunner
        show={showScratch}
        onClose={() => setShowScratch(false)}
        activeTheme={activeTheme}
        scratchInput={scratchInput}
        setScratchInput={setScratchInput}
        scratchRunning={scratchRunning}
        runScratch={runScratch}
        scratchError={scratchError}
        scratchResult={scratchResult}
      />

      <div className="flex flex-1 overflow-hidden relative z-10">
        <EditorPanel
          activeTheme={activeTheme}
          language={language}
          LANGUAGES={LANGUAGES}
          problemName={problemName}
          fontSize={fontSize}
          setFontSize={setFontSize}
          showSnippets={showSnippets}
          setShowSnippets={setShowSnippets}
          insertSnippet={insertSnippet}
          copyCode={copyCode}
          copied={copied}
          resetToDefaultCode={resetToDefaultCode}
          code={code}
          setCode={setCode}
          handleEditorWillMount={handleEditorWillMount}
        />
        <div
          onMouseDown={() => {
            resizingRef.current = true;
            document.body.style.cursor = "col-resize";
          }}
          className="w-[1px] shrink-0 h-full cursor-col-resize hover:bg-indigo-500/50 z-20"
        />
        
        <Sidebar
          activeTheme={activeTheme}
          accent={accent}
          sidebarWidth={sidebarWidth}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          testCases={testCases}
          runResults={runResults}
          passCount={passCount}
          showAddCase={showAddCase}
          setShowAddCase={setShowAddCase}
          runningCode={runningCode}
          newInput={newInput}
          setNewInput={setNewInput}
          newOutput={newOutput}
          setNewOutput={setNewOutput}
          addCustomCase={addCustomCase}
          removeCase={removeCase}
          runSingleCase={runSingleCase}
          runningIdx={runningIdx}
          fastest={fastest}
          slowest={slowest}
          peakMem={peakMem}
          diffLines={diffLines}
          openDiff={openDiff}
        />
      </div>
    </div>
  );
}

export default App;
