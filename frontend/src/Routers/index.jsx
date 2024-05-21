import {createBrowserRouter} from "react-router-dom"
import Main from "../layouts/Main"
import Home from "../pages/Home"
import About from "../pages/About"
import Cart from "../pages/Cart"
import NotFound from "../pages/NotFound"

import Register from "../components/Register"
import Products from "../components/products/Products"
import OneProduct from "../components/OneProduct/oneProduct"
import Login from "../components/Login"
import AdminHome from "../pages/AdminHome"

export const router = createBrowserRouter([
{
    path:"/" ,
    element:<Main/>,
    children:[
        {
            path:"",
            element:<Home/>,
            children:[
                
                
            ]
           
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

            path:"login",
            element:<Login/>

        },
        {
            path:"register",
            element:<Register/>
        },
        {
            path:"/:id",
            element:<Products/>
        },
        {
            path:"/product/:id",
            element:<OneProduct/>
        },
        
    ]

},
{
    path:"/adminPage",
    element:<AdminHome/>
},
{
    path:"*",
    element:<NotFound/>
}

])





