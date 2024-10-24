import { event } from "jquery"
import { useState } from "react"
import { useOutletContext } from "react-router-dom"


function Signup(){


    const {user, setUser} = useOutletContext()
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")

    function handleFirstNameChange(event){
        setFirstName(event.target.value)
    }
    function handleLastNameChange(event){
        setLastName(event.target.value)
    }

    function handleUsernameChange(event){
        setUsername(event.target.value)
    }
    function handlePasswordChange(event){
        setPassword(event.target.value)
    }

    function handlePasswordConfirmationChange(event){
        setPasswordConfirmation(event.target.value)
    }

    function createUser(event){
        event.preventDefault()
        fetch("/api/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username:username,
                password:password,
                firstname:firstName,
                lastname:lastName
            })
        }).then((response)=>response.json())
        .then((data) => {
            console.log(data)
            setUser(data)
            setFirstName("")
            setLastName("")
            setUsername("")
            setPassword("")
            setPasswordConfirmation("")
        })
    }
    
    return(
        <div>
            <form onSubmit={createUser}>
                <label htmlFor="firstName">First Name</label>
                <input onChange={(event)=>{handleFirstNameChange(event)}} name="firstName" id="firstName" type="text" value={firstName}/><br/>
                <label htmlFor="lastName">Last Name</label>
                <input onChange={(event)=>{handleLastNameChange(event)}} name="lastName" id="lastName" type="text" value={lastName}/><br/>
                <label htmlFor="username">Username:</label>
                <input onChange={(event)=>{handleUsernameChange(event)}} name="username" id="username" type="text" value={username}/><br/>
                <label htmlFor="password">Password:</label>
                <input onChange={(event)=>{handlePasswordChange(event)}} name="password" id="password" type="password" value={password}/><br/>
                <label htmlFor="passwordConfirmation">Confirm Password:</label>
                <input onChange={(event)=>{handlePasswordConfirmationChange(event)}} name="passwordConfirmation" id="passwordConfirmation" type="password"/><br/>
                <input className="submit" type="submit" value="Submit"/>
            </form>

        </div>
    )
}

export default Signup