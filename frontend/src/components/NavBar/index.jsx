import { NavLink } from "react-router-dom";

const Navbar =()=>{
    return(
        <nav>
            <h1>new start</h1>
            <NavLink to ="/">Home</NavLink>
            <NavLink to ="category">Category</NavLink>
            <NavLink to ="about">About</NavLink>
            <NavLink to ="help">Help</NavLink>

        </nav>
    )
}
export default Navbar;