import User from "@/models/User";
import connectDb from "@/middleware/mongoose";
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

const handler = async (req, res) => {

    if (req.method === 'POST') {
        let data = req.body

        if (!data.email || !data.password) {
            return res.status(400).send("Please enter all fields")
        }  
        let user = await User.findOne({ email: data.email })
        if (!user) {
            return res.status(400).send("User not found")
        }
        var bytes = CryptoJS.AES.decrypt(user.password, `${process.env.PASSWORD_SECRET_KEY}`);
        var originalText = bytes.toString(CryptoJS.enc.Utf8);
        if (user) {
            if (user.email === data.email &&
                req.body.password === originalText) {
                var token = jwt.sign({ email: user.email, name: user.name }, `${process.env.JWT_SECRET_KEY}`)

                return res.status(200).send({ message: "success", token: token })
            }
        } else {
            return res.status(400).send("User not found")
        }
    } else {
        return res.status(405).send(`Method ${req.method} not allowed`);
    }
}
export default connectDb(handler);
