// Sidebar.jsx
// Renders a navigation list. Clicking any item smoothly scrolls to its section.
// If the user is unauthenticated, clicking a gated section triggers Google Sign-In.

import { useState } from "react";

// List of allowed navigation section IDs for unauthenticated users.
const ALLOWED_IDS = new Set([
  "intro",
  "stages",
  "transArchi",
  "aboutgpt",
  "datasetcomparison"
]);

function NavItem({ item, depth = 0, isAuthenticated, signInWithGoogle, closeSidebar }) {
  const [open, setOpen] = useState(true);
  const hasChildren = item.children && item.children.length > 0;

  // Check if this item is gated/locked
  const isLocked = !isAuthenticated && !ALLOWED_IDS.has(item.id);

  const handleItemClick = () => {
    if (isLocked) {
      if (signInWithGoogle) signInWithGoogle();
      return;
    }

    const el = document.getElementById(item.id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      if (closeSidebar) closeSidebar();
    }
  };

  return (
    <li className={`nav-item depth-${depth} ${isLocked ? "nav-locked" : ""}`}>
      <div className="nav-row">
        {hasChildren && (
          <button className="nav-toggle" onClick={() => setOpen((o) => !o)}>
            {open ? "▾" : "▸"}
          </button>
        )}
        <button
          className={`nav-link ${isLocked ? "locked-link" : ""}`}
          style={{ paddingLeft: hasChildren ? 0 : depth > 0 ? "1.1rem" : 0 }}
          onClick={handleItemClick}
        >
          <span className="nav-label-text">{item.label}</span>
          {isLocked && (
            <svg
              className="nav-lock-svg"
              viewBox="0 0 24 24"
              width="12"
              height="12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          )}
        </button>
      </div>
      {hasChildren && open && (
        <ul className="nav-children">
          {item.children.map((child) => (
            <NavItem
              key={child.id}
              item={child}
              depth={depth + 1}
              isAuthenticated={isAuthenticated}
              signInWithGoogle={signInWithGoogle}
              closeSidebar={closeSidebar}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function Sidebar({
  items = [],
  isAuthenticated,
  signInWithGoogle,
  closeSidebar
}) {
  return (
    <nav className="sidebar-nav">
      <p className="sidebar-heading">Contents</p>
      <ul className="nav-list">
        {items.map((item) => (
          <NavItem
            key={item.id}
            item={item}
            isAuthenticated={isAuthenticated}
            signInWithGoogle={signInWithGoogle}
            closeSidebar={closeSidebar}
          />
        ))}
      </ul>
    </nav>
  );
}
