import Login from "./Login"
import Register from "./Register"
import useAuthStore from "../hooks/useAuthStore";
import { useEffect } from "react";
import { BASE_URL, getHeader } from '../services/config'
import { useNavigate } from "react-router-dom";
import axios from "axios";


function Home() {
    let navigate = useNavigate()

    const token = useAuthStore(state => state.getToken());
    const setUser = useAuthStore(state => state.setUser);


    useEffect(()=>{

        if (token) {
            (async function () {
                try {
                    let response = await axios(BASE_URL+'protected/status',getHeader(token))
                    if (response.data.success) {
                        response.data.token = token;
                        setUser(response.data);
                        navigate('/dashboard', {});
                    }
                } catch (error) {
                    console.log(error);
                }
            })();
        }
    })

    let view = token ? 
        <h1>'...loading'</h1> 
        : 
        <div className="container mx-auto">
            <h1 className="text-4xl text-center py-9">MaNiMa-Management-Tool</h1>
            <div className="LogRegContainer">
                <Login />
                <div className="RegLogDivider"></div>
                <Register />
            </div>
        </div>


    return (
        <>
            {view}
        </>
    )
}

export default Home;