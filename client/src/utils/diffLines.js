export const diffLines = (expected, actual) => {
  const exp = (expected ?? "").split("\n");
  const act = (actual ?? "").split("\n");

  const max = Math.max(exp.length, act.length);

  const rows = [];

  for (let i = 0; i < max; i++) {
    const e = exp[i] ?? "";
    const a = act[i] ?? "";

    rows.push({
      e,
      a,
      match: e === a,
    });
  }

  return rows;
}
