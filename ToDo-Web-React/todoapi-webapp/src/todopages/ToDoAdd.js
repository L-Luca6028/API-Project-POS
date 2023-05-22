import React, { useState } from 'react'
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../siteelements/navbar';

export default function ToDoAdd() {
  
    let navigate = useNavigate();

    const[todos, setTodos] = useState({
        priority:"",
        whatToDo:"",
        description:"",
        deadlineDate:"",
        finished:"false"
    })

    const{priority, whatToDo, description, deadlineDate, finished} = todos;


    const onInputChange = (e) => {
        setTodos({...todos, [e.target.name]: e.target.value});
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8080/ToDos/save", todos);
        navigate("/");
    } 

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
      
        return `${day}.${month}.${year}`;
      };
  
    return (
    <div>
        <Navbar></Navbar>
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text.center m-4'>ToDo hinzufügen</h2>
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
                            <input className='form-control' type='date' placeholder='Bsp: 1.1.2024' name='deadlineDate' value={deadlineDate} onChange={(e) => onInputChange(e)}
                            onBlur={(e) => {
                                const formattedDate = formatDate(e.target.value);
                                setTodos({ ...todos, deadlineDate: formattedDate });
                            }}
                            ></input>
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
