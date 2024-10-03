import { React, StrictMode } from 'react'
import {createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import CatalogueItemCard from './components/CatalogueItemCard.jsx'
import Catalogue from './components/Catalogue.jsx'
import Cart from './components/Cart.jsx'
import Purchases from './components/Purchases.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { itemsLoader, itemDetailsLoader, cartListLoader, purchasesListLoader } from './loaders.js'

import ErrorPage  from './components/ErrorPage.jsx'


// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    loader: itemsLoader, 
    children: [
      {
        path: '/',
        element: <Catalogue />,
        loader: itemsLoader
      }, 
      {
        path: '/cart',
        element: <Cart />,
        loader: cartListLoader
      }, 
      {
        path: '/purchases',
        element: <Purchases />,
        loader: purchasesListLoader
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)

