import { NavLink, useOutletContext } from "react-router-dom";
import './NavBar.css'

function NavBar({shoppingCartList, user, setUser}){


    const initialValue = 0
    const total_cart_items = shoppingCartList.reduce((total, item) => total + Number(item.qty), initialValue)


    function logoutUser(){
        fetch(`/api/logout`,
            {
                method: "DELETE"
            }
        ).then((response)=> {
            setUser("")
            // nav("/")
            
        })
    }


    return (
        <div>
            <nav className="my-navbar">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/cart">Cart: {total_cart_items}</NavLink>
                <NavLink to="/purchases">Purchases</NavLink>
                <NavLink to="/profile">Profile</NavLink>
                <NavLink to="/add-item">Add Item</NavLink>
                {user ? (<NavLink onClick={logoutUser}>Logout</NavLink>):(
                    <>
                    <NavLink to="/login">Login</NavLink>
                    <NavLink to="/signup">Signup</NavLink>
                    </>
                    )}
            </nav>
        </div>
    )
}

export default NavBar