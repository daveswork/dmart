import { NavLink } from "react-router-dom";

function NavBar(){
    return (
        <div>
            <nav className="navbar">
                <NavLink to="/home">Home</NavLink>
                <NavLink to="/cart">Cart</NavLink>
                <NavLink to="/purchases">Purchases</NavLink>
                <NavLink to="/profile">Profile</NavLink>
            </nav>
        </div>
    )
}

export default NavBar