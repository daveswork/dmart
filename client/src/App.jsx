import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet, useLoaderData } from 'react-router-dom'
import NavBar from './components/NavBar'


function App() {
  const [count, setCount] = useState(0)
  const items = useLoaderData()

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
    console.log(shoppingCartList)
    
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

  //==============================================================================================
  // PurchasesList states and functions
  const [purchasesList, setPurchasesList] = useState([])
  useEffect(()=>{
    fetch("/api/purchases")
    .then(response => response.json())
    .then(items =>{
      setPurchasesList(items)
    })
  }, [])

  return (
  <div>
    <header><NavBar shoppingCartList={shoppingCartList}/></header>
    <Outlet context={{
      productList:productList, setProductList:setProductList,
      shoppingCartList:shoppingCartList, setShoppingCartList:setShoppingCartList, removeCartItem:removeCartItem, updateShoppingCart:updateShoppingCart,
      purchasesList:purchasesList, setPurchasesList:setPurchasesList
    }}/>
  </div>
  )
}

export default App
