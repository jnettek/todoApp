import React, { useState } from 'react'
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';

const TodoList = () =>{

const [todos, setTodos] = useState([]);


  const addTodo = (text) => {
    let id = 1;
    if(todos.length > 0) {
      id = todos[0].id + 1
    }
    let todo = {id: id, text: text, completed: false}
    let newTodos = [todo, ...todos]
    console.log(newTodos)
    setTodos(newTodos) }

  const removeTodo = (id) => {
    let updatedTodo = [...todos].filter((todo) => todo.id !== id)
    setTodos(updatedTodo)
  }

  const completeTodo = (id) => {
    let updatedTodo = todos.map((todo) => {
      if (todo.id === id) {
         todo.completed = !todo.completed
      }
      return todo
    })
    setTodos(updatedTodo)
  }

   

  return (


    <div className='container'>
    <div className="todo-app">
      <TodoForm addTodo={addTodo}/>
      {todos.map((todo)=>{
        return (
          <TodoItem 
          removeTodo={removeTodo} 
          completeTodo={completeTodo} 
          // removeTimer={removeTimer}
          todo={todo} 
          key={todo.id}/>
          )
        })}
    </div>
   </div>

  );
}

export default TodoList;