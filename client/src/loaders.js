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

export {
    itemsLoader, 
    itemDetailsLoader
}