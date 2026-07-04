import React, { useState, useRef, useEffect } from "react";

export default function Header({ user, usingMockAuth, onSignIn, onSignOut, onToggleSidebar }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="app-header">
      <div className="header-left">
        <button
          className="sidebar-toggle-btn"
          onClick={onToggleSidebar}
          aria-label="Toggle Sidebar"
        >
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <div className="header-logo">
          <span className="logo-icon-main">🤖</span>
          <span className="logo-text">InsideLLMs</span>
        </div>
      </div>

      <div className="header-right">
        {usingMockAuth && (
          <span className="mock-pill" title="Firebase credentials not loaded. local guest simulation is active.">
            ⚠️ Preview Mode
          </span>
        )}
        
        {user ? (
          <div className="profile-dropdown-container" ref={dropdownRef}>
            <button
              className="avatar-btn"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-expanded={dropdownOpen}
            >
              <img
                src={user.photoURL || "https://www.gravatar.com/avatar/?d=mp"}
                alt={user.displayName || "User"}
                className="user-avatar"
                referrerPolicy="no-referrer"
              />
            </button>

            {dropdownOpen && (
              <div className="profile-dropdown">
                <div className="dropdown-info">
                  <img
                    src={user.photoURL || "https://www.gravatar.com/avatar/?d=mp"}
                    alt={user.displayName || "User"}
                    className="dropdown-avatar"
                    referrerPolicy="no-referrer"
                  />
                  <div className="dropdown-details">
                    <span className="dropdown-name">{user.displayName || "Anonymous User"}</span>
                    <span className="dropdown-email">{user.email || ""}</span>
                  </div>
                </div>
                <div className="dropdown-divider" />
                <button className="dropdown-signout" onClick={() => { setDropdownOpen(false); onSignOut(); }}>
                  <svg
                    className="signout-icon"
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <button className="signin-btn-header" onClick={onSignIn}>
            <svg className="google-icon" viewBox="0 0 24 24" width="16" height="16">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                fill="#EA4335"
              />
            </svg>
            <span>Sign In</span>
          </button>
        )}
      </div>
    </header>
  );
}
