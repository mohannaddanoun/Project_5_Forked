import {createBrowserRouter} from "react-router-dom"
import Main from "../layouts/Main"
import Home from "../pages/Home/index"
import About from "../pages/About/index"
export const router = createBrowserRouter([
{
    path:"/main" ,
    element:<Main/>,
    children:[
        {
            path:"",
            element:<Home/>
        },
        {
            path:"about",
            element:<About/>
        }
    ]

}

])





