import React from 'react'
import Link from 'next/link'
import { useRef } from 'react';
import { AiOutlineShoppingCart, AiFillCloseCircle, AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import Head from 'next/head';

const Checkout = ({ cart, clearCart, removeFromCart, addToCart, subTotal }) => {
  return (
    <div>


      <div className="container  px-2 sm:m-auto ">
        <h1 className="text-center font-bold text-2xl my-5">Checkout</h1>
        <Head>
          <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
        </Head>
        <h2>1. Delivery Details</h2>
        <div className='mx-auto flex my-2'>
          <div className='px-2 w-1/2'>
            <div className="relative mb-4">
              <label for="name" className="leading-7 text-sm text-gray-600">Name</label>
              <input type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>
          <div className='px-2 w-1/2'>
            <div className="relative mb-4">
              <label for="email" className="leading-7 text-sm text-gray-600">Email</label>
              <input type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>
        </div>

        <div className='px-2 w-full'>
          <div className="relative mb-4">
            <label for="email" className="leading-7 text-sm text-gray-600">Address</label>
            <textarea name="address" id="address" cols="30" rows="3" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></textarea>
          </div>
        </div>

        <div className='mx-auto flex my-2'>
          <div className='px-2 w-1/2'>
            <div className="relative mb-4">
              <label for="phone" className="leading-7 text-sm text-gray-600">Phone</label>
              <input type="text" id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>
          <div className='px-2 w-1/2'>
            <div className="relative mb-4">
              <label for="city" className="leading-7 text-sm text-gray-600">City</label>
              <input type="email" id="city" name="city" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>
        </div>
        <div className='mx-auto flex my-2'>
          <div className='px-2 w-1/2'>
            <div className="relative mb-4">
              <label for="State" className="leading-7 text-sm text-gray-600">State</label>
              <input type="text" id="State" name="State" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>
          <div className='px-2 w-1/2'>
            <div className="relative mb-4">
              <label for="pincode" className="leading-7 text-sm text-gray-600">pincode</label>
              <input type="pincode" id="pincode" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
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
            <span className='total font-bold'>SubTotal : ₹{subTotal}</span>
            <div className='mx-8'>


              <Link href={'/order'}>
                <button
                  className="flex mt-2 text-white bg-pink-500 border-0 py-2 px-8 hover:bg-pink-600 rounded text-sm"
                >
                  Pay ₹{subTotal}
                </button>
              </Link>
            </div>
          </ol>

        </div>
      </div>
    </div>
  )
}

export default Checkout
