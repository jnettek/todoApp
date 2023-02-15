import React, { useEffect, useState } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { BiCheckCircle } from "react-icons/bi";
import { CgPlayButtonO } from "react-icons/cg";
import { CgPlayPauseO } from "react-icons/cg";
import { AiOutlineFileDone } from "react-icons/ai";




export default function Todoitem(props) {
    const { todo, removeTodo, completeTodo } = props
    const [time, setTime] = useState(0);
    const [timerOn, setTimeron] = useState(false);



    useEffect(()=>{
        let interval = null;

        if(timerOn){
            interval = setInterval(()=>{
            setTime(prevtime => prevtime + 10)
            },10)

        } else {
            clearInterval(interval);
        }

        // CLEAN UP
        return () => clearInterval(interval)
    }, [timerOn])


    return (
        <section className="todo-box">

        <div className={todo.completed ? "todo-row complete" : "todo-row"}>
            {/* TAKS INPUT */}
            {todo.text}
         </div> 

        <div className="timerContainer" >
        {('0' + Math.floor((time / 60000)%60)).slice(-2)}:
        {/* minute ( 1000 millisecond is a second)*/}
        {('0' + Math.floor((time / 1000)%60)).slice(-2)}:
        {/* minute */}
        {('0' + ((time / 10)%100)).slice(-2)}

        <span>

            {!timerOn && time === 0 && (
                <CgPlayButtonO className="iconsTimer" onClick={()=> {setTimeron(true)}}/>
                )}
            {timerOn && (
                <CgPlayPauseO className="iconsTimer" onClick={()=> {setTimeron(false)}}/>
                )}
            {!timerOn && time !== 0 && (
                <CgPlayButtonO className="iconsTimer" onClick={()=> {setTimeron(true)}}/>
                )}
            {!timerOn && time > 0 && (
                <AiOutlineFileDone className="iconsTimer" onClick={()=> {setTime(0)}}/>
                )}
            
        </span>
        </div> 

        <div className="iconsContainer" >
        <BiCheckCircle onClick={()=> completeTodo(todo.id)}/>
        <RiCloseCircleLine style={{ marginRight: "5"}} onClick={ () => removeTodo(todo.id)}/>
        </div>

    </section>
        
)
};