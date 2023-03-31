

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
    path:'/final',
    element: <Final/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <RouterProvider router={router} />
);

//<App />
