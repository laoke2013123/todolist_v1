import React from 'react'
import './App.css';
import Form from './component/Form.js';
import TodoList from './component/TodoList';
import {useState, useEffect} from 'react'

function App() {

    useEffect(()=>{
    getLocalTodos()
    },[]) 



  const[inputText,setInputText] = useState("")
  const[todos,setTodos] = useState([])
  const [status, setStatus] = useState('all')
  const[filteredTodos, setFilterTodos] = useState([])
  const saveLocalTodos = ()=>{
                    localStorage.setItem("todos", JSON.stringify(todos))
                              }
  const getLocalTodos = ()=>{
  if(localStorage.getItem("todos") === null){
    localStorage.setItem("todos",JSON.stringify([]))
  }
  else {
    let todoLocal = JSON.parse(localStorage.getItem("todos"))
    setTodos(todoLocal) 
  }
  }
     useEffect(()=>{
    filterHandler()
    saveLocalTodos()
  },[status,todos])
  const filterHandler = ()=>{
    switch(status){
      case 'completed':
        setFilterTodos(todos.filter((todo)=> todo.completed === true))
        break
      case 'uncompleted':
        setFilterTodos(todos.filter((todo)=> todo.completed === false))
        break
      default:
        setFilterTodos(todos)

    }
  }




  return (
    <div className="App">
      <header>
        <h3>My Todo List</h3>
      </header>
      <Form 
        todos={todos} 
        filteredTodos = {filteredTodos}
        inputText={inputText} 
        setTodos={setTodos} 
        setInputText={setInputText}
        setStatus = {setStatus}
        status={status}
      />
      <TodoList 
        filteredTodos ={filteredTodos}
        todos={todos} 
        setTodos = {setTodos}
      />
    </div>
  );
}

export default App;
