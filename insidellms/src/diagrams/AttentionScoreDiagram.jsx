// diagrams/AttentionScoreDiagram.jsx
// Interactive demo of how a query token attends to all input tokens.
// Click any token to see its attention weights update live.

import { useState } from "react";

const TOKENS = ["Your", "journey", "starts", "with", "one", "step"];

// Pre-computed fake attention weights [queryIdx][keyIdx]
const WEIGHTS = [
  [0.55, 0.20, 0.10, 0.08, 0.04, 0.03],
  [0.12, 0.48, 0.18, 0.12, 0.06, 0.04],
  [0.08, 0.15, 0.52, 0.14, 0.07, 0.04],
  [0.10, 0.12, 0.16, 0.44, 0.12, 0.06],
  [0.06, 0.09, 0.11, 0.18, 0.45, 0.11],
  [0.04, 0.06, 0.08, 0.12, 0.22, 0.48],
];

const EMBED = [
  [0.4, 0.1, 0.8],
  [0.5, 0.8, 0.6],
  [0.5, 0.8, 0.6],
  [0.3, 0.7, 0.5],
  [0.6, 0.4, 0.9],
  [0.0, 0.8, 0.5],
];

function heatColor(w) {
  // white → blue gradient based on weight
  const t = Math.min(w / 0.6, 1);
  const r = Math.round(255 - t * 140);
  const g = Math.round(255 - t * 110);
  const b = 255;
  return `rgb(${r},${g},${b})`;
}

export default function AttentionScoreDiagram() {
  const [queryIdx, setQueryIdx] = useState(1);
  const weights = WEIGHTS[queryIdx];

  return (
    <div style={{ fontFamily: "monospace", userSelect: "none" }}>
      <p style={{ marginBottom: 8, fontSize: 13, color: "#555" }}>
        Click any token to set it as the <strong>query</strong>. Watch how attention weights change.
      </p>

      {/* Token row */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        {TOKENS.map((tok, i) => (
          <div key={i} style={{ textAlign: "center", cursor: "pointer" }} onClick={() => setQueryIdx(i)}>
            <div style={{ fontSize: 12, marginBottom: 4, color: "#666" }}>x<sup>({i + 1})</sup></div>
            {/* Embedding box */}
            <div style={{
              display: "flex",
              gap: 2,
              border: i === queryIdx ? "2px solid #4a90e2" : "2px solid transparent",
              borderRadius: 4,
              padding: 2,
              background: i === queryIdx ? "#eaf2ff" : "#f5f5f5",
              transition: "all 0.2s",
            }}>
              {EMBED[i].map((v, j) => (
                <div key={j} style={{
                  width: 22, height: 22, lineHeight: "22px", textAlign: "center",
                  fontSize: 10, background: heatColor(v), borderRadius: 3,
                }}>
                  {v}
                </div>
              ))}
            </div>
            <div style={{
              marginTop: 4, fontSize: 12, fontWeight: i === queryIdx ? 700 : 400,
              color: i === queryIdx ? "#4a90e2" : "#333",
            }}>
              "{tok}"
            </div>
          </div>
        ))}
      </div>

      {/* Query label */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <div style={{ background: "#eaf2ff", border: "2px solid #4a90e2", borderRadius: 4, padding: "2px 8px", fontSize: 12 }}>
          Query: x<sup>({queryIdx + 1})</sup> = "{TOKENS[queryIdx]}"
        </div>
        <span style={{ fontSize: 12, color: "#888" }}>attending to all tokens →</span>
      </div>

      {/* Attention weight bars */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {TOKENS.map((tok, i) => (
          <div key={i} style={{ textAlign: "center", width: 64 }}>
            <div style={{
              height: 80, display: "flex", alignItems: "flex-end", justifyContent: "center",
            }}>
              <div style={{
                width: 36,
                height: `${weights[i] * 160}px`,
                background: i === queryIdx ? "#4a90e2" : "#82b4f0",
                borderRadius: "4px 4px 0 0",
                transition: "height 0.4s ease",
                display: "flex", alignItems: "flex-start", justifyContent: "center",
                paddingTop: 4,
              }}>
                <span style={{ fontSize: 10, color: "#fff", fontWeight: 700 }}>
                  {weights[i].toFixed(2)}
                </span>
              </div>
            </div>
            <div style={{ fontSize: 11, marginTop: 4, color: "#555" }}>
              ω<sub>{queryIdx + 1}{i + 1}</sub>
            </div>
            <div style={{ fontSize: 10, color: "#888" }}>"{tok}"</div>
          </div>
        ))}
      </div>

      <p style={{ marginTop: 16, fontSize: 12, color: "#888" }}>
        ω<sub>ij</sub> = dot(x<sup>(i)</sup>, x<sup>(j)</sup>) — raw attention score before softmax
      </p>
    </div>
  );
}
