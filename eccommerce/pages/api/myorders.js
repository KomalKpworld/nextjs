import mongoose from 'mongoose'
import OrderModel from '@/models/Order'
import connectDb from '@/middleware/mongoose'
import jsonwebtoken from 'jsonwebtoken'
const handler = async (req, res) => {
let token = req.body.token
console.log(token)
console.log(process.env.JWT_SECRET_KEY)
const data = jsonwebtoken.verify(token, process.env.JWT_SECRET_KEY)
    let orders = await OrderModel.find({email: data.email})
    res.status(200).json({ orders  })
  }

  export default connectDb(handler)