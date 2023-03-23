import '../scss/App.scss';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedPage from './components/ProtectedPage';
import PrivateRoute from './services/PrivateRoute';
import Register from './components/Register';
import Login from './components/Login';

function App() {
  const products = [
    {
      id: 1,
      name: 'Basic Tee',
      href: '#',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
      imageAlt: "Front of men's Basic Tee in black.",
      price: '$35',
      color: 'Black',
    },
    // More products...
  ]

  return (
    <div className="App">
      <div className='container mx-auto'>
        <h1 className='text-4xl text-center py-9'>MaNiMa-Management-Tool</h1>


        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<h2>Home</h2>}/>

              <Route path='/register' element={<Register/>} />
              <Route path='/login' element={<Login/>} />
              <Route path='/projects' element={<Login/>} />


              <Route element={<PrivateRoute />}>
                <Route path='/protected' element={<ProtectedPage />} />
              </Route>
            </Route>
            
          </Routes>
        </BrowserRouter>

      </div> 
      <form >
        <input className='input-test' type="text" />
        <input className='input-test' type="text" />
        <button>Login</button>
      </form>

      <button>Kein Account? Register here!</button>


      <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Wäsche waschen</h2>

        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    </div>
  );
}

export default App;
