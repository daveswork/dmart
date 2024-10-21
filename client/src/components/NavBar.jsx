import { NavLink } from "react-router-dom";
import './NavBar.css'

function NavBar({shoppingCartList}){


    const initialValue = 0
    const total_cart_items = shoppingCartList.reduce((total, item) => total + Number(item.qty), initialValue)
    return (
        <div>
            <nav className="my-navbar">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/cart">Cart: {total_cart_items}</NavLink>
                <NavLink to="/purchases">Purchases</NavLink>
                <NavLink to="/profile">Profile</NavLink>
                <NavLink to="/add-item">Add Item</NavLink>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/logout">Logout</NavLink>
            </nav>
        </div>
    )
}

export default NavBar