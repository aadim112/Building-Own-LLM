// diagrams/QKVAttentionDiagram.jsx
//
// Step-by-step interactive diagram showing the full self-attention flow:
//   Step 1 — Input embeddings X (6 tokens × d_in=3)
//   Step 2 — Multiply by Wq, Wk, Wv → Q, K, V matrices
//   Step 3 — Pick query row q^(2) for token "journey"
//   Step 4 — Dot q^(2) with every key row → raw attention scores
//   Step 5 — Softmax → attention weights
//   Step 6 — Weighted sum of V rows → context vector z^(2)
//   Step 7 — Full context matrix Z (all tokens)
//
// Usage:
//   import QKVAttentionDiagram from './diagrams/QKVAttentionDiagram';
//   <DiagramSection title="Self-Attention: From Embeddings to Context Vectors">
//     <QKVAttentionDiagram />
//   </DiagramSection>

import { useState } from "react";

// ── Data ──────────────────────────────────────────────────────────────────────
const TOKENS = ["Your", "journey", "starts", "with", "one", "step"];
const QUERY_IDX = 1; // "journey"

// Input embeddings X  (6×3)
const X = [
  [0.4, 0.1, 0.8],
  [0.4, 0.1, 0.8],
  [0.5, 0.8, 0.6],
  [0.5, 0.8, 0.6],
  [0.3, 0.7, 0.5],
  [0.0, 0.8, 0.5],
];

// Weight matrices  (3×2)
const Wq = [[0.2, 0.5], [0.3, 0.1], [0.4, 0.8]];
const Wk = [[0.1, 0.4], [0.5, 0.3], [0.2, 0.7]];
const Wv = [[0.3, 0.6], [0.4, 0.2], [0.1, 0.5]];

// Matrix multiply  (n×3) × (3×2) → (n×2)
function matMul(A, B) {
  return A.map(row =>
    [0, 1].map(j => parseFloat(row.reduce((s, v, k) => s + v * B[k][j], 0).toFixed(2)))
  );
}

function softmax(arr) {
  const max = Math.max(...arr);
  const e = arr.map(v => Math.exp(v - max));
  const s = e.reduce((a, b) => a + b, 0);
  return e.map(v => parseFloat((v / s).toFixed(2)));
}

function dot(a, b) {
  return parseFloat(a.reduce((s, v, i) => s + v * b[i], 0).toFixed(2));
}

const Q = matMul(X, Wq);
const K = matMul(X, Wk);
const V = matMul(X, Wv);
const d_k = 2;

// Attention scores for query token (QUERY_IDX)
const rawScores = K.map(k => parseFloat((dot(Q[QUERY_IDX], k) / Math.sqrt(d_k)).toFixed(2)));
const weights   = softmax(rawScores);

// Context vector z^(2) = weighted sum of V rows
const contextVec = [0, 1].map(j =>
  parseFloat(V.reduce((s, row, i) => s + weights[i] * row[j], 0).toFixed(2))
);

// Full context matrix Z
const Z = Q.map((_, qi) => {
  const scores = K.map(k => parseFloat((dot(Q[qi], k) / Math.sqrt(d_k)).toFixed(2)));
  const w = softmax(scores);
  return [0, 1].map(j => parseFloat(V.reduce((s, row, i) => s + w[i] * row[j], 0).toFixed(2)));
});

// ── Colour palette ────────────────────────────────────────────────────────────
const C = {
  input:   { bg: "#d4f5d4", border: "#5aaa5a", text: "#1a4d1a" },
  wq:      { bg: "#f5c6e8", border: "#c05aaa", text: "#4d1a3e" },
  wk:      { bg: "#c6d8f5", border: "#5a7aaa", text: "#1a2e4d" },
  wv:      { bg: "#f5d8c6", border: "#aa7a5a", text: "#4d2e1a" },
  q:       { bg: "#f0b8e0", border: "#c05aaa", text: "#4d1a3e" },
  k:       { bg: "#b8d0f0", border: "#5a7aaa", text: "#1a2e4d" },
  v:       { bg: "#f0ceb8", border: "#aa7a5a", text: "#4d2e1a" },
  score:   { bg: "#fde68a", border: "#d97706", text: "#451a03" },
  weight:  { bg: "#fbbf24", border: "#b45309", text: "#451a03" },
  context: { bg: "#fca5a5", border: "#dc2626", text: "#450a0a" },
  z:       { bg: "#fca5a5", border: "#dc2626", text: "#450a0a" },
};

