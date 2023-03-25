import { useEffect, useState } from "react";
import useAuthStore from "../hooks/useAuthStore";
import axios from "axios";
import { BASE_URL, getHeader } from '../services/config'
import { useNavigate } from "react-router-dom";
import CreateProject from "./CreateProject";


function Dashboard() {
    const navigate = useNavigate();

    const [projects, setProjects] = useState([]);
    const token = useAuthStore(state => state.getToken());

    useEffect(() => {
        (async function () {
            try {
                let response = await axios.get(BASE_URL+'protected/user/projects',getHeader(token))
                setProjects(response.data)
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    const handleClick = (id, projectData) => navigate(`/project/${id}`, {state: projectData})

    let project = projects.map(project => {
        
        let creation = new Date(project.createdAt).toLocaleString("de-DE");
        let lastUpdate = new Date(project.updatedAt).toLocaleString("de-DE");
        
        if(creation === lastUpdate) lastUpdate = '';
        else lastUpdate = `updated: ${lastUpdate}`

        creation = `created: ${creation}`
        
        let todoAmount = 'Todos: '+project.todos.length;
        if(todoAmount === 0) todoAmount = '';

        let incompleteCount = 'Incompleted: '+project.incompleteCount;
        if(incompleteCount === 0) incompleteCount = '';

        
        //todo delete icon
        return (
            <a key={project._id} onClick={() => handleClick(project._id, project)}>
                <div className="flex justify-between flex-col border-4 p-4 h-64 rounded" >
                    <h1 className="text-xl font-bold text-center mb-2 pb-4">{project.title}</h1>
                    <hr />
                    <div className="h-44 pt-2 pb-2">
                        <span className="pt-4 pb-4 text-sm">{project.description}</span>
                    </div>
                    <hr />
                    <div className="pt-4 h-24">
                        <div className='flex justify-evenly pb-1'>
                            <h3 className="text-xs text-gray-600">{todoAmount}</h3>
                            <h3></h3>
                            <h3 className="text-xs text-gray-600">{incompleteCount}</h3>
                        </div>
                        <div className='flex flex-col text-center'>
                            <h4 className="text-xs text-gray-700">{creation}</h4>
                            <h4 className="text-xs text-gray-700">{lastUpdate}</h4>
                        </div>
                    </div>
                </div>
            </a>
        )
    });


    return(
        <div  className="grid grid-cols-4 gap-4 border-8 m-14 p-8">
            {project}
            <CreateProject />
        </div>
    )

}

export default Dashboard;