import React from 'react'
import { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

export default function Home() {
    const [todos, setTodos] = useState([])

    useEffect(() => {
      loadTodos();
    },[]);
  
    const loadTodos = async () => {
      const result = await axios.get("http://localhost:8080/ToDos/all");
      console.log(result.data);
      setTodos(result.data);
    } 

  return (
    <div className='container'>Home
    <Link className='btn btn-secondary' to='/add'>Hinzufügen</Link>
        <table>
        <tbody>
          {
            todos.map((todos, index) => (
              <tr>
                <th scope='row' key={index}>{index+1}</th>
                <td>{todos.priority}</td>
                <td>{todos.whatToDo}</td>
                <td>{todos.description}</td>
                <td>{todos.deadlineDate}</td>
                <td className='btn btn-primary'>Add ToDo</td>
                <td className='btn btn-outline-primary'>Edit</td>
                <td className='btn btn-danger'>Löschen</td>
              </tr>
            ))
          }
        </tbody>
        </table> 
    </div>
  );
}
