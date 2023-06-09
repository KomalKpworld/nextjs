import Order from '@/models/Order';
const mongoose = require('mongoose');
import connectDB  from '../../middleware/mongoose';

export default async function handler(req, res) {
// valid checksum or not
let order
// update sttaus into order checkig transctional statu
if(req.body.STATUS == 'TXN_SUCCESS'){
  order = await Order.findOneAndUpdate({orderId:req.body.ORDERID}, {$set:{status:'Paid', 
  paymentInfo:JSON.stringify(req.body) }})
}else if(req.body.STATUS == 'PENDING'){
   order = await Order.findOneAndUpdate({orderId:req.body.ORDERID}, {$set:{status:'Pending', 
  paymentInfo:JSON.stringify(req.body) }})
}

// intiate shipping

// redirect to success page

res.redirect('/order?id='+ order._id, 200)

    res.status(200).json({body: req.body})
  }
  