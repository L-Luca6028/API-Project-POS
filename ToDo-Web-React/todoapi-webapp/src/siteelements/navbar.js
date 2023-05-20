import React, { useState } from 'react';

export default function Navbar() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <nav className="px-4 navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="/home">
        ToDos
      </a>
      <button className="navbar-toggler" type="button" onClick={toggleCollapse}      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className={`collapse navbar-collapse ${isCollapsed ? '' : 'show'}`}>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link" href="/add">
              Hinzufügen
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
