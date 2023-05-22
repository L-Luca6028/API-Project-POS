import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Link, useNavigate, useParams } from 'react-router-dom';


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
        await axios.put(`http://192.168.0.73:8080/ToDos/${id}`, todos);
        navigate("/home");
    } 

    const loadTodo = async () => {
        const result = await axios.get(`http://192.168.0.73:8080/ToDos/find/${id}`);
        setTodos(result.data);
    }


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
                <input type='text' placeholder='Bsp: 1.1.2024' name='deadlineDate' value={deadlineDate} onChange={(e) => onInputChange(e)}></input>
            </div>
            <div>
                <button className='btn btn-primary'>Abschicken</button>
                <Link  className='btn btn-danger' to="/home">Verwerfen</Link>
            </div>
        </form>
    </div>
  )
}
