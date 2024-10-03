import './CatalogueItemCard.css'

function CartItem({item, removeCartItem}){


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

    const sub_total = Number(item.qty) * Number(item.sale_price)

    return (
        <div className="Card">
            <img src={item.items.item_image} />
            <p>Quantity: {item.qty}</p>
            <p>Price: {item.sale_price}</p>
            <p>Subtotal: {USDollar.format(sub_total)}</p>
            <button onClick={removeFromCart}>Remove from Cart.</button>
        </div>
    )
}

export default CartItem
