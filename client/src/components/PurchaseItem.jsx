

function PurchaseItem({item}){
    return(
    <>
    <tr>
        <td><span>{item.id}</span></td>
        <td><span>{item.date}</span></td>
        <td><span>{item.items.name}</span></td>
        <td><span>{item.qty}</span></td>
        <td><span>{item.items.price}</span></td>
        <td><span>{item.items.price * item.qty}</span></td>
    </tr>
    </>
    )
}

export default PurchaseItem