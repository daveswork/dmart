import './CatalogueItemCard.css'

function CartItem({item, removeCartItem, addOne, removeOne}){


    console.log(item)
    function removeFromCart(){
        console.log(item.id)
        fetch(`/api/cart/${item.id}`,
            {
                method: "DELETE"
            }
        ).then(response => response.json())
        .then(()=> removeCartItem(item.id))
           
    }
    const USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    })

    function add_one(){
        addOne(item.id)
    }

    function remove_one(){
        removeOne(item.id)
    }

    const sub_total = Number(item.qty) * Number(item.sale_price)

    return (
        <div className="Card">
            <img src={item.items.item_image} />
            <p>Quantity: <button onClick={add_one}>+</button>{item.qty}<button onClick={remove_one}>-</button></p>
            <p>Price: {USDollar.format(item.sale_price)}</p>
            <p>Subtotal: {USDollar.format(sub_total)}</p>
            <button onClick={removeFromCart}>Remove from Cart.</button>
        </div>
    )
}

export default CartItem