// ── Tiny helpers ──────────────────────────────────────────────────────────────
function Cell({ value, style, small }) {
  return (
    <div style={{
      minWidth: small ? 30 : 36, height: small ? 22 : 26,
      lineHeight: small ? "22px" : "26px",
      textAlign: "center", fontSize: small ? 9.5 : 10,
      fontWeight: 600, borderRadius: 3, border: "1px solid rgba(0,0,0,0.12)",
      padding: "0 3px",
      ...style,
    }}>
      {value}
    </div>
  );
}

function MatrixBox({ label, sublabel, data, palette, highlightRow, highlightCol, small }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{
        display: "inline-block", border: `2px solid ${palette.border}`,
        borderRadius: 8, padding: "6px 8px",
        background: palette.bg + "88",
      }}>
        {data.map((row, ri) => (
          <div key={ri} style={{ display: "flex", gap: 2, marginBottom: ri < data.length - 1 ? 2 : 0 }}>
            {(Array.isArray(row) ? row : [row]).map((v, ci) => (
              <Cell key={ci} value={v} small={small}
                style={{
                  background: (ri === highlightRow || ci === highlightCol)
                    ? palette.bg : palette.bg + "55",
                  color: palette.text,
                  outline: (ri === highlightRow) ? `2px solid ${palette.border}` : "none",
                }}
              />
            ))}
          </div>
        ))}
      </div>
      <div style={{ fontSize: 11, fontWeight: 700, color: palette.text, marginTop: 4 }}>{label}</div>
      {sublabel && <div style={{ fontSize: 9.5, color: "#666", marginTop: 1 }}>{sublabel}</div>}
    </div>
  );
}

function Arrow({ label, vertical, color = "#888", size = 28 }) {
  if (vertical) return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: size }}>
      <div style={{ flex: 1, width: 2, background: color }} />
      <div style={{ width: 0, height: 0, borderLeft: "4px solid transparent", borderRight: "4px solid transparent", borderTop: `6px solid ${color}` }} />
      {label && <div style={{ fontSize: 9.5, color, marginTop: 2, fontWeight: 700 }}>{label}</div>}
    </div>
  );
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minWidth: 36 }}>
      {label && <div style={{ fontSize: 9.5, color, fontWeight: 700, marginBottom: 2 }}>{label}</div>}
      <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
        <div style={{ flex: 1, height: 2, background: color }} />
        <div style={{ width: 0, height: 0, borderTop: "4px solid transparent", borderBottom: "4px solid transparent", borderLeft: `6px solid ${color}` }} />
      </div>
    </div>
  );
}

function StepBadge({ n, active }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      width: 22, height: 22, borderRadius: "50%",
      background: active ? "#4a90e2" : "#ddd",
      color: active ? "#fff" : "#888",
      fontSize: 11, fontWeight: 700, marginRight: 8,
      transition: "background 0.3s",
    }}>{n}</span>
  );
}

function SectionHeader({ step, title, desc }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 4 }}>
        <StepBadge n={step} active />
        <span style={{ fontWeight: 700, fontSize: 13, color: "#1a1a2e" }}>{title}</span>
      </div>
      {desc && <div style={{ fontSize: 11.5, color: "#555", lineHeight: 1.5, paddingLeft: 30 }}>{desc}</div>}
    </div>
  );
}

function Divider() {
  return <div style={{ borderTop: "1px dashed #ddd", margin: "20px 0" }} />;
}

