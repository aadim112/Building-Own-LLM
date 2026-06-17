// diagrams/LLMBuildingStagesDiagram.jsx
//
// Compact static diagram of the stages of building an LLM:
//   Raw unlabeled text --Train--> Pretrained LLM (foundation model)
//     ├──> Basic capabilities (text completion, few-shot)
//     └--Train (+ Labeled dataset)--> Fine-tuned LLM (classification, summarization, ...)
//
// Usage:
//   import LLMBuildingStagesDiagram from './components/diagrams/LLMBuildingStagesDiagram';
//   <DiagramSection title="From Raw Text to Fine-Tuned LLM">
//     <LLMBuildingStagesDiagram />
//   </DiagramSection>

function Box({ children, accent = "#444", bg = "#fff", label }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{
        border: `2px solid ${accent}`,
        borderRadius: 8,
        padding: "8px 10px",
        background: bg,
        fontSize: 11,
        fontWeight: 700,
        color: "#222",
        minWidth: 90,
      }}>
        {children}
      </div>
      {label && <div style={{ fontSize: 10, marginTop: 4, color: "#555" }}>{label}</div>}
    </div>
  );
}

function CapabilityBox({ items, accent }) {
  return (
    <div style={{
      border: `2px solid ${accent}`,
      borderRadius: 10,
      padding: "6px 10px",
      background: `${accent}10`,
      fontSize: 10.5,
      minWidth: 130,
    }}>
      <ul style={{ margin: 0, paddingLeft: 14, lineHeight: 1.5 }}>
        {items.map((it, i) => <li key={i}>{it}</li>)}
      </ul>
    </div>
  );
}

function HArrow({ label, color = "#888" }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 44 }}>
      {label && <span style={{ fontSize: 10, color, marginBottom: 2 }}>{label}</span>}
      <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
        <div style={{ flex: 1, height: 2, background: color }} />
        <div style={{
          width: 0, height: 0,
          borderTop: "4px solid transparent", borderBottom: "4px solid transparent",
          borderLeft: `6px solid ${color}`,
        }} />
      </div>
    </div>
  );
}

function VArrow({ color = "#888", height = 28 }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height }}>
      <div style={{ flex: 1, width: 2, background: color }} />
      <div style={{
        width: 0, height: 0,
        borderLeft: "4px solid transparent", borderRight: "4px solid transparent",
        borderTop: `6px solid ${color}`,
      }} />
    </div>
  );
}

function Annotation({ text, color = "#1a1a2e" }) {
  return (
    <div style={{ maxWidth: 170, fontSize: 10.5, fontWeight: 700, color, lineHeight: 1.4 }}>
      {text}
    </div>
  );
}

export default function LLMBuildingStagesDiagram() {
  const blue = "#4a90e2";
  const green = "#27ae60";

  return (
    <div style={{
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      maxWidth: 560,
      userSelect: "none",
    }}>

      {/* Top row: Raw data -> Pretrained -> Fine-tuned */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
        <Box accent="#444" label="Raw, unlabeled text (trillions of words)">
          Raw text
        </Box>

        <HArrow label="Train" color={blue} />

        <Box accent={blue} bg={`${blue}10`} label="Pretrained LLM (foundation model)">
          Pretrained LLM
        </Box>

        <HArrow label="Train" color={green} />

        <Box accent={green} bg={`${green}10`} label="Fine-tuned LLM">
          Fine-tuned LLM
        </Box>
      </div>

      {/* Annotations row 1 */}
      <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
        <Annotation text="An LLM is pretrained on unlabeled text data." />
        <div style={{ flex: 1 }} />
      </div>

      {/* Vertical arrows up to capability boxes */}
      <div style={{ display: "flex", gap: 6, marginBottom: 4 }}>
        <div style={{ minWidth: 90 }} />
        <div style={{ minWidth: 44 }} />
        <div style={{ minWidth: 90, display: "flex", justifyContent: "center" }}>
          <VArrow color={blue} />
        </div>
        <div style={{ minWidth: 44 }} />
        <div style={{ minWidth: 130, display: "flex", justifyContent: "center" }}>
          <VArrow color={green} />
        </div>
      </div>

      {/* Capability boxes row */}
      <div style={{ display: "flex", gap: 6, marginBottom: 6, alignItems: "flex-start" }}>
        <div style={{ minWidth: 90 }} />
        <div style={{ minWidth: 44 }} />
        <CapabilityBox accent={blue} items={["Text completion", "Few-shot capabilities"]} />
        <div style={{ minWidth: 44 }} />
        <CapabilityBox accent={green} items={["Classification", "Summarization", "Translation", "Personal assistant", "…"]} />
      </div>

      {/* Annotations row 2 */}
      <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
        <div style={{ minWidth: 90 }} />
        <div style={{ minWidth: 44 }} />
        <Annotation text="The LLM has a few basic capabilities after pretraining." />
        <div style={{ minWidth: 44 }} />
        <div style={{ flex: 1 }} />
      </div>

      {/* Labeled dataset row, feeding into Pretrained LLM */}
      <div style={{ display: "flex", gap: 6, alignItems: "flex-start" }}>
        <div style={{ minWidth: 90 }} />
        <div style={{ minWidth: 44 }} />
        <div style={{ minWidth: 90, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <VArrow color={green} />
          <Box accent={green} bg={`${green}10`}>Labeled dataset</Box>
        </div>
        <div style={{ minWidth: 44 }} />
        <Annotation text="A pretrained LLM can be further trained on a labeled dataset to obtain a fine-tuned LLM for specific tasks." />
      </div>
    </div>
  );
}