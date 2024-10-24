import { useEffect } from "react"
import { useOutletContext } from "react-router-dom"
import PurchaseItem from "./PurchaseItem"


function Purchases(){

    const {user, setUser, purchasesList} = useOutletContext()

    // useEffect(()=>{
    //     fetch('/api/check_session')
    //     .then(response => {
    //         if(response.ok){
    //             setUser(response.json())
    //         }else{
    //             setUser([])
    //         }
    //     })
    //     .then((data) => {
    //         console.log(data)
    //         setUser(data)}
    // )

    // }, [])

    // if(user && purchaseList){
    //     const purchaseItems = purchaseList.map((item, index) =>{
    //         return(
    //             <PurchaseItem key={index} item={item}/>
    //         )
    //     })
    // }

//     date: "2024-10-24T01:39:25"
// ​​​
// id: 1
// ​​​
// item_id: 8
// ​​​
// items: Object { description: "A basic pot", id: 8, item_image: "/pot.jpg", … }
// ​​​​
// cart: Array []
// ​​​​
// description: "A basic pot"
// ​​​​
// id: 8
// ​​​​
// item_image: "/pot.jpg"
// ​​​​
// name: "pot"
// ​​​​
// price: 20
// ​​​​
// qty: 1
// ​​​​
// <prototype>: Object { … }
// ​​​
// qty: 1
// ​​​
// sale_price: 20
// ​​​
// user_id: 1

    const purchaseItems = generatePurchasedItems(user, purchasesList)

    console.log("Values for user and purchaseList")
    console.log(user)
    console.log(purchasesList)
    console.log("=================================")

    function generatePurchasedItems(user, purchasesList){
        if(user && purchasesList){
            return(purchasesList.map((item, index)=>{
                return(<PurchaseItem key={index} item={item}/>)
            }))
        }else{
            return(<tr>No purchases found</tr>)
        }
    }


    return (
        <div>
            Hello! <br/>
            Here are your purchases, {user?user.firstname:"Guest"}!
            <table>
                <tbody>
                    <tr>
                       <th>Order ID</th>
                       <th>Date</th>
                       <th>Item</th>
                       <th>Quantity</th>
                       <th>Unit Price</th>
                       <th>Total</th>
                    </tr>
                    {purchaseItems}
                </tbody>
            </table>
        </div>
    )
}

export default Purchases
