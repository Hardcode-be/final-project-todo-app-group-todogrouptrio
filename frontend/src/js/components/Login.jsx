import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../hooks/useAuthStore";

function Login() {
    const navigate = useNavigate()

    const authenticate = useAuthStore(state => state.authenticate);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleName = (evt)=>setUsername(evt.target.value)
    const handlePassword = (evt)=>setPassword(evt.target.value)


    const submitHandler = async (evt)=>{
        evt.preventDefault();

        let newUser = {
            username: username,
            password: password
        }

        try {
            let response = await axios.post('http://localhost:8080/auth/login', newUser)
            authenticate(response.data);
            navigate('/dashboard', {})

        } catch (error) {
            console.error(error);
        }

        setUsername('');
        setPassword('');

    }


    return (
        <div className='LoginContainer'>
            <h2>Login</h2>
            <form onSubmit={submitHandler} >
                <input 
                    value={username} 
                    onChange={handleName} 
                    placeholder="Username" 
                    name="login" 
                    type="text" 
                    className="logreg-input"
                />
                <input 
                    value={password} 
                    onChange={handlePassword} 
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    className="logreg-input"
                />
                <button type="submit" >Login</button>
            </form>
        </div>

    );
}

export default Login;