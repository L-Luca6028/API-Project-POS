import React from 'react'
import { useState, useEffect } from 'react';
import axios from "axios";
import { Link, useParams } from 'react-router-dom';
import Navbar from '../siteelements/navbar';
import "./Home.css";

export default function Home() {
    const [todos, setTodos] = useState([])
    
    useEffect(() => {
      loadTodos();
    },[]);
  
    const loadTodos = async () => {
      const result = await axios.get("http://localhost:8080/ToDos/all");
      console.log(result.data);   
      const sortedData = result.data.sort((a, b) => b.priority - a.priority);     // damit die Daten nach Priorität sortiert angezeigt werden
      setTodos(sortedData);

    }

    const deleteTodo = async (id) => {
      await axios.delete(`http://localhost:8080/ToDos/${id}`);
      loadTodos();
    }


    // Fürs öffnen des Accordions
    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleCollapse = () => {
      setIsCollapsed(!isCollapsed);
    };

  return (
    <body>
      <div>
        <Navbar></Navbar>
        <div className='container-fluid'>
          {
            todos.map((todos) => (
              <div class="accordion m-1" id="accordionExample">
                <div class="accordion-item">
                  <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" onClick={toggleCollapse}>
                    {todos.priority}. {todos.whatToDo}
                    </button>
                  </h2>
                  <div id="collapseOne" class={`accordion-collapse collapse ${isCollapsed ? '' : 'show'}`}>
                    <div class="accordion-body">
                      <ul class="list-group list-group-flush">
                        <li class="list-group-item"><strong>zusätz. Infos: </strong>{todos.description}</li>
                        <li class="list-group-item"><strong>Fälligkeitsdatum: </strong>{todos.deadlineDate}</li>
                        <li class="list-group-item">
                          <Link className='btn btn-sm btn-outline-primary m-2' to={`/edit/${todos.id}`}>Bearbeiten</Link>
                          <button className='btn btn-sm btn-danger m-2' onClick={() => deleteTodo(todos.id)}>Löschen</button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              ))
            }
        </div>
        <Link id='addButton' to={`/add`}>Hinzufügen</Link>
      </div>
    </body>
    
  );
}
