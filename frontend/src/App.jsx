import './App.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './Routers'
import Login from './components/Login'
import Main from './layouts/Main'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <RouterProvider router={router}>      
    <Main></Main>
    </RouterProvider>
  )
}

export default App