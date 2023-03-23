import "../scss/App.scss";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import PrivateRoute from "./services/PrivateRoute";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ProjectTodoList from "./components/ProjectTodoList";

function App() {
  const products = [
    {
      id: 1,
      name: "Basic Tee",
      href: "#",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
      imageAlt: "Front of men's Basic Tee in black.",
      price: "$35",
      color: "Black",
    },
    // More products...
  ];

  return (
    <div className="App">
      <div className="container mx-auto">
        <h1 className="text-4xl text-center py-9">MaNiMa-Management-Tool</h1>

        <BrowserRouter>
          <Routes>
            <Route
                index
                element={
                    <div className="LogRegContainer">
                    <Login />
                    <div className="RegLogDivider"></div>
                    <Register />
                    </div>
                }
            />

            <Route element={<PrivateRoute />}>
                <Route element={<Layout />}> 
                    <Route path="/dashboard" element={<Dashboard />} /> 

                    <Route path="/details" element={<ProjectTodoList />} />

               </Route>
            </Route>


          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
