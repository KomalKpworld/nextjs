const PaytmChecksum = require('paytmchecksum');
import Order from '@/models/Order';
const mongoose = require('mongoose');
import connectDB  from '../../middleware/mongoose';
const https = require('https');
export default async function handler(req, res) {
    if (req.method === 'POST') {
// check cart is temperd or not 


// check product is outoff stock or not


// check if details is valid or not

//order is initiate 
let order = new Order({
    email: req.body.email,
    orderId: req.body.oid,
    amount: req.body.subTotal,
    address: req.body.address,
    products: req.body.cart
})
await order.save();
        var paytmParams = {};
        paytmParams.body = {
            "requestType": "Payment",
            "mid": process.env.NEXT_PUBLIC_MID,
            "websiteName": "YOUR_WEBSITE_NAME",
            "orderId": req.body.oid,
            "callbackUrl": `${process.env.NEXT_PUBLIC_HOST}/api/posttransaction`,
            "txnAmount": {
                "value": req.body.subTotal,
                "currency": "INR",
            },
            "userInfo": {
                "custId": req.body.email,
            },
        };

      const checksum = await  PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body),
       process.env.PAYTM_MKEY)

            paytmParams.head = {
                "signature": checksum
            };

            var post_data = JSON.stringify(paytmParams);
            const requestAsync = async () => {
                return new Promise((resolve, reject) => {
                    var options = {
                        hostname: 'securegw-stage.paytm.in',
                        port: 443,
                        path: `/theia/api/v1/initiateTransaction?mid=${process.env.NEXT_PUBLIC_MID}&orderId=${req.body.oid}`,
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Content-Length': post_data.length
                        }
                    };
                    var response = "";
                    var post_req = https.request(options, function (post_res) {
                        post_res.on('data', function (chunk) {
                            response += chunk;
                        });

                        post_res.on('end', function () {
                            console.log('Response: ', response);
                            resolve(JSON.parse(response).body);
                        });
                    });

                    post_req.write(post_data);
                    post_req.end();
                })


            }
            let myr= await requestAsync();
            res.status(200).json(myr)
        
    }
}

