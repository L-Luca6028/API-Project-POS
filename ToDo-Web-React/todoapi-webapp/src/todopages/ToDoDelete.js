import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Link, useNavigate, useParams } from 'react-router-dom';
import Navbar from '../siteelements/navbar';

export default function ToDoDelete() {

    let navigate = useNavigate();

    const {id} = useParams(); 

    const[todos, setTodos] = useState({
        priority:"",
        whatToDo:"",
        description:"",
        deadlineDate:"",
        finished:"false"
    });

    const{priority, whatToDo, description, deadlineDate, finished} = todos;

    const onInputChange = (e) => {
        setTodos({...todos, [e.target.name]:e.target.value});
    };

    useEffect( () => {
        loadTodo();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8080/ToDos/${id}`, todos);
        navigate("/");
    } 

    const loadTodo = async () => {
        const result = await axios.get(`http://localhost:8080/ToDos/find/${id}`);
        setTodos(result.data);
    }


  return (
    <div>
        <Navbar></Navbar>
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text.center m-4'>ToDo bearbeiten</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className='mb-3'>
                            <label className='form-label'>Welche Priorität hat deine Vorhaben?</label>
                            <input className='form-control' type='number' placeholder='Zahl zwischen 1 und 10' name='priority' value={priority} onChange={(e) => onInputChange(e)}></input>
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Was hast du zu erledigen?</label>
                            <input className='form-control' type='text' placeholder='Rasenmähen' name='whatToDo' value={whatToDo} onChange={(e) => onInputChange(e)}></input>
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>zusätzliche Notizen?(optional)</label>
                            <input className='form-control' type='text' placeholder='4 cm hoher Rasen' name='description' value={description} onChange={(e) => onInputChange(e)}></input>
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Wann muss du fertig sein?</label>
                            <input className='form-control' type='text' placeholder='Bsp: 1.1.2024' name='deadlineDate' value={deadlineDate} onChange={(e) => onInputChange(e)}></input>
                        </div>
                        <div className='mb-3'>
                            <button className='btn btn-primary m-2'>Abschicken</button>
                            <Link  className='btn btn-danger m-2' to="/">Verwerfen</Link>
                        </div>
                    </form>
                </div>
            </div>        
        </div>
    </div>
  )
}
