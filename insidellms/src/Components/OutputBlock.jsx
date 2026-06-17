// OutputBlock.jsx
// Displays the output of a program/code snippet — styled like a terminal/console.
// Use right after a <CodeSnippet> to show what running it produces.
//
// Usage:
//   <CodeSnippet language="python" title="Tokenising a sentence">
//     {`print("Hello, world!")`}
//   </CodeSnippet>
//   <OutputBlock>
//     {`Hello, world!`}
//   </OutputBlock>
//
//   <OutputBlock title="Console output" lang="text">
//     {`[7927, 11879, 8638, 449, 832, 3094, 13]`}
//   </OutputBlock>
//
// Props:
//   title    (string)  - optional label in the header bar (default: "Output")
//   children (string)  - the raw output text

export default function OutputBlock({ title = "Output", children }) {
  const text = typeof children === "string" ? children.trim() : "";

  return (
    <div className="ob-wrapper">
      <div className="ob-header">
        <span className="ob-dot" />
        <span className="ob-title">{title}</span>
      </div>
      <pre className="ob-pre">
        <code>{text}</code>
      </pre>
    </div>
  );
}
