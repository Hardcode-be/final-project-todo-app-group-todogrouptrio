import { useState } from "react";
import axios from "axios";
import { BASE_URL, getHeader } from '../services/config'
import useAuthStore from "../hooks/useAuthStore";
import { useNavigate } from "react-router-dom";


function CreateProject() {
    const navigate = useNavigate()
    const token = useAuthStore(state => state.getToken());

    const [showInputs, setShowInputs] = useState(false)

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('')

    const changeView = () => setShowInputs(!showInputs);
    const handleNewProject = async () => {

        let newProject = {
            title: title,
            description: description
        }

        try {
            let response = await axios.post(BASE_URL+'protected/projects', newProject, getHeader(token))
            console.log("🚀 ~ file: CreateProject.jsx:22 ~ handleNewProject ~ response:", response)
            navigate('/', {})
            setShowInputs(!showInputs)
        } catch (error) {
            console.log(error);
        }

        setTitle('');
        setDescription('');

    }

    let defaultView =
        <a onClick={() => changeView()}>
            <div className="flex justify-between flex-col border-4 p-4 h-64 rounded bg-slate-300" >
                <h1 className="text-xl font-bold text-center mb-2 pb-4">New Project</h1>
                <hr />
                <div className="h-44 text-center ">
                    <p className="pt-4 pb-4 text-center text-7xl text-gray-600">+</p>
                </div>
                <hr />
                <div className="pt-4 pb-2">
                    <h4 className="text-xs text-gray-600">create now</h4>
                </div>
            </div>
        </a>
    

    let projectInput = 
        <div className="flex justify-between flex-col border-4 pl-4 pr-4 h-64 rounded relative bg-slate-500" >
            <button onClick={() => changeView()} className="absolute top-0 right-0 rounded-full p-2 border-0 text-black" >X</button>
            <input value={title} onChange={(e)=>setTitle(e.target.value)} className="border-2 p-1"  placeholder="Title" type="text" />
            <hr />
            <div className="h-44 text-center pt-2 pb-1">
                <textarea value={description} onChange={(e)=>setDescription(e.target.value)}  className="border-2" placeholder="Describe your project here" name="" id="" cols="18" rows="4"></textarea>
            </div>
            <hr />
            <div className="pt-1 pb-2 flex justify-center">
                <button className="rounded-full p-2 bg-slate-500 text-cyan-50" onClick={() => handleNewProject()} >Create Project</button>
            </div>
        </div>


    return(
        <>
            {showInputs ?  projectInput : defaultView}
        </>
    )
}

export default CreateProject;