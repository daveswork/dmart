import { useNavigate, useOutletContext } from "react-router-dom"


function Logout(){

    const {user, setUser} = useOutletContext()
    const nav = useNavigate()

    function logoutUser(){
        fetch(`/api/logout`,
            {
                method: "DELETE"
            }
        ).then((response)=> {
            setUser("")
            nav("/")
            
        })
    }

    return(
        <div>
            <button onClick={logoutUser}>Logout</button>
        </div>
    )
}

export default Logout