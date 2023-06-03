import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import { set } from 'mongoose'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState({})
  const [subTotal, setSubTotal] = useState(0)
  const [user, setUser] = useState({ value: null })
  const [key, setKey] = useState(0)
  const router = useRouter()
  useEffect(() => {
    try {
      const cart = localStorage.getItem('cart')
      if (localStorage.getItem('cart')) {
        setCart(JSON.parse(cart))
        saveCart(JSON.parse(cart))
      }
    } catch (error) {
      localStorage.clear()
      console.error(error)
    }
    let token = localStorage.getItem('token')
    if (token) {
      setUser({ value: true })
      setKey(Math.random())
    }

  }, [router.query])
  const saveCart = (myCart) => {
    localStorage.setItem('cart', JSON.stringify(myCart))
    let subt = 0

    let keys = Object.keys(myCart)
    for (let i = 0; i < keys.length; i++) {
      subt += myCart[keys[i]].price * myCart[keys[i]].qty
    }
    setSubTotal(subt)

  }
  const removeFromCart = (itemCode, qty, price, name, size, variant) => {
    let newCart = JSON.parse(JSON.stringify(cart))
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty - qty

    }
    if (newCart[itemCode].qty <= 0) {
      delete newCart[itemCode]
    }
    setCart(newCart)
    saveCart(newCart)

  }

  const logout = () => {
    localStorage.clear()
    setUser({ value: null })
    setKey(Math.random())
  }
    const addToCart = (itemCode, qty, price, name, size, variant) => {
      let newCart = cart
      if (itemCode in cart) {
        newCart[itemCode].qty = cart[itemCode].qty + qty

      } else {
        newCart[itemCode] = {
          qty: 1,
          price,
          name,
          size,
          variant
        }
        setCart(newCart)
        saveCart(newCart)
      }
    }

    const buyNow = async (itemCode, qty, price, name, size, variant) => {
      saveCart({})
      let newCart = { itemCode: { qty, price, name, size, variant } }

      setCart(newCart)
      saveCart(newCart)


      router.push('/checkout')

    }
    const clearCart = () => {
      setCart({})
      saveCart({})

    }

    return <>
      <Navbar
        logout={logout}
        user={user}
        cart={cart}
        key={key}
        clearCart={clearCart}
        removeFromCart={removeFromCart}
        addToCart={addToCart}
        subTotal={subTotal} />
      <Component
        buyNow={buyNow}
        cart={cart}
        clearCart={clearCart}
        removeFromCart={removeFromCart}
        addToCart={addToCart}
        subTotal={subTotal}
        {...pageProps} />
      <Footer />
    </>
  }
