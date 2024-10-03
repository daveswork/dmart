async function itemsLoader({ request, params }) {
    const res = await fetch("/api/items")
      .then(resp => resp.json())
    return res
  }


async function itemDetailsLoader({ request, params}){
    const res = await fetch(`/api/items/${params.id}`)
        .then(resp => resp.json())
    return res
}

async function cartListLoader({request, params}){
  const res = await fetch(`/api/cart`)
    .then(resp => resp.json())
    return res
}

async function purchasesListLoader({request, params}){
  const res = await fetch(`/api/purchases`)
  .then(resp => resp.json())
  return res
}

export {
    itemsLoader, 
    itemDetailsLoader,
    cartListLoader,
    purchasesListLoader
}