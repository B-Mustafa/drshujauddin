import mongoose from "mongoose";

export function connect(){
    mongoose.connect(process.env.MONGODB_URL as string , {
        tls:true
    })
    .then(() => console.log("Mongoose connected sucessfully"))
    .catch((err) => console.log("error" , err))
}