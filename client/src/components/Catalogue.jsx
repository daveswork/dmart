import { useOutletContext, useLoaderData } from "react-router-dom";
import CatalogueItemCard from "./CatalogueItemCard";
import './Catalogue.css';


function Catalogue(){

    const {productList, updateShoppingCart} = useOutletContext()
    const item_cards = productList.map((item, index)=>{
        return (
            <CatalogueItemCard key={index} item={item} updateShoppingCart={updateShoppingCart}/>
        )
    }

    )
    
    return(
        <div>
            <p>Hello, catalogue.</p>
            <div className="catalogue">
            {item_cards}
            </div>
        </div>
    )
}


export default Catalogue