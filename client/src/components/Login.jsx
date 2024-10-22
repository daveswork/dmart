import { data, event } from "jquery"
import { useState } from "react"
import { useNavigate, useOutletContext } from "react-router-dom"


function Login(){

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const {setUser} = useOutletContext()
    const nav = useNavigate()

    function handleUsernameChange(event){
        setUsername(event.target.value)
    }
    function handlePasswordChange(event){
        setPassword(event.target.value)
    }

    function authUser(event){
        event.preventDefault()
        fetch("/api/login",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username: username, password:password})
        }).then((response)=>response.json())
        .then((data) =>{
            console.log(data)
            setUser(data)
            setUsername("")
            setPassword("")
            nav("/")
        })
    }

    return(
        <div>
            <form onSubmit={authUser}>
                <label htmlFor="username">Username:</label>
                <input onChange={(event)=>{handleUsernameChange(event)}} name="username" id="username" type="text" value={username}/>
                <label htmlFor="password">Password:</label>
                <input onChange={(event)=>{handlePasswordChange(event)}} name="password" id="password" type="password" value={password}/>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default Login