
import { router } from './Routers'
import Main from './layouts/Main'
import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider } from 'react-router-dom'
import './App.css'

function App() {

  return (

    <RouterProvider router={router}>      
    <Main></Main>
    </RouterProvider>

  
  )
}

export default App