import React from 'react'
import { useState, useEffect } from 'react';
import axios from "axios";
import { Link, useParams } from 'react-router-dom';
import Navbar from '../siteelements/navbar';

export default function Home() {
    const [todos, setTodos] = useState([])
    
    useEffect(() => {
      loadTodos();
    },[]);
  
    const loadTodos = async () => {
      const result = await axios.get("http://192.168.0.191:8080/ToDos/all");
      console.log(result.data);   
      const sortedData = result.data.sort((a, b) => b.priority - a.priority);     // damit die Daten nach Priorität sortiert angezeigt werden
      setTodos(sortedData);

    }

    const deleteTodo = async (id) => {
      await axios.delete(`http://192.168.0.191:8080/ToDos/${id}`);
      loadTodos();
    }



  return (
    <div>
      <Navbar></Navbar>
      <div className='container'>
        <table className='table'>
          <thead>
            <tr>
              <th scope="col">Priorität</th>
              <th scope="col">Tätigkeit</th>
              <th scope="col">zusätzliches</th>
              <th scope="col">Fälligkeitsdatum</th>
              <th scope="col"> </th>
              <th scope="col"> </th>
            </tr>
          </thead>
          <tbody>
            {
              todos.map((todos) => (
                <tr>
                  <td>{todos.priority}</td>
                  <td>{todos.whatToDo}</td>
                  <td>{todos.description}</td>
                  <td>{todos.deadlineDate}</td>   
                  <td><Link className='btn btn-sm btn-outline-primary' to={`/edit/${todos.id}`}>Edit</Link></td>
                  <td><button className='btn btn-sm btn-danger' onClick={() => deleteTodo(todos.id)}>Löschen</button></td>
                </tr>
              ))
            }
          </tbody>
        </table> 
      </div>
    </div>
  );
}
