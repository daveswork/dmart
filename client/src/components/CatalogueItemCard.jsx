import './CatalogueItemCard.css';

function CatalogueItemCard({item, updateShoppingCart}){

    function addToCart(){

        fetch(`/api/add-to-cart/${item.id}`)
        .then(resp => resp.json())
        .then(item =>{
            updateShoppingCart(item)
        })

    }


    const USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    })

    return(
        <div className="Card">
            <img src={item.item_image} alt={item.name}/>
            <p>{item.name}</p>
            <p>{USDollar.format(item.price)}</p>
            <p>{item.description}</p>
            <button onClick={addToCart}>Add to Cart</button>
        </div>
    )
}

export default CatalogueItemCard