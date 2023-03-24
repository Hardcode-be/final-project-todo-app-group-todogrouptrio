import axios from "axios";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

function ProjectTodoList(){
    const { id } = useParams();
    const project = useLocation()

    console.log(project.state);


    useEffect(()=> {
        (async function (){
            try {
                let response = await axios.get()
            } catch (error) {
                console.log(error);
            }

        })();
    },[]);

    let todos = project.state.todos.map((todo, index) => {
        console.log("🚀 ~ file: ProjectTodoList.jsx:28 ~ todos ~ todo:", todo)

        return(
            <li className="m-2 p-2 border-2 bg-slate-500 text-gray-300" >{}. {todo.text}</li>
        )
    });

    const handleNewTodo = () => {
        console.log("asdsf");
    }

    return(
        <div className="border-8 m-14 pt-8 pl-8 pr-8">
            <h1 className="text-4xl p-2">{project.state.title}</h1>
            <h1 className="text-xl p-2">{project.state.description}</h1>


            <div className="border-2 p-2 bg-slate-400">
                <ol>
                    {todos}
                    {<a onClick={handleNewTodo} ><li className="m-2 p-2 border-2 bg-slate-500 text-gray-300" >{}. {}</li></a>}
                </ol>
            </div>

            <div className="flex justify-evenly m-3 p-4">
            <p>Created: {project.state.createdAt}</p>
            <p>Last Update: {project.state.updatedAt}</p>
            </div>
        </div>
    )
}

export default ProjectTodoList;