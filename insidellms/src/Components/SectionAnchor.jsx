// SectionAnchor.jsx
// Invisible anchor that navigation links scroll to, AND registers itself
// with SectionTrackerContext so StickyNotesRail knows which section is
// currently in view.
//
// Usage: <SectionAnchor id="attention" />
// Props:
//   id  (string)  - must match the href used in navItems, e.g. "attention"

import { useRef, useEffect } from "react";
import { useRegisterSection } from "./SectionTrackerContext";

export default function SectionAnchor({ id }) {
  const ref = useRef(null);
  const registerSection = useRegisterSection();

  useEffect(() => {
    registerSection(id, ref.current);
  }, [id, registerSection]);

  return <div id={id} ref={ref} className="section-anchor" />;
}