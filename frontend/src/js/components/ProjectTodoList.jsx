import axios from "axios";
import { BASE_URL, getHeader } from '../services/config';

import useAuthStore from "../hooks/useAuthStore";
import EditSubmit from "./helper/EditSubmit";

import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";


function ProjectTodoList(){

    const { id } = useParams();
    const project = useLocation();
    const token = useAuthStore(state => state.getToken());
    const navigate = useNavigate();

    const [showTodoInput, setShowTodoInput] = useState(false);
    const [showTitleInput, setShowTitleInput] = useState(false);
    const [showDescriptionInput, setShowDescriptionInput] = useState(false);
    const [showDoubleCheck, setShowDoubleCheck] = useState(false);

    const [newTodo, setNewTodo] = useState('');
    const [title, setTitle] = useState(project.state.title);
    const [description, setDescription] = useState(project.state.description);

    const [todoList, setTodos] = useState(project.state.todos);
    const [updateInfo, setUpdateInfo] = useState(project.state.updatedAt)

    const handleTodoInputView = () => setShowTodoInput(!showTodoInput);
    const handleTitleView = () => setShowTitleInput(!showTitleInput)
    const handleDescriptionView = () => setShowDescriptionInput(!showDescriptionInput);
    const handleDoubleCheck = () => setShowDoubleCheck(!showDoubleCheck)

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

    const handleProjectUpdate = async () => {
        let updatedProject = {
            title: title,
            description: description
        }
        try {
            let response = await axios.patch(BASE_URL+`protected/projects/${id}`, updatedProject, getHeader(token));
            setUpdateInfo(response.data.updatedAt);
            setShowTitleInput(false);
            setShowDescriptionInput(false);
        } catch (error) {
            console.log(error);
        }
    }

    const handleDeleteProject = async () => {
        try {
            let response = await axios.delete(BASE_URL+`protected/projects/${id}`, getHeader(token));
            if(response.status === 200) navigate('/dashboard', {})
        } catch (error) {
            console.log(error);
        }
    }

    let btnStyle = 'pl-2 pr-2 mr-3 rounded';
    let inputStyle = 'w-96 ml-2 m-0 p-1 rounded text-black'

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
                <input value={newTodo} onChange={(e)=>setNewTodo(e.target.value)} className={inputStyle} placeholder="new todo" type="text" />
            </div>
            <div>
                <button onClick={handleNewTodo} className={btnStyle}>Add Todo</button>
                <button onClick={handleTodoInputView} className={btnStyle}>Cancel</button>
            </div>
        </li>

    let creation = new Date(project.state.createdAt).toLocaleString("de-DE");
    let lastUpdate = new Date(updateInfo).toLocaleString("de-DE");

    let todos = todoList.map((todo, index) => {
        let taskStyle = "";
        if (todo.completed) taskStyle = "line-through";

        return(
            <li key={todo._id} className="flex justify-between m-2 p-3 border-2 bg-slate-500 text-gray-300" >
                <EditSubmit 
                    setTodosCallback={setTodos}
                    setUpdateInfoCallback={setUpdateInfo}
                    taskStyle={taskStyle} 
                    index={index} 
                    todo={todo}
                />
            </li>
        )
    });


    return(
        <div className="border-8 m-14 pt-8 pl-8 pr-8">
            <div className='flex justify-between h-24'>
                <div>
                    {/* -----titel----- */}
                    <div className='flex h-12'>
                        {showTitleInput ? 
                            <input value={title} onChange={(e)=>setTitle(e.target.value)} className={inputStyle+' mr-3 text-2xl pl-3 '} placeholder="new todo" type="text"></input> 
                            : 
                            <h1 className="text-4xl p-2">{title}</h1>}
                        {showTitleInput ? 
                            <>
                                <button className={btnStyle} onClick={handleProjectUpdate}>ok</button>
                                <button className={btnStyle} onClick={handleTitleView}>x</button>
                            </>
                            :
                            <button onClick={handleTitleView} className='border-none'><img className='w-7' src="../pen.png" alt="" /></button>}
                    </div>
                    {/* -----Beschreibung----- */}
                    <div className='flex mt-2'>
                        {showDescriptionInput ?
                            <input value={description} onChange={(e)=>setDescription(e.target.value)} className={inputStyle+' mr-3 mt-1 pl-3'} placeholder="new todo" type="text"></input>
                            :
                            <h1 className="text-xl p-2">{description}</h1>}
                        {showDescriptionInput ?
                            <>
                                <button className={btnStyle} onClick={handleProjectUpdate}>ok</button>
                                <button className={btnStyle} onClick={handleDescriptionView}>x</button>
                            </>
                            :
                            <button onClick={handleDescriptionView} className='border-none'><img className='w-5' src="../pen.png" alt="" /></button>}
                    </div>
                </div>
                <div className='flex'>
                {/* -----Userliste----- */}
                    <div className='border-2 mr-4'>
                        <a>
                            {project.state.userList}
                        </a>
                    </div>
                {/* -----Delete----- */}
                    <div className='w-36' >
                        {showDoubleCheck ? 
                            <div className='flex flex-col' >
                                <button onClick={handleDeleteProject} className={btnStyle}>Sure? Yes</button>
                                <button onClick={handleDoubleCheck} className={btnStyle+' mt-4'}>Cancel</button>
                            </div>
                            :
                            <button onClick={handleDoubleCheck} className={btnStyle}>delete project</button>}
                    </div>
                </div>
            </div>
            {/* -----Todo-Liste----- */}
            <div className="border-2 p-2 mt-4 bg-slate-400">
                <ul>
                    {todos}
                    {showTodoInput ? todoInput : defaultView}
                </ul>
            </div>
            {/* -----Details----- */}
            <div className="flex justify-evenly m-3 p-4 ">
                <p>Created: {creation}</p>
                <p>Last Update: {lastUpdate}</p>
            </div>
        </div>
    )
}

export default ProjectTodoList;