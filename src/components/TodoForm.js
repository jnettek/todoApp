import React, { useState } from 'react'


export default function TodoForm(props) {
    const [Input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault()
        props.addTodo(Input)
        setInput('')
    }

    return (
        <div className='todo-form'>
            <form onSubmit={handleSubmit} >
                <input 
                // set the input value to nothing
                value={Input}
                onChange={(e) => setInput(e.target.value)} 
                className="todo-input" 
                placeholder='Add Work Unit'/>
                <button type="submit" className='todo-button'>Add Task</button>
            </form>
        </div>
    )
}