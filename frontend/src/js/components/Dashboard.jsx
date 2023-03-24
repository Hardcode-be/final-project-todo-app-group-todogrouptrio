import { useEffect, useState } from "react";
import useAuthStore from "../hooks/useAuthStore";
import axios from "axios";
import { BASE_URL, getHeader } from '../services/config'


function Dashboard() {

    const [projects, setProjects] = useState([]);
    console.log("🚀 ~ file: Dashboard.jsx:10 ~ Dashboard ~ projects:", projects)

    const user = useAuthStore(state => state.getUser());
    const token = useAuthStore(state => state.getToken());
    const isAuthenticated = useAuthStore(state => state.isAuthenticated());

    useEffect(() => {
        (async function () {
            try {
                let response = await axios(BASE_URL+'protected/user/projects',getHeader(token))
                setProjects(response.data)
            } catch (error) {
                console.log(error);
            }
        })();
      }, []);


    let project = projects.map(project => {
        
        let creation = new Date(project.createdAt).toLocaleString("de-DE");
        let lastUpdate = new Date(project.updatedAt).toLocaleString("de-DE");

        console.log("afdsaf  "+creation.slice(5), lastUpdate.slice(9));
        
        if(creation === lastUpdate) lastUpdate = '';
        else lastUpdate = `updated: ${lastUpdate}`

        creation = `created: ${creation}`
        
        let todoAmount = project.todos.length;
        if(todoAmount === 0) todoAmount = '';
        return (
            <div key={project._id} className="flex justify-between flex-col border-4 p-4  rounded" >
                <h1 className="text-xl font-bold text-center mb-2 pb-4">{project.title}</h1>
                <hr />
                <span className="pt-4 pb-4">{project.description}</span>
                <h3>{todoAmount}</h3>
                <hr />
                <div className="pt-4 pb-4">
                    <h4 className="text-xs text-gray-600">{creation}</h4>
                    <h4 className="text-xs text-gray-600">{lastUpdate}</h4>
                </div>
            </div>
        )
    })
    

    return(
        <div  className="grid grid-cols-4 gap-4 border-8 m-14 p-8">

                    {project}

            {/* <h2>{user}</h2> */}
        </div>
    )

}

export default Dashboard;