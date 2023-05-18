import React from 'react'
import { useState, useEffect } from 'react';
import axios from "axios";
import { Link, useParams } from 'react-router-dom';

export default function Home() {
    const [todos, setTodos] = useState([])

    const {id} = useParams();

    useEffect(() => {
      loadTodos();
    },[]);
  
    const loadTodos = async () => {
      const result = await axios.get("http://localhost:8080/ToDos/all");
      console.log(result.data);
      setTodos(result.data);
    } 

    const deleteTodo = async (id) => {
      await axios.delete(`http://localhost:8080/ToDos/${id}`);
      loadTodos();
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
                <td><Link className='btn btn-outline-primary' to={`/edit/${todos.id}`}>Edit</Link></td>
                <td className='btn btn-danger' onClick={() => deleteTodo(todos.id)}>Löschen</td>
              </tr>
            ))
          }
        </tbody>
        </table> 
    </div>
  );
}
