import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './sitepages/Home';
import ToDoAdd from './todopages/ToDoAdd';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/home' element={<Home/>}></Route>
          <Route exact path='/add' element={<ToDoAdd/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
