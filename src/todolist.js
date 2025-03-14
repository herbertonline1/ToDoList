import React, { useState, useEffect } from 'react'; 
import './App.css'; 

function Todolist() {
  const [tasks, setTasks] = useState([]); 
  const [taskName, setTaskName] = useState(''); 
  const [taskDescription, setTaskDescription] = useState(''); 
  const [deletedCount, setDeletedCount] = useState(0); 
  const [joke, setJoke] = useState(''); 

  useEffect(() => {
   
    const fetchJoke = () => {
      fetch('https://api.chucknorris.io/jokes/random') 
        .then(response => response.json()) 
        .then(data => setJoke(data.value)); 
    };

    fetchJoke(); 

    const intervalId = setInterval(fetchJoke, 5000); 

    return () => clearInterval(intervalId); 
  }, []); 

  const addTask = () => {
   
    if (taskName.trim() && taskDescription.trim()) {
      
      const now = new Date(); 
      const timestamp = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`; 
      setTasks([...tasks, { name: taskName, description: taskDescription, timestamp }]); 
      setTaskName(''); 
      setTaskDescription(''); 
    }
  };

  const deleteTask = (index) => {
    
    const newTasks = tasks.filter((_, i) => i !== index); 
    setTasks(newTasks); 
    setDeletedCount(deletedCount + 1); 
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1><b>To</b>day</h1> 
        <p>Wake up, go ahead, do the thing not tomorrow, do <b>to</b>day</p> 
        <h2>Add new to do</h2> {/* Título da seção de adicionar nova tarefa */}
        <div className="counter-container">
          <p>Finished tasks quantity</p> {/* Título da seção de quantidade de tarefas deletadas */}
          <p>{deletedCount}</p> {/* Exibe a quantidade de tarefas deletadas */}
        </div>
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Task Name"
        /> 
        <input
          type="text"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          placeholder="Task Description"
        /> 
        <button onClick={addTask}>Create todo</button> {/* Botão para criar a nova tarefa */}
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              <b>{task.name}</b>: {task.description} <br />
              <small>{task.timestamp}</small> <span style={{ color: 'red', cursor: 'pointer' }} onClick={() => deleteTask(index)}>x</span>
              
            </li>
          ))}
        </ul>
        <h3>Motivational Chuck Norris Phrase</h3> {/* Título da seção de piada do Chuck Norris */}
        <p>{joke}</p> {/* Exibe a piada do Chuck Norris */}
      </header>
    </div>
  );
}

export default Todolist; 
