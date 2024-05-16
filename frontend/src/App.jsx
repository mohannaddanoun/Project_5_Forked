
import { router } from './Routers'
import Main from './layouts/Main'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Register from './components/Register'



function App() {

  return (

    <RouterProvider router={router}>      
    <Main></Main>
    </RouterProvider>

  
  )
}

export default App