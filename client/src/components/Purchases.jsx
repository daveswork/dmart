import { useEffect } from "react"
import { useOutletContext } from "react-router-dom"


function Purchases(){

    const {user, setUser} = useOutletContext()

    useEffect(()=>{
        fetch('/api/check_session')
        .then(response => response.json())
        .then((data) => {
            console.log(data)
            setUser(data)}
    )

    }, [])

    return (
        <div>
            Hello! <br/>
            Here are yourPurchases!
        </div>
    )
}

export default Purchases
