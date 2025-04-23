
import { use, useEffect, useState } from 'react'
import './App.css'

function App() {
  
  const [todos, setTodos] =  useState(()=>{
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved): [];
  });

  const [task, setTask] = useState("");
  const  [filter, setFilter] = useState("all");

  useEffect(()=>{
    localStorage.setItem("todos", JSON.stringify(todos));
  },[todos]);

  const handleAdd = (e)=>{
    e.preventDefault();
    if(task.trim()) return;

    setTodos([...todos, {text:task, completed:false, id:Date.now()}]);
    setTask("");
  };

  const toggleComplete = (id) =>{
    setTodos(
      todos.map(todo => todo.id ===id? {...todo, completed: !todo.completed}: todo)
    )
  };

  const deleteTodo = (id) =>{
    setTodos(todos.filter(todo=> todo.id !==id))
  };

  const filteredTodos  = todos.filter(todo =>{
    if(filter === "all") return true;
    return filter === "completed"?todo.completed:!todo.completed;
  });
  return (
    <>
        <div className="app">
          <h1>📝 Todo  App</h1>
          <form onSubmit={handleAdd}>
            <input 
              value={task}
              onChange={(e)=> setTask(e.target.value)}
              placeholder='Enter a task'
            />
            <button type='submit'>Add</button>
          </form>

          <div className="filter">
            <button onClick={()=> setFilter("all")}>All</button>
            <button onClick={()=>{setFilter("completed")}}>Completed</button>
            <button onClick={()=>{setFilter("pending")}}>Pending</button>
          </div>

          <ul>
            {filteredTodos.map((todo)=>(
              <li key={todo.id} className={todo.completed? "done":""}>
                {todo.text}
                <button onClick={()=> toggleComplete(todo.id)}>✔️</button>
                <button onClick={()=> deleteTodo(todo.id)}>🗑️</button>
              </li>
            ))}
          </ul>
        </div>
    </>
  )
}

export default App
