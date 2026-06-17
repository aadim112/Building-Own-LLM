// StickyNote.jsx
// A floating sticky note that pins to the right side of the content area.
// Looks like a real paper sticky note — slight rotation, paper texture shadow,
// folded corner, and a pin/tape mark.
//
// Usage:
//   <StickyNote color="yellow">
//     Remember: softmax always sums to 1!
//   </StickyNote>
//
//   <StickyNote color="pink" title="TODO" rotate={-4}>
//     Implement multi-head attention next.
//   </StickyNote>
//
// Props:
//   color   ("yellow" | "pink" | "green" | "blue" | "orange" | "purple")  - note color (default: "yellow")
//   title   (string)  - optional bold header line inside the note
//   rotate  (number)  - rotation in degrees, default randomised slightly per color
//   pin     ("tape" | "pin" | "none")  - decoration at top of note (default: "tape")
//   font    ("hand" | "sans" | "mono")  - font style for the note text (default: "hand")
//   width   (number)  - note width in px (default: 180)
//   children          - note content (text / JSX)
//
// NOTE: requires the Google Font "Caveat" (or similar handwriting font) for the
// "hand" style. Add this to public/index.html <head> for the handwritten look:
//   <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&display=swap" rel="stylesheet">
// If not linked, it falls back to cursive.

const COLORS = {
  yellow: { bg: "#fff8b8", edge: "#f5e98a", fold: "#f7ee9a" },
  pink:   { bg: "#ffd6e7", edge: "#f7b8d2", fold: "#fac4dc" },
  green:  { bg: "#d4f7c5", edge: "#b3eda0", fold: "#c2f0ae" },
  blue:   { bg: "#cfe8fd", edge: "#aed4f5", fold: "#bfdef9" },
  orange: { bg: "#ffe0b8", edge: "#ffcd91", fold: "#ffd6a3" },
  purple: { bg: "#e6d6fb", edge: "#d3b8f5", fold: "#dcc6f7" },
};

const FONT_STYLES = {
  hand: "'Caveat', cursive",
  sans: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  mono: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
};

export default function StickyNote({
  color = "yellow",
  title,
  rotate,
  pin = "tape",
  font = "hand",
  width = 180,
  children,
}) {
  const palette = COLORS[color] || COLORS.yellow;
  const fontFamily = FONT_STYLES[font] || FONT_STYLES.hand;
  // Deterministic-ish small rotation per color if not specified
  const angle = rotate !== undefined ? rotate : (Object.keys(COLORS).indexOf(color) % 2 === 0 ? -3 : 3);

  return (
    <div
      className="sticky-note"
      style={{
        width,
        background: palette.bg,
        transform: `rotate(${angle}deg)`,
        fontFamily,
      }}
    >
      {/* Pin / tape decoration */}
      {pin === "tape" && (
        <div className="sticky-tape" style={{ background: "rgba(255,255,255,0.55)" }} />
      )}
      {pin === "pin" && (
        <div className="sticky-pin">
          <div className="sticky-pin-head" />
        </div>
      )}

      {/* Content */}
      {title && <div className="sticky-title">{title}</div>}
      <div className="sticky-body">{children}</div>

      {/* Folded corner */}
      <div
        className="sticky-fold"
        style={{
          background: `linear-gradient(135deg, transparent 50%, ${palette.fold} 50%)`,
        }}
      />
    </div>
  );
}
