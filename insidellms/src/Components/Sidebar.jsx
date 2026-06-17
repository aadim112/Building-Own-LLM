// Sidebar.jsx
// Renders a navigation list. Clicking any item smoothly scrolls to its section.
//
// Usage in App.js:
//   const NAV = [
//     { label: "Introduction",      id: "intro" },
//     { label: "Tokenisation",      id: "tokenisation" },
//     { label: "Embeddings",        id: "embeddings",
//       children: [
//         { label: "Word2Vec",      id: "word2vec" },
//       ]
//     },
//     { label: "Attention",         id: "attention" },
//   ];
//   <Sidebar items={NAV} />
//
// Props:
//   items  (array)  - [{label, id, children?}]

import { useState } from "react";

function NavItem({ item, depth = 0 }) {
  const [open, setOpen] = useState(true);
  const hasChildren = item.children && item.children.length > 0;

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <li className={`nav-item depth-${depth}`}>
      <div className="nav-row">
        {hasChildren && (
          <button className="nav-toggle" onClick={() => setOpen((o) => !o)}>
            {open ? "▾" : "▸"}
          </button>
        )}
        <button
          className="nav-link"
          style={{ paddingLeft: hasChildren ? 0 : depth > 0 ? "1.1rem" : 0 }}
          onClick={() => scrollTo(item.id)}
        >
          {item.label}
        </button>
      </div>
      {hasChildren && open && (
        <ul className="nav-children">
          {item.children.map((child) => (
            <NavItem key={child.id} item={child} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function Sidebar({ items = [] }) {
  return (
    <nav className="sidebar-nav">
      <p className="sidebar-heading">Contents</p>
      <ul className="nav-list">
        {items.map((item) => (
          <NavItem key={item.id} item={item} />
        ))}
      </ul>
    </nav>
  );
}
