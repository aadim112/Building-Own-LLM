// CodeSnippet.jsx
// Usage:
//   <CodeSnippet language="python" title="Dot-product attention">{`
//     import numpy as np
//     scores = np.dot(Q, K.T) / np.sqrt(d_k)
//   `}</CodeSnippet>
//
// Props:
//   language  (string)  - e.g. "python", "javascript", "bash"
//   title     (string)  - optional label shown in the header bar
//   children  (string)  - the raw code string

import { useState } from "react";

export default function CodeSnippet({ language = "python", title, children }) {
  const [copied, setCopied] = useState(false);
  const code = typeof children === "string" ? children.trim() : "";

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="cs-wrapper">
      <div className="cs-header">
        <span className="cs-lang">{language}</span>
        {title && <span className="cs-title">{title}</span>}
        <button className="cs-copy" onClick={handleCopy}>
          {copied ? "✓ Copied" : "Copy"}
        </button>
      </div>
      <pre className="cs-pre">
        <code>{code}</code>
      </pre>
    </div>
  );
}
