import React, { useEffect, useState } from "react";
import Navbar from "./component/navbar/Navbar"
import { v4 as uuidv4 } from 'uuid';
import lottie from "lottie-web";
import { defineElement } from "@lordicon/element";

// define "lord-icon" custom element with default properties
defineElement(lottie.loadAnimation);
// import './App.css'

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let t2 = JSON.parse(localStorage.getItem("todos"))
      setTodos(t2)
    }
  }, [])

  const saveTols = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setShowFinished(!showFinished)
  }

  function handleEdit(e, id) {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveTols()
  }
  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveTols()
  }

  function handleAdd() {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    console.log(todos)
    saveTols()
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault(); 
      handleAdd();
    }
  }
  


  function handleChange(e) {
    setTodo(e.target.value)
  }

  function handleChecbox(e) {
    let id = e.target.name;
    console.log(id)
    let index = todos.findIndex(item => item.id === id)
    console.log(index)
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    saveTols()
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-xl p-5  bg-violet-100 min-h-[80vh] w-1/2">
        <h1 className="font-bold text-center text-xl">iTask - Manage Todos</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className="text-lg font-bold ">Add Todo</h2>
          <input onChange={handleChange} onKeyDown={handleKeyDown} value={todo} type="text" className="w-full rounded-full px-5 py-2 " />
          <button onClick={handleAdd} disabled={todo.length <= 3} className="bg-violet-800 disabled:bg-violet-700 hover:bg-violet-950 px-2 py-1 text-sm font-bold text-white rounded-md ">Add</button>
        </div>
        <input onChange={toggleFinished} type="checkbox" checked={setShowFinished} className="custom-checkbox cursor-pointer mx-1" />Show Finished
        <h2 className="text-lg font-bold">Your Todo</h2>
        <div className="todos">
          {todos.length === 0 && <div className="m-5">No Todo </div>}

          {todos.map(item => {

            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex w-1/2 justify-between my-2">
              <div className="flex gap-5 items-center">
                <input onChange={handleChecbox} type="checkbox" checked={item.isCompleted} name={item.id} />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => { handleEdit(e, item.id) }} className="bg-violet-800 hover:bg-violet-950 px-2 py-1 text-sm font-bold text-white rounded-md mx-1">
                  <lord-icon 
                  trigger="hover" 
                  src="https://cdn.lordicon.com/ghhwiltn.json" 
                  colors="primary:#ffffff,secondary:#ffffff">
                  </lord-icon>
                </button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className="bg-violet-800 hover:bg-violet-950 px-2 py-1 text-sm font-bold text-white rounded-md mx-1">
                  <lord-icon
                    trigger="hover"
                    src="https://cdn.lordicon.com/drxwpfop.json"
                    colors="primary:#ffffff,secondary:#ffffff">
                  </lord-icon>
                </button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