// ── Main component ────────────────────────────────────────────────────────────
export default function QKVAttentionDiagram() {
  const [expandedStep, setExpandedStep] = useState(1);

  const steps = [
    { n: 1, title: "Input Embeddings X", short: "Input X (6 tokens × d_in=3)" },
    { n: 2, title: "Multiply by Weight Matrices → Q, K, V", short: "X × Wq/Wk/Wv → Q, K, V" },
    { n: 3, title: "Extract Query Vector q⁽²⁾", short: "Row 2 of Q = query for 'journey'" },
    { n: 4, title: "Compute Attention Scores", short: "dot(q⁽²⁾, kᵢ) / √d_k" },
    { n: 5, title: "Softmax → Attention Weights", short: "Normalise scores → weights α" },
    { n: 6, title: "Context Vector z⁽²⁾", short: "Weighted sum of V rows" },
    { n: 7, title: "Full Context Matrix Z", short: "Repeat for all tokens" },
  ];

  return (
    <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", maxWidth: 680, userSelect: "none" }}>

      {/* Step nav pills */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
        {steps.map(s => (
          <button key={s.n} onClick={() => setExpandedStep(s.n)}
            style={{
              padding: "4px 10px", borderRadius: 20, fontSize: 11, cursor: "pointer",
              border: `1.5px solid ${expandedStep === s.n ? "#4a90e2" : "#ccc"}`,
              background: expandedStep === s.n ? "#4a90e2" : "#fff",
              color: expandedStep === s.n ? "#fff" : "#555",
              fontWeight: expandedStep === s.n ? 700 : 400,
              transition: "all 0.2s",
            }}>
            {s.n}. {s.short}
          </button>
        ))}
      </div>

      {/* ── Step 1: Input X ── */}
      {expandedStep === 1 && (
        <div>
          <SectionHeader step={1} title="Input Embeddings X"
            desc="Each of the 6 tokens is represented as a 3-dimensional embedding vector (d_in = 3). Row 2 (highlighted) is x⁽²⁾ — the embedding for 'journey'." />
          <div style={{ display: "flex", alignItems: "flex-start", gap: 24 }}>
            <MatrixBox label="X (inputs)" sublabel="6 tokens × d_in=3"
              data={X} palette={C.input} highlightRow={QUERY_IDX} />
            <div style={{ fontSize: 11.5, color: "#444", lineHeight: 1.7, maxWidth: 280, paddingTop: 8 }}>
              <div><b>Rows</b> = tokens (n = 6)</div>
              <div><b>Cols</b> = embedding dimensions (d<sub>in</sub> = 3)</div>
              <div style={{ marginTop: 8, padding: "6px 10px", background: C.input.bg, borderRadius: 6, border: `1px solid ${C.input.border}` }}>
                <b>Highlighted row:</b><br />
                x⁽²⁾ = [{X[QUERY_IDX].join(", ")}]<br />
                → embedding of <b>"journey"</b>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Step 2: Q, K, V ── */}
      {expandedStep === 2 && (
        <div>
          <SectionHeader step={2} title="Multiply X by Weight Matrices → Q, K, V"
            desc="Three learnable weight matrices Wq, Wk, Wv (each 3×2) project the input embeddings into Query, Key, and Value spaces (d_out = 2)." />

          {/* Wq Wk Wv */}
          <div style={{ display: "flex", gap: 16, marginBottom: 12, flexWrap: "wrap" }}>
            {[["Wq", Wq, C.wq], ["Wk", Wk, C.wk], ["Wv", Wv, C.wv]].map(([lbl, mat, pal]) => (
              <MatrixBox key={lbl} label={lbl} sublabel="d_in=3 × d_out=2" data={mat} palette={pal} small />
            ))}
          </div>

          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12, flexWrap: "wrap" }}>
            <MatrixBox label="X" sublabel="6×3" data={X} palette={C.input} highlightRow={QUERY_IDX} small />
            <span style={{ fontSize: 18, color: "#888" }}>×</span>
            <MatrixBox label="Wq" sublabel="3×2" data={Wq} palette={C.wq} small />
            <span style={{ fontSize: 14, color: "#888" }}>=</span>
            <MatrixBox label="Q (Queries)" sublabel="6×2" data={Q} palette={C.q} highlightRow={QUERY_IDX} small />
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12, flexWrap: "wrap" }}>
            <MatrixBox label="X" sublabel="6×3" data={X} palette={C.input} small />
            <span style={{ fontSize: 18, color: "#888" }}>×</span>
            <MatrixBox label="Wk" sublabel="3×2" data={Wk} palette={C.wk} small />
            <span style={{ fontSize: 14, color: "#888" }}>=</span>
            <MatrixBox label="K (Keys)" sublabel="6×2" data={K} palette={C.k} small />
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
            <MatrixBox label="X" sublabel="6×3" data={X} palette={C.input} small />
            <span style={{ fontSize: 18, color: "#888" }}>×</span>
            <MatrixBox label="Wv" sublabel="3×2" data={Wv} palette={C.wv} small />
            <span style={{ fontSize: 14, color: "#888" }}>=</span>
            <MatrixBox label="V (Values)" sublabel="6×2" data={V} palette={C.v} small />
          </div>
        </div>
      )}

      {/* ── Step 3: Query vector ── */}
      {expandedStep === 3 && (
        <div>
          <SectionHeader step={3} title="Extract Query Vector q⁽²⁾"
            desc='Row 2 of Q is the query vector for "journey". This tells the model what "journey" is looking for in other tokens.' />
          <div style={{ display: "flex", gap: 20, alignItems: "flex-start", flexWrap: "wrap" }}>
            <MatrixBox label="Q (Queries)" sublabel="6×2" data={Q} palette={C.q} highlightRow={QUERY_IDX} />
            <div style={{ paddingTop: 8, fontSize: 11.5, lineHeight: 1.7, color: "#444" }}>
              <div>Row index: <b>2</b> (0-indexed)</div>
              <div>Token: <b>"journey"</b></div>
              <div style={{ marginTop: 8, padding: "6px 10px", background: C.q.bg, borderRadius: 6, border: `1px solid ${C.q.border}` }}>
                <b>q⁽²⁾ = [{Q[QUERY_IDX].join(", ")}]</b><br />
                This vector will be dotted with every key row kᵢ to measure how much "journey" should attend to each token.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Step 4: Attention scores ── */}
      {expandedStep === 4 && (
        <div>
          <SectionHeader step={4} title="Compute Raw Attention Scores"
            desc={`dot(q⁽²⁾, kᵢ) / √d_k for each token i. d_k = ${d_k}, so we divide by √${d_k} ≈ ${Math.sqrt(d_k).toFixed(2)}.`} />
          <div style={{ display: "flex", gap: 16, alignItems: "flex-start", flexWrap: "wrap" }}>
            <div>
              <div style={{ fontSize: 11, color: "#666", marginBottom: 6 }}>q⁽²⁾ = [{Q[QUERY_IDX].join(", ")}]</div>
              <table style={{ borderCollapse: "collapse", fontSize: 11.5 }}>
                <thead>
                  <tr>
                    <th style={{ padding: "4px 10px", textAlign: "left", color: "#666", fontWeight: 600, borderBottom: "1px solid #ddd" }}>Token</th>
                    <th style={{ padding: "4px 10px", color: "#666", fontWeight: 600, borderBottom: "1px solid #ddd" }}>kᵢ</th>
                    <th style={{ padding: "4px 10px", color: "#666", fontWeight: 600, borderBottom: "1px solid #ddd" }}>dot(q⁽²⁾, kᵢ)</th>
                    <th style={{ padding: "4px 10px", color: "#666", fontWeight: 600, borderBottom: "1px solid #ddd" }}>÷ √d_k</th>
                  </tr>
                </thead>
                <tbody>
                  {TOKENS.map((tok, i) => {
                    const rawDot = parseFloat(dot(Q[QUERY_IDX], K[i]).toFixed(3));
                    return (
                      <tr key={i} style={{ background: i % 2 === 0 ? "#fafafa" : "#fff" }}>
                        <td style={{ padding: "4px 10px", fontWeight: i === QUERY_IDX ? 700 : 400 }}>{tok}</td>
                        <td style={{ padding: "4px 10px", color: C.k.text }}>[{K[i].join(", ")}]</td>
                        <td style={{ padding: "4px 10px", textAlign: "center" }}>{rawDot}</td>
                        <td style={{ padding: "4px 10px", textAlign: "center" }}>
                          <span style={{ background: C.score.bg, padding: "1px 6px", borderRadius: 4, fontWeight: 700 }}>
                            {rawScores[i]}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div style={{ fontSize: 11.5, color: "#444", lineHeight: 1.7, maxWidth: 200 }}>
              <div style={{ padding: "8px 10px", background: C.score.bg, borderRadius: 6, border: `1px solid ${C.score.border}` }}>
                <b>Scores ω:</b><br />
                [{rawScores.join(", ")}]
              </div>
              <div style={{ marginTop: 8, color: "#666" }}>
                Higher score = "journey" attends more to that token.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Step 5: Softmax → weights ── */}
      {expandedStep === 5 && (
        <div>
          <SectionHeader step={5} title="Softmax → Attention Weights α"
            desc="Softmax converts raw scores into probabilities (sum = 1). Higher weight = more attention paid to that token." />
          <div style={{ display: "flex", gap: 16, alignItems: "flex-start", flexWrap: "wrap" }}>
            <table style={{ borderCollapse: "collapse", fontSize: 11.5 }}>
              <thead>
                <tr>
                  <th style={{ padding: "4px 10px", textAlign: "left", color: "#666", borderBottom: "1px solid #ddd" }}>Token</th>
                  <th style={{ padding: "4px 10px", color: "#666", borderBottom: "1px solid #ddd" }}>Score ω</th>
                  <th style={{ padding: "4px 10px", color: "#666", borderBottom: "1px solid #ddd" }}>Weight α</th>
                  <th style={{ padding: "4px 10px", color: "#666", borderBottom: "1px solid #ddd" }}>Bar</th>
                </tr>
              </thead>
              <tbody>
                {TOKENS.map((tok, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? "#fafafa" : "#fff" }}>
                    <td style={{ padding: "4px 10px", fontWeight: i === QUERY_IDX ? 700 : 400 }}>{tok}</td>
                    <td style={{ padding: "4px 10px", textAlign: "center", color: "#888" }}>{rawScores[i]}</td>
                    <td style={{ padding: "4px 10px", textAlign: "center" }}>
                      <span style={{ background: C.weight.bg, padding: "1px 8px", borderRadius: 4, fontWeight: 700 }}>
                        {weights[i]}
                      </span>
                    </td>
                    <td style={{ padding: "4px 10px" }}>
                      <div style={{ width: Math.round(weights[i] * 300), height: 10, background: C.weight.border, borderRadius: 3, transition: "width 0.4s" }} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ fontSize: 11.5, color: "#444", lineHeight: 1.7 }}>
              <div style={{ padding: "8px 10px", background: C.weight.bg, borderRadius: 6, border: `1px solid ${C.weight.border}` }}>
                <b>Sum of weights:</b><br />
                {weights.reduce((a, b) => parseFloat((a + b).toFixed(2)), 0)}
                <span style={{ color: "#888", marginLeft: 6 }}>(≈ 1.0 ✓)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Step 6: Context vector ── */}
      {expandedStep === 6 && (
        <div>
          <SectionHeader step={6} title="Context Vector z⁽²⁾ = Weighted Sum of V"
            desc='Each value row Vᵢ is multiplied by its attention weight αᵢ and summed. The result is the context vector for "journey".' />
          <div style={{ fontSize: 11.5, color: "#444", marginBottom: 12 }}>
            <b>z⁽²⁾ = Σ αᵢ × Vᵢ</b>
          </div>
          <table style={{ borderCollapse: "collapse", fontSize: 11, marginBottom: 14 }}>
            <thead>
              <tr>
                <th style={{ padding: "4px 8px", color: "#666", borderBottom: "1px solid #ddd", textAlign: "left" }}>Token</th>
                <th style={{ padding: "4px 8px", color: "#666", borderBottom: "1px solid #ddd" }}>α</th>
                <th style={{ padding: "4px 8px", color: "#666", borderBottom: "1px solid #ddd" }}>V row</th>
                <th style={{ padding: "4px 8px", color: "#666", borderBottom: "1px solid #ddd" }}>α × V</th>
              </tr>
            </thead>
            <tbody>
              {TOKENS.map((tok, i) => {
                const scaled = V[i].map(v => parseFloat((weights[i] * v).toFixed(3)));
                return (
                  <tr key={i} style={{ background: i % 2 === 0 ? "#fafafa" : "#fff" }}>
                    <td style={{ padding: "4px 8px", fontWeight: i === QUERY_IDX ? 700 : 400 }}>{tok}</td>
                    <td style={{ padding: "4px 8px", textAlign: "center", background: C.weight.bg }}>{weights[i]}</td>
                    <td style={{ padding: "4px 8px", textAlign: "center", color: C.v.text }}>[{V[i].join(", ")}]</td>
                    <td style={{ padding: "4px 8px", textAlign: "center" }}>[{scaled.join(", ")}]</td>
                  </tr>
                );
              })}
              <tr style={{ borderTop: "2px solid #ccc" }}>
                <td colSpan={3} style={{ padding: "6px 8px", textAlign: "right", fontWeight: 700 }}>z⁽²⁾ = sum →</td>
                <td style={{ padding: "6px 8px", textAlign: "center" }}>
                  <span style={{ background: C.context.bg, padding: "2px 8px", borderRadius: 4, fontWeight: 700, border: `1px solid ${C.context.border}` }}>
                    [{contextVec.join(", ")}]
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <div style={{ fontSize: 11.5, padding: "8px 12px", background: C.context.bg, borderRadius: 6, border: `1px solid ${C.context.border}`, display: "inline-block" }}>
            Context vector for <b>"journey"</b>: <b>z⁽²⁾ = [{contextVec.join(", ")}]</b><br />
            This is a 2-dim vector that encodes "journey" with awareness of all other tokens.
          </div>
        </div>
      )}

      {/* ── Step 7: Full Z matrix ── */}
      {expandedStep === 7 && (
        <div>
          <SectionHeader step={7} title="Full Context Matrix Z"
            desc="Repeat steps 3–6 for every token. Each row of Z is that token's context vector — enriched with information from all other tokens via attention." />
          <div style={{ display: "flex", gap: 20, alignItems: "flex-start", flexWrap: "wrap" }}>
            <div>
              <table style={{ borderCollapse: "collapse", fontSize: 11.5 }}>
                <thead>
                  <tr>
                    <th style={{ padding: "4px 10px", textAlign: "left", color: "#666", borderBottom: "1px solid #ddd" }}>Token</th>
                    <th style={{ padding: "4px 10px", color: "#666", borderBottom: "1px solid #ddd" }} colSpan={2}>z (context vector, d_out=2)</th>
                  </tr>
                </thead>
                <tbody>
                  {TOKENS.map((tok, i) => (
                    <tr key={i} style={{ background: i === QUERY_IDX ? C.context.bg : i % 2 === 0 ? "#fafafa" : "#fff" }}>
                      <td style={{ padding: "4px 10px", fontWeight: i === QUERY_IDX ? 700 : 400 }}>{tok}</td>
                      {Z[i].map((v, j) => (
                        <td key={j} style={{ padding: "4px 10px", textAlign: "center", fontWeight: i === QUERY_IDX ? 700 : 400 }}>{v}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ fontSize: 11.5, color: "#444", lineHeight: 1.7, maxWidth: 240 }}>
              <div style={{ padding: "8px 10px", background: C.z.bg, borderRadius: 6, border: `1px solid ${C.z.border}`, marginBottom: 10 }}>
                <b>Z = softmax(QKᵀ / √d_k) · V</b><br />
                Shape: 6 × 2 (n × d_out)
              </div>
              <div style={{ color: "#666" }}>
                Highlighted row = z⁽²⁾ (context for "journey"),
                computed in Step 6.<br /><br />
                Each row is a contextually enriched representation of that token.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom nav */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20, paddingTop: 12, borderTop: "1px solid #eee" }}>
        <button
          disabled={expandedStep === 1}
          onClick={() => setExpandedStep(s => s - 1)}
          style={{ padding: "6px 16px", borderRadius: 6, border: "1px solid #ccc", background: "#fff", cursor: expandedStep === 1 ? "default" : "pointer", opacity: expandedStep === 1 ? 0.4 : 1, fontSize: 12 }}
        >
          ← Prev
        </button>
        <span style={{ fontSize: 11, color: "#888", alignSelf: "center" }}>Step {expandedStep} of 7</span>
        <button
          disabled={expandedStep === 7}
          onClick={() => setExpandedStep(s => s + 1)}
          style={{ padding: "6px 16px", borderRadius: 6, border: "1px solid #4a90e2", background: expandedStep === 7 ? "#fff" : "#4a90e2", color: expandedStep === 7 ? "#aaa" : "#fff", cursor: expandedStep === 7 ? "default" : "pointer", fontSize: 12 }}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
