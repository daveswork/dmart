import { useOutletContext } from "react-router-dom"


function Logout(){

    const {user, setUser} = useOutletContext()

    function logoutUser(){
        fetch(`/api/logout`,
            {
                method: "DELETE"
            }
        ).then((response)=> setUser(""))
    }

    return(
        <div>
            <button onClick={logoutUser}>Logout</button>
        </div>
    )
}

export default Logout