import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import { RouterProvider } from 'react-router-dom';
import {createBrowserRouter} from "react-router-dom"
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import Dashboard from "./APP/Pages/Dashboard"
import Create from "./APP/Pages/Create"
import Auth from './APP/Pages/Auth';

const router = createBrowserRouter ([
  {
    path:"/register",
    element: <Register/>
  },
  {
      path:"/Dashboard",
      element: <Auth><Dashboard/></Auth>
  },
  {
      path:"/Create",
      element: <Auth><Create/></Auth>
  },
  {
    path:"/",
    element: <Login/>
  }
])

import './index.css'
import 'react-toastify/dist/ReactToastify.css';
import Login from './APP/Pages/Login';
import Register from './APP/Pages/Register';
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(

  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ToastContainer autoClose={3000}/>
      <RouterProvider router={router}/>
    </QueryClientProvider>
  </React.StrictMode>
)
