import mongoose from 'mongoose'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import handler from './api/hello'
import Product from '@/models/Product'


const Mug = ({ products }) => {
  useEffect(() => {
    products
  })
  return (

    <div>
      <section className="text-gray-600 body-font">

        <div className="container px-5 py-24 mx-auto  ">
          <div className="flex flex-wrap -m-4 ">
          {Object.keys(products).length === 0 && <h1>No Products</h1>}
            {Object.keys(products).map((item) => {
            {console.log(products[item])}
            return (
              <div key={products[item]._id}>
                <Link href={`/product/${products[item].slug}`} >
                  <div className="lg:w-full  md:w-1/2 p-4 ">

                    <Image alt="ecommerce" className="m-auto  md:mx-0  h-[30vh] block relative  rounded overflow-hidden" src={products[item].img} width={200} height={30} />

                    <div className="mt-4 items-center text-center">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{products[item].title} </h3>
                      <h2 className="text-gray-900 title-font text-lg font-medium">{products[item].desc}</h2>
                      <p className="mt-1">{products[item].price}</p>
                      <div className='mt-1'>
                      
                        {products[item].size?.includes('S') && <span className='border-2 border-gray-300 mx-1 px-1 '>S</span>}
                        {products[item].size?.includes('M') && <span className='border-2 border-gray-300 mx-1 px-1'>M</span>}
                        {products[item].size?.includes('L') && <span className='border-2 border-gray-300 mx-1 px-1'>L</span>}
                        {products[item].size?.includes('XL') && <span className='border-2 border-gray-300 mx-1 px-1'>XL</span>}
                        {products[item].size?.includes('XXL') && <span className='border-2 border-gray-300 mx-1 px-1'>XXL</span>}
                      </div>
                      <div className='mt-1'>
                        {products[item].color?.includes('red') && <button className='border-2  bg-red-500  border-gray-300 ml-1 rounded-full w-6 h-6 focus:outline-none'></button>}
                        {products[item].color?.includes('blue') && <button  className='border-2 bg-blue-500  border-gray-300 ml-1 rounded-full w-6 h-6 focus:outline-none'></button>}
                        {products[item].color?.includes('green') && <button  className='border-2 bg-green-500  border-gray-300 ml-1 rounded-full w-6 h-6 focus:outline-none'></button>}
                        {products[item].color?.includes('yellow') && <button  className='border-2 bg-yellow-500 border-gray-300 ml-1 rounded-full w-6 h-6 focus:outline-none'></button>}
                        {products[item].color?.includes('black') && <button className='border-2  bg-black  border-gray-300 ml-1 rounded-full w-6 h-6 focus:outline-none'></button>}
                        {products[item].color?.includes('white') && <button  className='border-2  bg-white   border-gray-300 ml-1 rounded-full w-6 h-6 focus:outline-none'></button>}
                        {products[item].color?.includes('pink') && <button  className='border-2 bg-pink-500  border-gray-300 ml-1 rounded-full w-6 h-6 focus:outline-none'></button>}
                        {products[item].color?.includes('purple') && <button  className='border-2 bg-purple-500  border-gray-300 ml-1 rounded-full w-6 h-6 focus:outline-none'></button>}
                        {products[item].color?.includes('orange') && <button  className='border-2 bg-orange-500    border-gray-300 ml-1 rounded-full w-6 h-6 focus:outline-none'></button>}
                        {products[item].color?.includes('brown') && <button  className='border-2 bg-  border-gray-900 ml-1 rounded-full w-6 h-6 focus:outline-none'></button>}
                        {products[item].color?.includes('gray') && <button  className='border-2  bg-gray-500  border-gray-600 ml-1 rounded-full w-6 h-6 focus:outline-none'></button>}

                      </div>

                    </div>
                  </div>
                </Link>
              </div>
           ) })}
          </div>
        </div>


      </section>
    </div>
  )
}
export async function getServerSideProps() {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }
  let products = await Product.find({
    category: "mug"
  })

  let mug = {}
  for (let item  of products) {
    if (item.title in mug) {
      if (!mug[item.title]?.color?.includes(item?.color) && item.availableQty > 0) {
        mug[item.title].color.push(item.color)
      }
      if (!mug[item.title].size?.includes(item.size) && item.availableQty > 0) {
        mug[item.title].size.push(item.size)
      }
      }else{
        mug[item.title] = JSON.parse(JSON.stringify(item))
      if(item.availableQty > 0){
        mug[item.title].color = [item.color]
        mug[item.title].size = [item.size]
      }
    }  
  }

  return {
    props: {  
        products:  JSON.parse(JSON.stringify(mug))
    }
  }
}


export default Mug
