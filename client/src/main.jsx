import { React, StrictMode } from 'react'
import {createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import CatalogueItemCard from './components/CatalogueItemCard.jsx'
import Catalogue from './components/Catalogue.jsx'
import Cart from './components/Cart.jsx'
import Purchases from './components/Purchases.jsx'
import AddItem from './components/AddItem.jsx'
import Profile from './components/Profile.jsx'
import Login from './components/Login.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { itemsLoader, itemDetailsLoader, cartListLoader, purchasesListLoader } from './loaders.js'

import ErrorPage  from './components/ErrorPage.jsx'
import Logout from './components/Logout.jsx'
import Signup from './components/Signup.jsx'
import Cancel from './components/Cancel.jsx'


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
        path:"/cancel",
        element: <Cancel />
      },
      {
        path: '/',
        element: <Catalogue />,
      }, 
      {
        path: '/cart',
        element: <Cart />,
      }, 
      {
        path: '/purchases',
        element: <Purchases />,
      },
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path: '/add-item',
        element: <AddItem />
      }, 
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/logout',
        element: <Logout />
      },
      {
        path: '/signup',
        element: <Signup />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)

