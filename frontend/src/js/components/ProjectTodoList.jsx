import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { BASE_URL, getHeader } from '../services/config';
import useAuthStore from "../hooks/useAuthStore";



function ProjectTodoList(){
    const { id } = useParams();
    const project = useLocation();
    const token = useAuthStore(state => state.getToken());

    const [showTodoInput, setShowTodoInput] = useState(false);
    const [newTodo, setNewTodo] = useState('');
    const [todoList, setTodos] = useState(project.state.todos);
    const [updateInfo, setUpdateInfo] = useState(project.state.updatedAt)

    const handleTodoInputView = () => setShowTodoInput(!showTodoInput);
    const handleNewTodo = async () => {
        let todoObj = {
            text: newTodo,
            completed: false
        }
        try {
            let response = await axios.put(BASE_URL+`protected/projects/${id}`, todoObj, getHeader(token));
            setTodos(response.data.todos);
            setUpdateInfo(response.data.updatedAt)
            setShowTodoInput(!showTodoInput);
            setNewTodo('');
        } catch (error) {
            console.log(error);
        }
    }
    const handleDelete = async (todoId) => {
        console.log(`projects/${id}/todo/${todoId}`);
        try {
            let response = await axios.delete(BASE_URL+`protected/projects/${id}/todo/${todoId}`, getHeader(token));
            setTodos(response.data.todos);
            setUpdateInfo(response.data.updatedAt)
        } catch (error) {
            console.log(error);
        }
    }

    let defaultView =
        <a onClick={handleTodoInputView} >
            <li className="flex justify-between m-2 p-3 border-2 bg-slate-600 text-gray-300" >
                <div>{todoList.length+1}.</div>
                <div>+ new todo</div>
                <div></div>
            </li>
        </a>

    let todoInput =
        <li className="flex justify-between m-2 pl-3 p-2 border-2 bg-slate-600 text-gray-300" >
            <div>{todoList.length+1}. 
                <input value={newTodo} onChange={(e)=>setNewTodo(e.target.value)} className="w-96 ml-2 m-0 p-1 rounded text-black" placeholder="new todo" type="text" />
            </div>
            <div>
                <button onClick={handleNewTodo} className="pl-2 pr-2 mr-3 rounded">Add Todo</button>
                <button onClick={handleTodoInputView} className="pl-2 pr-2 mr-3 rounded">Cancel</button>
            </div>
        </li>

    let creation = new Date(project.state.createdAt).toLocaleString("de-DE");
    let lastUpdate = new Date(updateInfo).toLocaleString("de-DE");

    let todos = todoList.map((todo, index) => {

        return(
            <li key={todo._id} className="flex justify-between m-2 p-3 border-2 bg-slate-500 text-gray-300" >
                <div className="line-through">
                    {index+1}. {todo.text}
                </div>
                <div>
                    <button className="pl-2 pr-2 mr-3 rounded">edit</button>
                    <button onClick={()=>handleDelete(todo._id)} className="pl-2 pr-2 mr-3 rounded">delete</button>
                    <button className="pl-2 pr-2 mr-3 rounded">done</button>
                </div>
            </li>
        )
    });

    return(
        <div className="border-8 m-14 pt-8 pl-8 pr-8">
            <h1 className="text-4xl p-2">{project.state.title}</h1>
            <h1 className="text-xl p-2">{project.state.description}</h1>


            <div className="border-2 p-2 bg-slate-400">
                <ul>
                    {todos}
                    {showTodoInput ? todoInput : defaultView}
                </ul>
            </div>

            <div className="flex justify-evenly m-3 p-4">
                <p>Created: {creation}</p>
                <p>Last Update: {lastUpdate}</p>
            </div>
        </div>
    )
}

export default ProjectTodoList;