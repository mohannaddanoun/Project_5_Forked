import {createBrowserRouter} from "react-router-dom"
import Main from "../layouts/Main"
import Home from "../pages/Home"
import About from "../pages/About"
import Cart from "../pages/Cart"
import Register from "../components/Register"
import Products from "../components/products/Products"

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
            path:"register",
            element:<Register/>

        },
        {
            path:"/:id",
            element:<Products/>
        }
        
    ]

}

])





