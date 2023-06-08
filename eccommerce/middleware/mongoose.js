import mongoose from 'mongoose';    

const connectDb = handler => async (req, res)=>{
    if(mongoose.connection.readyState>1){
        return handler(req, res)
    }
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI)
    return handler(req, res)
}
export default connectDb;