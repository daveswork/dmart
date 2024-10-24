import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import "jquery"
import "bootstrap/dist/js/bootstrap"
import "bootstrap/dist/css/bootstrap.css"
import { Outlet, useLoaderData } from 'react-router-dom'
import NavBar from './components/NavBar'


function App() {
  const [count, setCount] = useState(0)
  const items = useLoaderData()

  // User State
  const [user, setUser] = useState(null);
  useEffect(()=>{
    fetch('/api/check_session')
    .then(response => {
      if(response.ok){
        setUser(response.json())
      }else{
        setUser("")
      }
    })
//     .then((data) => {
//         console.log(data)
//         setUser(data)}
// )

}, [])
  

  //==============================================================================================
  // ProductList states and functions
  const [productList, setProductList] = useState([])
  useEffect(()=>{
    fetch("/api/items")
    .then(response => response.json())
    .then(items =>{
      setProductList(items)
    })
  }, [])

  function updateProductList(newItem){
    setProductList([...productList, newItem])
  }

  //==============================================================================================
  // ShoppingCart states and functions
  const [shoppingCartList, setShoppingCartList] = useState([])
  useEffect(()=>{
    fetch("/api/cart")
    .then(response => response.json())
    .then(items=>{
      setShoppingCartList(items)
      console.log(shoppingCartList)
    })
  }, [])

  // Adding an item to the shopping cart list
  function updateShoppingCart(newCartItem){
    const itemExists = shoppingCartList.filter(item => item.id === newCartItem.id)
    if(itemExists.length === 0 ){
      setShoppingCartList([...shoppingCartList, newCartItem])
    }else{
      const new_list = shoppingCartList.map(item => {
        if (item.id === newCartItem.id){
          item.qty +=1
          return item
        }else {
          return item
        }
      })
      setShoppingCartList(new_list)
    }
    
  }


  // Removing an item from the shopping cart.
  function removeCartItem(cartItemId){
    const prunedCartItems = shoppingCartList.filter( item =>{
      if(item.id === cartItemId){
        return false
      } else {
        return true
      }
    })
    setShoppingCartList(prunedCartItems)
  }

  // Updating the quantities in the cart

  // BE
  
  function updateBeQty(item){fetch(`/api/cart/${item.id}`,
    {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({"qty": item.qty})
    }
    )
  }

  // FE
  function addOne(cartItemId){
    const updated_list = shoppingCartList.map(item => {
      if (item.id === cartItemId){
        item.qty += 1
        updateBeQty(item)
        return item
      }else {
        return item
      }
    })
    setShoppingCartList(updated_list)
  }

  function removeOne(cartItemId){
    const updated_list = shoppingCartList.map(item => {
      if (item.id === cartItemId){
        if (item.qty === 0){
          return item
        }
        item.qty -= 1
        updateBeQty(item)
        return item
      }else {
        return item
      }
    })
    setShoppingCartList(updated_list)
  }

  //==============================================================================================
  // PurchasesList states and functions
  const [purchasesList, setPurchasesList] = useState([])
  useEffect(()=>{
    fetch("/api/purchased_items")
    .then(response => response.json())
    .then(data => {
      console.log(data)
      setPurchasesList(data)

    })
  }, [])

  console.log(purchasesList)

  return (
  <div>
    <header><NavBar shoppingCartList={shoppingCartList} user={user} setUser={setUser}/></header>
    <Outlet context={{
      productList:productList, setProductList:setProductList, updateProductList:updateProductList,
      shoppingCartList:shoppingCartList, setShoppingCartList:setShoppingCartList, removeCartItem:removeCartItem, updateShoppingCart:updateShoppingCart, addOne:addOne, removeOne:removeOne,
      purchasesList:purchasesList, setPurchasesList:setPurchasesList,
      user:user, setUser:setUser
    }}/>
  </div>
  )
}

export default App
