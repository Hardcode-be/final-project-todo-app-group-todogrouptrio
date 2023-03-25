import "../scss/App.scss";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import PrivateRoute from "./services/PrivateRoute";
import Dashboard from "./components/Dashboard";
import ProjectTodoList from "./components/ProjectTodoList";
import Home from "./components/Home";
import UserConnection from "./components/UserConnection";


function App() {

  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />}/>
            <Route element={<PrivateRoute />}>
                <Route element={<Layout />}> 
                    <Route path="/dashboard" element={<Dashboard />} /> 
                    <Route path="/project/:id" element={<ProjectTodoList />} />
                    <Route path="/connections" element={<UserConnection />}/>
               </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
