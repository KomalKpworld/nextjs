import User from "@/models/User";
import connectDb from "@/middleware/mongoose";
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
    if (req.method === 'POST') {
        let data = req.body
        console.log(data)
        const { name, email } = req.body

        let u = new User({
            name: name, email: email,
            password: CryptoJS.AES.encrypt(req.body.password, 'secret key 123').toString()
        })


        await u.save()
        res.status(200).send({
            success: true, message: "User created successfully", user: u})
    } else {
        res.status(405).send(`Method ${req.method} not allowed`);
    }
}
export default connectDb(handler);
