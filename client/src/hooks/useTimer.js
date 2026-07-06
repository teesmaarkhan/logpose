import { useEffect, useState } from "react";

export function useTimer() {
  const [seconds, setSeconds] = useState(0);

  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;

    const id = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(id);
  }, [running]);

  const start = () => setRunning(true);

  const pause = () => setRunning(false);

  const toggle = () => setRunning((r) => !r);

  const reset = () => {
    setRunning(false);
    setSeconds(0);
  };

  return {
    seconds,
    running,
    start,
    pause,
    toggle,
    reset,
    setSeconds,
    setRunning,
  };
}
