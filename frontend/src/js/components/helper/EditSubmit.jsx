import axios from "axios";
import { BASE_URL, getHeader } from '../../services/config';

import useAuthStore from "../../hooks/useAuthStore";

import { useState } from "react";
import { useParams } from "react-router-dom";


function EditSubmit({todo, taskStyle, index, setTodosCallback, setUpdateInfoCallback}) {
    const { id } = useParams();
    const token = useAuthStore(state => state.getToken());

    const [showEditInput, setShowEditInput] = useState(false);
    const [editInputValue, setEditInputValue] = useState(todo.text);

    let btnStyle = 'pl-2 pr-2 mr-3 rounded';

    
    const handleEditInputView = () => setShowEditInput(!showEditInput);
    const handleEditTodo = async (todoId) => {
        try {
            let response = await axios.put(BASE_URL+`protected/projects/${id}/todo/${todoId}`, {text: editInputValue}, getHeader(token));
            setTodosCallback(response.data.todos);
            setUpdateInfoCallback(response.data.updatedAt)
        } catch (error) {
            console.log(error);
        }
        handleEditInputView()
    }
    const handleCompletedTodo = async (todoId, state) => {
        try {
            let response = await axios.patch(BASE_URL+`protected/projects/${id}/todo/${todoId}`, {completed: !state}, getHeader(token));
            setTodosCallback(response.data.todos);
            setUpdateInfoCallback(response.data.updatedAt)
        } catch (error) {
            console.log(error);
        }
    }
    const handleDelete = async (todoId) => {
        try {
            let response = await axios.delete(BASE_URL+`protected/projects/${id}/todo/${todoId}`, getHeader(token));
            setTodosCallback(response.data.todos);
            setUpdateInfoCallback(response.data.updatedAt)
        } catch (error) {
            console.log(error);
        }
    }

    let InputOrTodo = showEditInput ? 
        <div className={taskStyle} >
            {index+1}. 
            <input
                onChange={(e)=>setEditInputValue(e.target.value)}
                className="w-96 ml-2 m-0 p-1 rounded text-black" 
                type="text"  
                placeholder={todo.text}
                value={editInputValue}
            />
        </div>
        :
        <div className={taskStyle} >
            {index+1}. {todo.text}
        </div>


    let editOrSubmitBtn = showEditInput ? 
        <button onClick={()=>handleEditTodo(todo._id)} className={btnStyle}>submit</button>
        :
        <button onClick={handleEditInputView} className={btnStyle}>edit</button>
    
    let editCancelOrDeleteDone = showEditInput ?
        <button onClick={handleEditInputView} className={btnStyle}>cancel</button>
        :
        <>
            <button onClick={()=>handleDelete(todo._id)} className={btnStyle}>delete</button>
            {todo.completed ? 
                <button onClick={()=>handleCompletedTodo(todo._id, todo.completed)} className={btnStyle}>undone</button>
                :
                <button onClick={()=>handleCompletedTodo(todo._id, todo.completed)} className={btnStyle}>done</button>
            }
        </>



    return(
        <>
            {InputOrTodo}
            <div>
                {editOrSubmitBtn}
                {editCancelOrDeleteDone}
            </div>
        </>
    )
}

export default EditSubmit;