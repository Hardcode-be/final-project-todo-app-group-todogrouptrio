import '../scss/App.scss';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedPage from './components/ProtectedPage';
import PrivateRoute from './services/PrivateRoute';
import Register from './components/Register';
import Login from './components/Login';

function App() {

  return (
    <div className="App">
      <div className='container mx-auto'>
        <h1 className='text-4xl text-center py-9'>My Todo App</h1>

        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<h2>Home</h2>}/>

              <Route path='/register' element={<Register/>} />
              <Route path='/login' element={<Login/>} />

              <Route element={<PrivateRoute />}>
                <Route path='/protected' element={<ProtectedPage />} />
              </Route>
            </Route>
            
          </Routes>
        </BrowserRouter>

      </div>
    </div>
  );
}

export default App;
