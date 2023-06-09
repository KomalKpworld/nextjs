import React, { useState } from 'react'
import Link from 'next/link'
import { useRef } from 'react';
import { AiOutlineShoppingCart, AiFillCloseCircle, AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import Head from 'next/head';
import Script from 'next/script';


const Checkout = ({ cart, removeFromCart, addToCart, subTotal }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [pincode, setpincode] = useState('')
  const [disabled, setDisabled] = useState(true)
  const handleChange = (e) => {
    if (e.target.name == "name") {
      setName(e.target.value)
    }
    if (e.target.name == "email") {
      setEmail(e.target.value)
    }
    if (e.target.name == "address") {
      setAddress(e.target.value)
    }
    if (e.target.name == "phone") {
      setPhone(e.target.value)
    }
    if (e.target.name == "pincode") {
      setpincode(e.target.value)
    }
    setTimeout(() => {
      if (name.length > 0 && email.length > 0 && address.length > 0 && phone.length > 0 && pincode.length > 0) {
        setDisabled(false)
      }
      else {
        setDisabled(true)
      }
    }, 1000)
  }
  const initiatePayment = async () => {
    let oid = Math.floor(Math.random() * Date.now())
    const data = { cart, subTotal, oid, email, name, address, phone, pincode }
    let getTranctionToken = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),

    })
    let txnTokenRes = await getTranctionToken.json()
    console.log(txnTokenRes)
    let txnToken = txnTokenRes.txnToken
    var config = {
      "root": "",
      "flow": "DEFAULT",
      "data": {
        "orderId": oid,
        "token": txnToken,
        "tokenType": "TXN_TOKEN",
        "amount": subTotal
      },
      "handler": {
        notifyMerchant: function (eventName, data) {
          console.log(eventName, data)
          console.log("data=>", data)
          console.log("eventName=>", eventName)

        },
      }
    };

    window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
      window.Paytm.CheckoutJS.invoke()
    }).catch(function onError(error) {
      console.log(error)
    })
  }

 return (
    <div>
      <div className="container  px-2 sm:m-auto ">
        <Head>
          <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
        </Head>
        <Script type="application/javascript" crossorigin="anonymous"
          src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_MID}.js`} />
        <h1 className="text-center font-bold text-2xl my-5">Checkout</h1>
        <h2>1. Delivery Details</h2>
        <div className='mx-auto flex my-2'>
          <div className='px-2 w-1/2'>
            <div className="relative mb-4">
              <label for="name" className="leading-7 text-sm text-gray-600">Name</label>
              <input onChange={handleChange} value={name} type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>
          <div className='px-2 w-1/2'>
            <div className="relative mb-4">
              <label for="email" className="leading-7 text-sm text-gray-600">Email</label>
              <input onChange={handleChange} value={email} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>
        </div>
        <div className='px-2 w-full'>
          <div className="relative mb-4">
            <label for="email" className="leading-7 text-sm text-gray-600">Address</label>
            <textarea onChange={handleChange} value={address} name="address" id="address" cols="30" rows="3" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></textarea>
          </div>
        </div>
        <div className='mx-auto flex my-2'>
          <div className='px-2 w-1/2'>
            <div className="relative mb-4">
              <label for="phone" className="leading-7 text-sm text-gray-600">Phone</label>
              <input onChange={handleChange} value={phone} type="text" id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>
          <div className='px-2 w-1/2'>
            <div className="relative mb-4">
              <label for="pincode" className="leading-7 text-sm text-gray-600">pincode</label>
              <input onChange={handleChange} value={pincode} type="pincode" id="pincode" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>
        </div>
        <div className='mx-auto flex my-2'>
          <div className='px-2 w-1/2'>
            <div className="relative mb-4">
              <label for="city" className="leading-7 text-sm text-gray-600">City</label>
              <input type="text" value={city} readOnly={true} id="city" name="city" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>
          <div className='px-2 w-1/2'>
            <div className="relative mb-4">
              <label for="State" className="leading-7 text-sm text-gray-600">State</label>
              <input type="text" readOnly={true} value={state} id="state" name="State" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>
        </div>
        <h2>2. Review Cart Item and PAy</h2>
        <div className=" bg-pink-100">
          <ol className="list-decimal font-semibold">
            {Object.keys(cart).length === 0 &&
              <div className="text-center my-4">No item in the Cart. Please add items to the cart for checkout.</div>
            }
            {Object.keys(cart).map((item) => {
              return (
                <li key={item} className="flex items-center justify-between my-5">
                  <div className="item flex my-5">
                    <div className="w-2/3 font-semibold">{cart[item].name} ({cart[item].size}/{cart[item].variant})</div>
                    <div className="flex items-center justify-center  font-semibold text-lg">
                      <AiFillMinusCircle
                        onClick={() => {
                          removeFromCart(
                            item,
                            1,
                            cart[item].price,
                            cart[item].name,
                            cart[item].size,
                            cart[item].variant
                          );
                        }}
                        className="cursor-pointer w-2/3 text-pink-500 text-4xl"
                      />
                      <span className="mx-2">{cart[item].qty}</span>
                      <AiFillPlusCircle
                        onClick={() => {
                          addToCart(
                            cart[item].itemCode,
                            1,
                            cart[item].price,
                            cart[item].name,
                            cart[item].size,
                            cart[item].variant
                          );
                        }}
                        className="cursor-pointer w-2/3 text-pink-500"
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
          <span className='total font-bold'>SubTotal : ₹{subTotal}</span>
          <div className='mx-4'>
            <Link href={'/order'} >
              <button disabled={disabled} onClick={initiatePayment}
                className="flex mt-2 text-white disabled:bg-pink-300 bg-pink-500 border-0 py-2 px-8 hover:bg-pink-600 rounded text-sm"
              >
                Pay ₹{subTotal}
              </button>
            </Link>
          </div>


        </div>
      </div>
    </div>
  )
}

export default Checkout
