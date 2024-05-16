
import { router } from './Routers'
import Main from './layouts/Main'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Login from './components/Login'
import Register from './components/Register'
import { RouterProvider } from 'react-router-dom';




function App() {

  return (

    <RouterProvider router={router}>      
    <Main></Main>
    </RouterProvider>

  
  )
}

export default App