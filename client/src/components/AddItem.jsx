import { useState } from "react"
import { useOutletContext } from "react-router-dom"




function AddItem(){

    const {updateProductList} = useOutletContext()
    const [item, setItem] = useState({
        name: "",
        description: "", 
        qty: 0,
        item_image: "",
        price:0
    })

    function handleChange(event){
        setItem({...item, [event.target.name]: event.target.value})
    }

    function handleSubmit(event){
        event.preventDefault()
        console.log(JSON.stringify(item))

        fetch(`/api/items`, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(item)

        })
        .then(response => response.json())
        .then( data =>{
            setItem({
                name: "",
                description: "", 
                qty: 0,
                item_image: "",
                price:0
            })
            updateProductList(data) 
        })
    }

    return(
        <div>
            Hello, AddItem!
            <form onSubmit={(event) => handleSubmit(event)}>
                <label htmlFor="name">Item Name: </label>
                <input onChange={(event)=>{handleChange(event)}} name="name" id="name" type="text" value={item.name}/>
                <br/>
                <label htmlFor="description">Item Description: </label>
                <input onChange={(event)=>{handleChange(event)}} name="description" id="description" type="text" value={item.description}/>
                <br />
                <label htmlFor="qty">Quantity: </label>
                <input onChange={(event)=>{handleChange(event)}} name="qty" id="qty" type="number" value={item.qty}/>
                <br/>
                <label htmlFor="item_image">Image link: </label>
                <input onChange={(event)=>{handleChange(event)}} name="item_image" id="item_image" type="string" value={item.item_image}/>
                <br/>
                <label htmlFor="price">Price: </label>
                <input onChange={(event)=>{handleChange(event)}} name="price" id="price" type="number" value={item.price}/>
                <br/>
                <input type="submit" value="Submit new item."/>
            </form>
        </div>
    )
}

export default AddItem
