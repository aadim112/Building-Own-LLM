// Callout.jsx
// Usage: <Callout type="info">Attention is all you need!</Callout>
// Props:
//   type     ("info" | "tip" | "warning" | "math")  - visual style (default: "info")
//   title    (string)  - optional override for the label
//   children           - content

const ICONS = {
  info:    { label: "Note" },
  tip:     { label: "Tip" },
  warning: { label: "Warning" },
  math:    { label: "Math" },
};

export default function Callout({ type = "info", title, children }) {
  const { icon, label } = ICONS[type] || ICONS.info;
  return (
    <div className={`callout callout-${type}`} style={{fontFamily:'Poppins'}}>
      <div className="callout-content" style={{fontFamily:'Poppins'}}>
        <strong className="callout-label">{title || label}</strong>
        <div>{children}</div>
      </div>
    </div>
  );
}
