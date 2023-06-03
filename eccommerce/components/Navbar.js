import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react';
import { AiOutlineShoppingCart, AiFillCloseCircle, AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import {MdAccountCircle} from 'react-icons/md'
import { useState } from 'react';
const Navbar = ({ logout ,user, cart, clearCart, removeFromCart, addToCart, subTotal }) => {
 const [dropdown , setDropdown] = useState(false)

  const ref = useRef();
const setDropDown= () => {
  setDropdown(!dropdown)
}

  const toggleCart = () => {
    if (ref.current.classList.contains('translate-x-full')) {
      ref.current.classList.remove('translate-x-full');
      ref.current.classList.add('translate-x-0');
    } else if (!ref.current.classList.contains('translate-x-full')) {
      ref.current.classList.remove('translate-x-0');
      ref.current.classList.add('translate-x-full');
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:justify-start justify-center items-center py-2 shadow-md sticky top-0 bg-white z-10" >
      <div className="logo mr-auto md:mx-5">
        <Link href="/">
          <Image src="/logo.jpg" alt="Logo" width={100} height={20} />
        </Link>
      </div>
      <div className="nav">
        <ul className="flex items-center space-x-3 mx-5 font-bold md:text-xl">
          <Link href="/tshirt">Tshirts</Link>
          <Link href="/hoodies">Hoodies</Link>
          <Link href="/mugs">Mugs</Link>
          <Link href="/stickers">Stickers</Link>
        </ul>
      </div>
      <div  className="cart absolute right-0 top-4 mx-5 cursor-pointer flex items-center">
    <a onMouseOver={() => setDropDown(true)} onMouseLeave={ () => setDropDown(false)}>
     {dropdown && <div onMouseOver={() => {setDropDown(true)}} onMouseLeave={ () => {setDropDown(false)}}
      className="dropdown absolute right-9 bg-pink-300 top-7 px-5 py-4 rounded-md w-32">
        <ul className="flex flex-col items-center space-y-2">
          <li className='py-2 text-sm hover: text-pink-600'>Orders</li>
          <li className='py-2 text-sm hover: text-pink-600' >Profile</li>
         <a onClick={logout}> <li className='py-2 text-sm hover: text-pink-600'>Logout</li> </a> 
        </ul>
      </div>
  }
   { user.value &&  <MdAccountCircle  className="text-xl md:text-2xl mx-2" />}
   </a>
    {!user.value && <Link href="/login">
     <button className='bg-pink-500 rounded-full hover:bg-pink-700 text-white font-bold py-2 px-2 rounded-full"'> Login </button>
     </Link>
     }
     <AiOutlineShoppingCart  onClick={toggleCart}className="text-xl md:text-2xl" />
      </div>
    
      <div ref={ref} className={`w-72 h-[100vh] top-0  bg-pink-100 px-8 py-10 overflow-y-scroll transform transition-transform absolute right-0
        ${Object.keys(cart).length !== 0 ? 'translate-x-0' : 'translate-x-full'}`}>
        <h2 className="font-bold text-xl text-center">Shopping Cart</h2>
        <span onClick={toggleCart} className="absolute top-5  cursor-pointer text-2xl text-pink-400">
       
          <AiFillCloseCircle />
        </span>
        <ol className="list-decimal font-semibold">
          {Object.keys(cart).length === 0 && (
            <div className="text-center my-5">No item in the Cart. Please add items to the cart for checkout.</div>
          )}
          {Object.keys(cart).map((item, index) => {
            return (
              <li key={index} className="flex items-center justify-between my-5">
                <div className="item flex my-5">
                  <div className="w-2/3 font-semibold">{cart[item].name}({cart[item]?.size}/{cart[item]?.variant})</div>
                  <div className="flex items-center justify-center w-1/3 font-semibold text-lg">
                    <AiFillMinusCircle
                      onClick={() => {
                        removeFromCart(
                          cart[item].itemCode,
                          1,
                          cart[item].price,
                          cart[item].name,
                          cart[item].size,
                          cart[item].variant
                        );
                      }}
                      className="cursor-pointer text-pink-500 text-6xl"
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
                      className="cursor-pointer text-pink-500 text-6xl"
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
        <span className='total font-bold'>SubTotal : ₹{subTotal}</span>
        <div className="flex justify-center">
          <Link href={'/checkout'}>
            <button className="flex mx-4 mt-2 text-white bg-pink-500 border-0 py-2 px-8 hover:bg-pink-600 rounded text-lg">
              Checkout
            </button>
          </Link>
          <button
            onClick={clearCart}
            className="flex mt-2 text-white bg-pink-500 border-0 py-2 px-8 hover:bg-pink-600 rounded text-lg"
          >
            clearCart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;