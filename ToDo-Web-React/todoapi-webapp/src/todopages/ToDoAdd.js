import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function ToDoAdd() {
  
    let navigate = useNavigate();

    const[todos, setTodos] = useState([])

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8080/ToDos/save", todos);
        navigate("/home");
    }
  
    return (
    <div className='container'>
        
        <form onSubmit={(e) => onSubmit(e)}>
            <div>
                <label>Welche Priorität hat deine Vorhaben?</label>
                <input type='text' placeholder='Zahl zwischen 1 und 10'></input>
            </div>
            <div>
                <label>Was hast du zu erledigen?</label>
                <input type='text' placeholder='Rasenmähen'></input>
            </div>
            <div>
                <label>zusätzliche Notizen?(optional)</label>
                <input type='text' placeho lder='4 cm hoher Rasen'></input>
            </div>
            <div>
                <label>Wann muss du fertig sein?</label>
                <input type='text' placeholder='Bsp: 1.1.2024'></input>
            </div>
            <div>
                <button className='btn btn-primary'>Abschicken</button>
                <button className='btn btn-danger'>Verwerfen</button>
            </div>
        </form>
        
    </div>
  )
}
