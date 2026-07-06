function Confetti() {
  const pieces = Array.from({ length: 36 }, (_, i) => i);
  const colors = [
    "#f43f5e",
    "#f59e0b",
    "#22c55e",
    "#06b6d4",
    "#8b5cf6",
    "#ec4899",
  ];
  return (
    <div className="pointer-events-none fixed inset-0 z-[999] overflow-hidden">
      <style>{`
        @keyframes op-fall {
          0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(540deg); opacity: 0.9; }
        }
      `}</style>
      {pieces.map((i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 0.4;
        const duration = 1.8 + Math.random() * 1.4;
        const size = 6 + Math.random() * 8;
        const color = colors[i % colors.length];
        return (
          <span
            key={i}
            style={{
              position: "absolute",
              top: "-5vh",
              left: `${left}vw`,
              width: size,
              height: size * 0.5,
              background: color,
              animation: `op-fall ${duration}s ease-in ${delay}s forwards`,
              borderRadius: 2,
            }}
          />
        );
      })}
    </div>
  );
}

export default Confetti;