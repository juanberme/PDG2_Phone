

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';

//paginas
import Begin from './routes/Begin';
import Login from './routes/Login';
import Tags from './routes/Tags';
import Final from './routes/Final';
import Error from './routes/Error';
import Prueba from './routes/prueba';
import { Admin } from './routes/Admin';
import { NewAdmin } from './routes/NewAdmin';
import Results from './routes/Results';
import Tags2 from './routes/Tags2';
import Tags3 from './routes/Tags3';
import Tags4 from './routes/Tags4';



const router = createBrowserRouter([
  {
    path:'/',
    element: <Begin/>,
    errorElement: <Error/>
  },
  {
    path:'/login',
    element: <Login/>
  },
  {
    path:'/tags',
    element: <Tags/>
  },
  {
    path:'/tags2',
    element: <Tags2/>
  },
  {
    path:'/tags3',
    element: <Tags3/>
  },
  {
    path:'/tags4',
    element: <Tags4/>
  },
  {
    path:'/final',
    element: <Final/>
  },
  {
    path:'/admin',
    element: <Admin/>
  },{
    path:'/newAdmin',
    element: <NewAdmin/>
  },{
    path: '/Prueba',
    element: <Prueba/>
  },{
    path: '/resultados',
    element: <Results/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <RouterProvider router={router} />
);

//<App />
