export default function help(functions) {
  const helpTexts = functions.map(f => {
    const f2s = f.toString();
    if (f2s.lastIndexOf("/** ") !== -1 && f2s.lastIndexOf(" */") !== -1) {
      const text = f2s.substring(
        f2s.lastIndexOf("/** ") + 4,
        f2s.lastIndexOf(" */")
      );
      return text;
    }
    return "";
  });
  return helpTexts.filter(h => h);
}
