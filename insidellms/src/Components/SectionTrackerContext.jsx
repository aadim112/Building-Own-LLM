// SectionTrackerContext.jsx
//
// Provides the id of the section currently scrolled into view.
// SectionAnchor registers itself; StickyNotesRail (and anything else)
// can read the active section id via useActiveSection().
//
// Wrap your app (or just Content-Section) with <SectionTrackerProvider>.

import { createContext, useContext, useRef, useState, useCallback, useEffect } from "react";

const SectionTrackerContext = createContext({
  activeId: null,
  registerSection: () => {},
});

export function SectionTrackerProvider({ children }) {
  const [activeId, setActiveId] = useState(null);
  const sectionsRef = useRef(new Map()); // id -> element
  const observerRef = useRef(null);

  // Set up a single IntersectionObserver for all registered sections
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the top of the viewport that's intersecting
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

          console.log("observer entries:", entries.map(e => ({ id: e.target.id, intersecting: e.isIntersecting })));  // ← add this line


        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        // Trigger when a section is within the top 40% of the viewport
        rootMargin: "-80px 0px -50% 0px",
        threshold: 0,
      }
    );

    // Observe any sections already registered
    sectionsRef.current.forEach((el) => observerRef.current.observe(el));

    return () => observerRef.current && observerRef.current.disconnect();
  }, []);

  const registerSection = useCallback((id, el) => {
    if (!el) return;
    sectionsRef.current.set(id, el);
    if (observerRef.current) observerRef.current.observe(el);
  }, []);

  return (
    <SectionTrackerContext.Provider value={{ activeId, registerSection }}>
      {children}
    </SectionTrackerContext.Provider>
  );
}

export function useActiveSection() {
  return useContext(SectionTrackerContext).activeId;
}

export function useRegisterSection() {
  return useContext(SectionTrackerContext).registerSection;
}
