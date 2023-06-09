import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
const Order = ({ subTotal }) => {
  const [orders, setOrders] = React.useState([])
  const router = useRouter()
  useEffect(() => {
    const fetchOrders = async () => {
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myorders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: localStorage.getItem('token') })
      })
      let res = await a.json()
      setOrders(res.orders)
      console.log(res)
    }
    if (!localStorage.getItem('token')) {
      router.push('/')
    } else {
      fetchOrders()
    }
  },[])

  return (
    <div className='min-h-screen bg-white dark:bg-neutral-900'>
      <h1 className='text-2xl font-bold text-center'>My Order </h1>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4">id</th>
                    <th scope="col" className="px-6 py-4">Name</th>
                    <th scope="col" className="px-6 py-4">Price</th>
                    <th scope="col" className="px-6 py-4">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.map((item) => {
                    return <tr key={item?.id} className="border-b dark:border-neutral-500">
                      <td className="whitespace-nowrap px-6 py-4 font-medium">{item?.orderId}</td>
                      <td className="whitespace-nowrap px-6 py-4">{item?.name}</td>
                      <td className="whitespace-nowrap px-6 py-4">{item?.amount}</td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <Link href={'/orders?id=' + item?.orderId} > Details</Link>
                      </td>
                    </tr>
                  })}
                
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Order
