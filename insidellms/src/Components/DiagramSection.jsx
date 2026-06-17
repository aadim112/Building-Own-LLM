// DiagramSection.jsx
// A styled wrapper for any interactive diagram component you pass in.
// Usage:
//   <DiagramSection title="How Attention Scores are Computed">
//     <AttentionDiagram />   {/* your interactive component */}
//   </DiagramSection>
//
// Props:
//   title    (string)  - heading above the diagram
//   caption  (string)  - optional grey note below
//   children           - the interactive JSX component

export default function DiagramSection({ title, caption, children }) {
  return (
    <div className="ds-wrapper">
      {title && <h3 className="ds-title">{title}</h3>}
      <div className="ds-stage">{children}</div>
      {caption && <p className="ds-caption">{caption}</p>}
    </div>
  );
}
