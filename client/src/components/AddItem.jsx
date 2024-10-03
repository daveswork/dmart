import { useState } from "react"





function AddItem(){

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
    }

    return(
        <div>
            Hello, AddItem!
            <form onSubmit={(event) => handleSubmit(event)}>
                <label htmlFor="name">Item Name: </label>
                <input onChange={(event)=>{handleChange(event)}} name="name" id="name" type="text"/>
                <br/>
                <label htmlFor="description">Item Description: </label>
                <input onChange={(event)=>{handleChange(event)}} name="description" id="description" type="text"/>
                <br />
                <label htmlFor="qty">Quantity: </label>
                <input onChange={(event)=>{handleChange(event)}} name="qty" id="qty" type="number"/>
                <br/>
                <label htmlFor="item_image">Image link: </label>
                <input onChange={(event)=>{handleChange(event)}} name="item_image" id="item_image" type="string"/>
                <br/>
                <label htmlFor="price">Price: </label>
                <input onChange={(event)=>{handleChange(event)}} name="price" id="price" type="number"/>
                <br/>
                <input type="submit" value="Submit new item."/>
            </form>
        </div>
    )
}

export default AddItem
