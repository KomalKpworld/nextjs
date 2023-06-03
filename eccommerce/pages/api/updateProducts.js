import Product from "@/models/Product";
import connectDb from "@/middleware/mongoose";


const handler = async (req, res) => {
    if (req.method === 'POST') {

        for (let i = 0; i < req.body.length; i++) {
            let p = await Product.findByIdAndUpdate(req.body[i]._id, req.body[i]);

        }
        res.status(200).send("success")
    } else {
        res.status(405).send(`Method ${req.method} not allowed`);
    }
}
export default connectDb(handler);
