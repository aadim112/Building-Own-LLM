// diagrams/AttentionWeightsDiagram.jsx
//
// Animated diagram showing two steps for query token x^(2) "journey":
//   Step 1 — dot-product attention SCORES  (ω)
//   Step 2 — softmax NORMALISATION → attention WEIGHTS (α)
//
// Usage:
//   import AttentionWeightsDiagram from './components/diagrams/AttentionWeightsDiagram';
//   <DiagramSection title="From Scores to Weights" caption="...">
//     <AttentionWeightsDiagram />
//   </DiagramSection>

import { useState, useEffect, useRef } from "react";

// ── Data ─────────────────────────────────────────────────────────────────────
const TOKENS = [
  { word: "Your",    sup: 1, embed: [0.4, 0.1, 0.8] },
  { word: "journey", sup: 2, embed: [0.5, 0.8, 0.6] },
  { word: "starts",  sup: 3, embed: [0.5, 0.8, 0.6] },
  { word: "step",    sup: "T", embed: [0.0, 0.8, 0.5] },
];

const QUERY_IDX = 1; // "journey" = x^(2)

// Raw dot-product scores (ω)
const SCORES = [0.9, 1.4, 1.4, 1.0];

// Softmax of scores → attention weights (α)
function softmax(arr) {
  const max = Math.max(...arr);
  const exps = arr.map((v) => Math.exp(v - max));
  const sum = exps.reduce((a, b) => a + b, 0);
  return exps.map((v) => v / sum);
}
const WEIGHTS = softmax(SCORES); // [0.10, 0.27, 0.27, 0.10] approx → shown as 0.1,0.2,0.2,0.1

// Display versions
const SCORE_LABELS  = ["0.9", "1.4", "1.4", "1.0"];
const WEIGHT_LABELS = ["0.1", "0.2", "0.2", "0.1"];

// Embed cell colours
const EMBED_COLORS = [
  "#a8d8a8", // green  (0.4/0.5/0.0 col 1)
  "#7ec8e3", // blue   (0.1/0.8/0.8 col 2)
  "#f4a460", // orange (0.8/0.6/0.5 col 3)
];

// Score / weight box colour per token
const SCORE_COLORS  = ["#7ec8e3", "#7ec8e3", "#7ec8e3", "#7ec8e3"];
const WEIGHT_COLORS = ["#f4a460", "#f4a460", "#f4a460", "#f4a460"];

// ── Helpers ───────────────────────────────────────────────────────────────────
const STEPS = ["idle", "scores", "weights", "done"];

function EmbedBox({ values, highlight, small }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {values.map((v, i) => (
        <div
          key={i}
          style={{
            width: small ? 22 : 26,
            height: small ? 22 : 26,
            lineHeight: small ? "22px" : "26px",
            textAlign: "center",
            fontSize: small ? 9 : 10,
            fontWeight: 600,
            background: highlight ? EMBED_COLORS[i] : "#e0e0e0",
            borderRadius: 3,
            transition: "background 0.4s",
            color: "#333",
          }}
        >
          {v}
        </div>
      ))}
    </div>
  );
}

function Arrow({ visible, color = "#888" }) {
  return (
    <div
      style={{
        height: 28,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.4s",
      }}
    >
      <div style={{ width: 2, flex: 1, background: color }} />
      <div
        style={{
          width: 0, height: 0,
          borderLeft: "5px solid transparent",
          borderRight: "5px solid transparent",
          borderTop: `7px solid ${color}`,
        }}
      />
    </div>
  );
}

