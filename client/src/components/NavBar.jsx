import { NavLink } from "react-router-dom";
import './NavBar.css'

function NavBar({shoppingCartList}){


    const initialValue = 0
    const total_cart_items = shoppingCartList.reduce((total, item) => total + Number(item.qty), initialValue)
    return (
        <div>
            <nav className="navbar">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/cart">Cart: {total_cart_items}</NavLink>
                <NavLink to="/purchases">Purchases</NavLink>
                <NavLink to="/profile">Profile</NavLink>
            </nav>
        </div>
    )
}

export default NavBar