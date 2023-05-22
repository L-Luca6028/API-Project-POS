import React, { useState } from 'react'
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

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
        await axios.post("http://192.168.0.73:8080/ToDos/save", todos);
        navigate("/home");
    } 

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
      
        return `${day}.${month}.${year}`;
      };
  
    return (
    <div className='container'>
        
        <form onSubmit={(e) => onSubmit(e)}>
            <div>
                <label>Welche Priorität hat deine Vorhaben?</label>
                <input type='number' placeholder='Zahl zwischen 1 und 10' name='priority' value={priority} onChange={(e) => onInputChange(e)}></input>
            </div>
            <div>
                <label>Was hast du zu erledigen?</label>
                <input type='text' placeholder='Rasenmähen' name='whatToDo' value={whatToDo} onChange={(e) => onInputChange(e)}></input>
            </div>
            <div>
                <label>zusätzliche Notizen?(optional)</label>
                <input type='text' placeholder='4 cm hoher Rasen' name='description' value={description} onChange={(e) => onInputChange(e)}></input>
            </div>
            <div>
                <label>Wann muss du fertig sein?</label>
                <input type='date' placeholder='Bsp: 1.1.2024' name='deadlineDate' value={deadlineDate} onChange={(e) => onInputChange(e)}
                onBlur={(e) => {
                    const formattedDate = formatDate(e.target.value);
                    setTodos({ ...todos, deadlineDate: formattedDate });
                  }}
                ></input>
            </div>
            <div>
                <button className='btn btn-primary'>Abschicken</button>
                <Link  className='btn btn-danger' to="/home">Verwerfen</Link>
            </div>
        </form>
        
    </div>
  )
}
