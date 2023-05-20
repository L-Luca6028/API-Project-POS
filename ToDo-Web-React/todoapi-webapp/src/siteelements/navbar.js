import React from 'react'

export default function navbar() {
  return (
    <div>
        <nav className="px-4 navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href='/home'>ToDos</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <a className="nav-link" href="/add">Hinzufügen</a>
                </li>
                </ul>
            </div>
        </nav>
    </div>
  )
}
