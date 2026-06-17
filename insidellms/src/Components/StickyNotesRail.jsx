// StickyNotesRail.jsx
//
// Renders sticky notes in the right-side rail, showing only the notes
// whose `section` matches the section currently scrolled into view.
//
// Usage (in App.js):
//
//   const NOTES = [
//     { section: "stages",  color: "yellow", title: "Remember",
//       text: "Pretraining ≠ Fine-tuning!" },
//     { section: "cha2",    color: "pink",
//       text: "Embeddings turn words into vectors." },
//     { section: "attention-math", color: "green", title: "Formula",
//       text: "softmax(QKᵀ/√d_k)·V" },
//   ];
//
//   <div className="Content-Notes">
//     <StickyNotesRail notes={NOTES} />
//   </div>
//
// Each note's `section` must match an `id` used in a <SectionAnchor id="..." />.
// Only notes for the currently active section are shown (fades in/out).

import StickyNote from "./StickyNote";
import { useActiveSection } from "./SectionTrackerContext";

export default function StickyNotesRail({ notes = [] }) {
  const activeId = useActiveSection();
  const visibleNotes = notes.filter((n) => n.section === activeId);
  console.log("StickyNotesRail activeId:", activeId);

  if (visibleNotes.length === 0) return null;

  return (
    <div className="sticky-rail">
      {visibleNotes.map((note, i) => (
        <div key={i} className="sticky-rail-item">
          <StickyNote
            color={note.color}
            title={note.title}
            rotate={note.rotate}
            pin={note.pin}
            font={note.font}
            width={note.width}
          >
            {note.text}
          </StickyNote>
        </div>
      ))}
    </div>
  );
}
