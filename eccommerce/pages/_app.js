import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import { useEffect, useState } from 'react'

export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState({})
  const [subTotal, setSubTotal] = useState(0)

  useEffect(() => {
    try {
      const cart = localStorage.getItem('cart')
      if (localStorage.getItem('cart') !== null) {
        setCart(JSON.parse(cart))
      }
    } catch (error) {
      localStorage.clear()
      console.error(error)
    }
  }, [])
  const saveCart = (myCart) => {
    localStorage.setItem('cart', JSON.stringify(myCart))
    let subt =0

    let keys = Object.keys(myCart)
    console.log(keys)
    for(let i = 0;i<keys.length; i++){
      console.log(myCart[keys[i]].price)
      subt += myCart[keys[i]].price * myCart[keys[i]].qty
    }
    setSubTotal(subt)
   
  }
  const removeFromCart = (itemCode, qty, price, name, size, variant) => {
    let newCart = cart
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty - qty

    } else {
      newCart[itemCode] = {
        qty,
        price,
        name,
        size,
        variant
      }
      setCart(newCart)
      saveCart(newCart)
    }
  }  
  

  const addToCart = (itemCode, qty, price, name, size, variant) => {
    let newCart = cart
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty + qty

    } else {
      newCart[itemCode] = {
        qty,
        price,
        name,
        size,
        variant
      }
      setCart(newCart)
      saveCart(newCart)
    }
  }
  const clearCart = () => {
    setCart({})
    saveCart({})

  }
  return <>
    <Navbar cart={cart}
      clearCart={clearCart}
      removeFromCart={removeFromCart}
      addToCart={addToCart}
      subTotal={subTotal}  />
    <Component cart={cart}
      clearCart={clearCart}
      removeFromCart={removeFromCart}
      addToCart={addToCart}
      subTotal={subTotal}
      {...pageProps} />
    <Footer />
  </>
}
