import React, { useState, useEffect } from 'react'; // Importa React e hooks useState e useEffect
import './App.css'; // Importa o arquivo de estilos CSS

function Todolist() {
  const [tasks, setTasks] = useState([]); //  armazenar a lista de tarefas
  const [taskName, setTaskName] = useState(''); //  armazenar o nome da tarefa
  const [taskDescription, setTaskDescription] = useState(''); // armazenar a descrição da tarefa
  const [deletedCount, setDeletedCount] = useState(0); //  contar o número de tarefas deletadas
  const [joke, setJoke] = useState(''); // Armazenando a piada do Chuck Norris

  useEffect(() => {
    //  API do Chuck Norris
    const fetchJoke = () => {
      fetch('https://api.chucknorris.io/jokes/random') // Fazendo a requisição GET para a API
        .then(response => response.json()) // Converte a resposta para JSON
        .then(data => setJoke(data.value)); // Define a piada no estado joke
    };

    fetchJoke(); // Busca a piada inicialmente

    const intervalId = setInterval(fetchJoke, 5000); // Atualiza a piada a cada 5 segundos

    return () => clearInterval(intervalId); // Limpa o intervalo quando o componente é desmontado
  }, []); // O array vazio [] significa que este efeito só executa uma vez, quando o componente é montado

  const addTask = () => {
    // Função para adicionar uma nova tarefa
    if (taskName.trim() && taskDescription.trim()) {
      // Verifica se o nome e a descrição da tarefa não estão vazios
      const now = new Date(); // Obtém a data e hora atuais
      const timestamp = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`; // Formata a data e hora
      setTasks([...tasks, { name: taskName, description: taskDescription, timestamp }]); // Adiciona a nova tarefa à lista de tarefas
      setTaskName(''); // Limpa o campo de nome da tarefa
      setTaskDescription(''); // Limpa o campo de descrição da tarefa
    }
  };

  const deleteTask = (index) => {
    // Função para deletar uma tarefa
    const newTasks = tasks.filter((_, i) => i !== index); // Filtra a lista de tarefas para remover a tarefa com o índice especificado
    setTasks(newTasks); // Atualiza a lista de tarefas
    setDeletedCount(deletedCount + 1); // Incrementa o contador de tarefas deletadas
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1><b>To</b>day</h1> {/* Título principal */}
        <p>Wake up, go ahead, do the thing not tomorrow, do <b>to</b>day</p> {/* Subtítulo */}
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
        /> {/* Campo de entrada para o nome da tarefa */}
        <input
          type="text"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          placeholder="Task Description"
        /> {/* Campo de entrada para a descrição da tarefa */}
        <button onClick={addTask}>Create todo</button> {/* Botão para criar a nova tarefa */}
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              <b>{task.name}</b>: {task.description} <br />
              <small>{task.timestamp}</small> <span style={{ color: 'red', cursor: 'pointer' }} onClick={() => deleteTask(index)}>x</span>
              {/* Exibe o nome, descrição e timestamp da tarefa, e um "x" vermelho para deletar a tarefa */}
            </li>
          ))}
        </ul>
        <h3>Motivational Chuck Norris Phrase</h3> {/* Título da seção de piada do Chuck Norris */}
        <p>{joke}</p> {/* Exibe a piada do Chuck Norris */}
      </header>
    </div>
  );
}

export default Todolist; // Exporta o componente Todolist como padrão