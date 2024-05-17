import {createBrowserRouter} from "react-router-dom"
import Main from "../layouts/Main"
import Home from "../pages/Home"
import About from "../pages/About"
import Cart from "../pages/Cart"
import Category from "../pages/Category"
import Register from "../components/Register"
import NotFound from "../pages/NotFound"

export const router = createBrowserRouter([
{
    path:"/" ,
    element:<Main/>,
    children:[
        {
            path:"",
            element:<Home/>
        },
        {
            path:"about",
            element:<About/>
        },
        {
            path:"cart",
            element: <Cart/>
        },
        {
            path:"category",
            element: <Category/>

        },
        {
            path:"register",
            element:<Register/>

        }
    ],
},
{
    path:"*",
    element:<NotFound/>
}

])





