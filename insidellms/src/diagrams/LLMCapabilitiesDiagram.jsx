// diagrams/LLMCapabilitiesDiagram.jsx
//
// Static diagram showing Input → Output examples for:
//   Text completion, Zero-shot, Few-shot
//
// Usage:
//   import LLMCapabilitiesDiagram from './components/diagrams/LLMCapabilitiesDiagram';
//   <DiagramSection title="Text Completion vs Zero-shot vs Few-shot">
//     <LLMCapabilitiesDiagram />
//   </DiagramSection>

const ROWS = [
  {
    label: "TEXT COMPLETION",
    input: "Breakfast is the",
    output: "most important meal of the day.",
  },
  {
    label: "ZERO-SHOT",
    input: "Translate English to German:\nbreakfast =>",
    output: "Frühstück",
  },
  {
    label: "FEW-SHOT",
    input: "gaot => goat\nsheo => shoe\npohne =>",
    output: "phone",
  },
];

function Box({ text }) {
  return (
    <div style={{
      justifyContent:'center',
      borderRadius: 6,
      padding: "10px 14px",
      fontSize: 12.5,
      whiteSpace: "pre-line",
      lineHeight: 1.5,
      background: "#fff",
      minHeight: 24,
    }}>
      {text}
    </div>
  );
}

export default function LLMCapabilitiesDiagram() {
  return (
    <div style={{
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      maxWidth: 560,
      userSelect: "none",
    }}>
      {/* Column headers */}
      <div style={{ display: "grid", gridTemplateColumns: "130px 1fr 1fr", gap: 16, marginBottom: 10 }}>
        <div />
        <div style={{ textAlign: "center", fontWeight: 600, fontSize: 13 }}>Input</div>
        <div style={{ textAlign: "center", fontWeight: 600, fontSize: 13 }}>Output</div>
      </div>

      {/* Rows */}
      {ROWS.map((row, i) => (
        <div
          key={i}
          style={{
            display: "grid",
            gridTemplateColumns: "130px 1fr 1fr",
            gap: 16,
            alignItems: "center",
            marginBottom: i < ROWS.length - 1 ? 14 : 0,
            paddingBottom: i < ROWS.length - 1 ? 14 : 0,
            borderBottom: i < ROWS.length - 1 ? "1px solid #eee" : "none",
          }}
        >
          <div style={{ fontWeight: 700, fontSize: 12.5, letterSpacing: "0.03em" }}>
            {row.label}
          </div>
          <Box text={row.input} />
          <Box text={row.output} />
        </div>
      ))}
    </div>
  );
}
