import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react';
import { AiOutlineShoppingCart, AiFillCloseCircle, AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';

const Navbar = ({ cart, clearCart, removeFromCart, addToCart, subTotal }) => {
    const ref = useRef();
  
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
        <div className="logo ">
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
        <div onClick={toggleCart} className="cart absolute right-0 top-4 mx-5 cursor-pointer">
          <AiOutlineShoppingCart className="text-xl md:text-2xl" />
        </div>
        <div ref={ref} className="w-72 h-[100vh] top-0  bg-pink-100 px-8 py-10 transform transition-transform translate-x-full absolute right-0">
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
                    <div className="w-2/3 font-semibold">{cart[item].name}</div>
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