import { useOutletContext, useLoaderData } from "react-router-dom"
import CartItem from "./CartItem";
import './Catalogue.css';

function Cart(){

    const {shoppingCartList, removeCartItem, addOne, removeOne} = useOutletContext()
    console.log(shoppingCartList.length)
    
    const initial_value = 0
    const total_cart_value = shoppingCartList.reduce((total, item) => total + (Number(item.qty) * Number(item.sale_price)), initial_value)

    const item_cards = shoppingCartList.map((item, index)=>{
        return (
            <CartItem key={index} item={item} removeCartItem={removeCartItem} addOne={addOne} removeOne={removeOne}/>
        )
    }
)

const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
})


    return (
        <div>
            Current cart total: {USDollar.format(total_cart_value)}<br/>
            Your shopping cart items:
            <div className="catlogue">
                {item_cards}
            </div>
        </div>
    )
}

export default Cart
