import React, { useState } from 'react';
import todoImage from './todo.png';
import "./navbar.css";

export default function Navbar() {
  return (
    
    <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
      <div className="container-fluid d-flex justify-content-center align-items-center">
        <a className="navbar-brand" href="/" >To    <img src={todoImage}></img>   Do</a>
      </div>
    </nav>
    
  );
}
