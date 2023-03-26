import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../hooks/useAuthStore";
import { BASE_URL, getHeader } from '../services/config'


function Register() {
    let navigate = useNavigate()

    const authenticate = useAuthStore(state => state.authenticate);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleName = (evt) => setUsername(evt.target.value);
    const handlePassword = (evt) => setPassword(evt.target.value);

    const submitHandler = async (evt) => {
        evt.preventDefault();

        let newUser = {
            username: username,
            password: password,
        };

        try {
            let response = await axios.post(BASE_URL+'auth/register', newUser)
            if (response.data.success) {
                authenticate(response.data);
                navigate('/dashboard', {});
            }

        } catch (error) {
            console.error(error)
        }

        setUsername('');
        setPassword('');

    };

  return (
    <div className="RegisterContainer">
      <h2>Register</h2>
      <form onSubmit={submitHandler}>
        <input
          value={username}
          onChange={handleName}
          placeholder="Username"
          name="register"
          type="text"
          className="logreg-input"
        />
        <input
          value={password}
          onChange={handlePassword}
          placeholder="Password"
          type="password"
          name="password"
          className="logreg-input"
        />
        <button className="rounded-full" type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