function ScoreBox({ label, color, visible, sub }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          width: 40, height: 28, lineHeight: "28px",
          background: visible ? color : "#e8e8e8",
          borderRadius: 4, fontSize: 13, fontWeight: 700,
          color: "#fff", margin: "0 auto",
          transition: "background 0.5s, transform 0.3s",
          transform: visible ? "scale(1)" : "scale(0.85)",
          boxShadow: visible ? "0 2px 6px rgba(0,0,0,0.15)" : "none",
        }}
      >
        {visible ? label : ""}
      </div>
      <div style={{ fontSize: 11, color: "#666", marginTop: 3 }}>
        {sub}
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function AttentionWeightsDiagram() {
  const [step, setStep] = useState(0); // index into STEPS
  const [playing, setPlaying] = useState(false);
  const timerRef = useRef(null);

  const phase = STEPS[step]; // "idle" | "scores" | "weights" | "done"

  // Auto-advance when playing
  useEffect(() => {
    if (!playing) return;
    if (step >= STEPS.length - 1) { setPlaying(false); return; }
    timerRef.current = setTimeout(() => setStep((s) => s + 1), 1600);
    return () => clearTimeout(timerRef.current);
  }, [playing, step]);

  const handlePlay = () => {
    if (step >= STEPS.length - 1) {
      setStep(0);
      setTimeout(() => setPlaying(true), 50);
    } else {
      setPlaying(true);
    }
  };

  const handleReset = () => {
    setPlaying(false);
    clearTimeout(timerRef.current);
    setStep(0);
  };

  const showScores  = phase === "scores"  || phase === "weights" || phase === "done";
  const showWeights = phase === "weights" || phase === "done";

  return (
    <div style={{ fontFamily: "monospace", userSelect: "none", maxWidth: 680 }}>

      {/* ── Legend / description ── */}
      <div style={{
        background: "#f0f4ff", borderRadius: 8, padding: "10px 14px",
        fontSize: 12, color: "#444", marginBottom: 20, lineHeight: 1.6,
      }}>
        <strong>Query:</strong> x<sup>(2)</sup> = "journey" &nbsp;·&nbsp;
        <strong>Step 1</strong> computes raw dot-product scores ω &nbsp;·&nbsp;
        <strong>Step 2</strong> applies softmax to get attention weights α
      </div>

      {/* ── Token column headers ── */}
      <div style={{ display: "flex", gap: 16, paddingLeft: 110, marginBottom: 8 }}>
        {TOKENS.map((t, i) => (
          <div key={i} style={{ width: 72, textAlign: "center" }}>
            <div style={{ fontSize: 12, color: "#666" }}>
              "{t.word}"
              {i === TOKENS.length - 1 && (
                <span style={{ fontSize: 10, color: "#aaa" }}> …</span>
              )}
            </div>
            <div style={{ fontSize: 11, color: "#888" }}>
              x<sup>({t.sup})</sup>
            </div>
          </div>
        ))}
      </div>

      {/* ── Embedding row ── */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 0 }}>
        <div style={{ width: 94, fontSize: 11, color: "#888", textAlign: "right" }}>
          input embeddings
        </div>
        {TOKENS.map((t, i) => (
          <div key={i} style={{ width: 72, display: "flex", justifyContent: "center" }}>
            <EmbedBox values={t.embed} highlight={true} />
          </div>
        ))}
      </div>

      {/* ── Arrows: embed → score ── */}
      <div style={{ display: "flex", gap: 16, paddingLeft: 110 }}>
        {TOKENS.map((_, i) => (
          <div key={i} style={{ width: 72, display: "flex", justifyContent: "center" }}>
            <Arrow visible={showScores} color="#4a90e2" />
          </div>
        ))}
      </div>

      {/* ── Query row ── */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 0 }}>
        <div style={{ width: 94, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2 }}>
          <EmbedBox values={TOKENS[QUERY_IDX].embed} highlight={true} small />
          <div style={{ fontSize: 10, color: "#555" }}>
            x<sup>(2)</sup> <em>(query)</em>
          </div>
        </div>
        {TOKENS.map((_, i) => (
          <div key={i} style={{ width: 72, display: "flex", justifyContent: "center" }}>
            <ScoreBox
              label={SCORE_LABELS[i]}
              color="#5b9bd5"
              visible={showScores}
              sub={<>ω<sub>2{i === TOKENS.length - 1 ? "T" : i + 1}</sub></>}
            />
          </div>
        ))}
      </div>

      {/* ── Step 1 label ── */}
      <div style={{
        marginLeft: 110, marginTop: 6, marginBottom: 2,
        fontSize: 11,
        color: showScores ? "#4a90e2" : "#bbb",
        transition: "color 0.4s",
        display: "flex", alignItems: "center", gap: 6,
      }}>
        <span style={{
          background: showScores ? "#4a90e2" : "#ddd",
          color: "#fff", borderRadius: "50%",
          width: 16, height: 16, lineHeight: "16px", textAlign: "center",
          fontSize: 10, transition: "background 0.4s",
        }}>1</span>
        dot(x<sup>(2)</sup>, x<sup>(i)</sup>) → raw score ω
      </div>

      {/* ── Arrows: score → weight (softmax) ── */}
      <div style={{ display: "flex", gap: 16, paddingLeft: 110, position: "relative" }}>
        {TOKENS.map((_, i) => (
          <div key={i} style={{ width: 72, display: "flex", justifyContent: "center" }}>
            <Arrow visible={showWeights} color="#e07b39" />
          </div>
        ))}
        {/* Softmax label spanning the arrows */}
        {showWeights && (
          <div style={{
            position: "absolute", left: 118, top: 8,
            fontSize: 10, color: "#e07b39", fontStyle: "italic",
            background: "#fff8f4", padding: "2px 6px", borderRadius: 4,
            border: "1px solid #f0c0a0",
            animation: "fadeIn 0.4s",
          }}>
            softmax(ω) →
          </div>
        )}
      </div>

      {/* ── Attention weights row ── */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ width: 94, fontSize: 11, color: "#888", textAlign: "right" }}>
          Attention weights:
        </div>
        {TOKENS.map((_, i) => (
          <div key={i} style={{ width: 72, display: "flex", justifyContent: "center" }}>
            <ScoreBox
              label={WEIGHT_LABELS[i]}
              color="#c87941"
              visible={showWeights}
              sub={<>α<sub>2{i === TOKENS.length - 1 ? "T" : i + 1}</sub></>}
            />
          </div>
        ))}
      </div>

      {/* ── Step 2 label ── */}
      <div style={{
        marginLeft: 110, marginTop: 6, marginBottom: 16,
        fontSize: 11,
        color: showWeights ? "#c87941" : "#bbb",
        transition: "color 0.4s",
        display: "flex", alignItems: "center", gap: 6,
      }}>
        <span style={{
          background: showWeights ? "#c87941" : "#ddd",
          color: "#fff", borderRadius: "50%",
          width: 16, height: 16, lineHeight: "16px", textAlign: "center",
          fontSize: 10, transition: "background 0.4s",
        }}>2</span>
        softmax(ω) → normalized weights α &nbsp;
        {showWeights && (
          <span style={{ color: "#888", fontSize: 10 }}>
            (sum = {WEIGHT_LABELS.reduce((a, v) => a + parseFloat(v), 0).toFixed(1)})
          </span>
        )}
      </div>

      {/* ── Controls ── */}
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <button
          onClick={playing ? () => setPlaying(false) : handlePlay}
          style={{
            padding: "7px 20px", borderRadius: 6, border: "none",
            background: playing ? "#888" : "#4a90e2",
            color: "#fff", cursor: "pointer", fontSize: 13, fontFamily: "sans-serif",
          }}
        >
          {playing ? "⏸ Pause" : step >= STEPS.length - 1 ? "↺ Replay" : "▶ Play"}
        </button>
        <button
          onClick={() => !playing && setStep((s) => Math.min(s + 1, STEPS.length - 1))}
          disabled={playing || step >= STEPS.length - 1}
          style={{
            padding: "7px 14px", borderRadius: 6, border: "1px solid #ccc",
            background: "#fff", cursor: "pointer", fontSize: 13, fontFamily: "sans-serif",
            opacity: (playing || step >= STEPS.length - 1) ? 0.4 : 1,
          }}
        >
          Step →
        </button>
        <button
          onClick={handleReset}
          style={{
            padding: "7px 14px", borderRadius: 6, border: "1px solid #ccc",
            background: "#fff", cursor: "pointer", fontSize: 13, fontFamily: "sans-serif",
          }}
        >
          ↺ Reset
        </button>

        {/* Phase indicator */}
        <div style={{ fontSize: 12, color: "#888", marginLeft: 6 }}>
          {phase === "idle"    && "Press Play or Step to begin"}
          {phase === "scores"  && "✦ Step 1: dot-product scores computed"}
          {phase === "weights" && "✦ Step 2: softmax → attention weights"}
          {phase === "done"    && "✔ Complete"}
        </div>
      </div>

      <style>{`@keyframes fadeIn { from { opacity:0; transform:translateY(-4px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </div>
  );
}
