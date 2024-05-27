import mongoose from "mongoose";
import { app } from "./app.js";
import dotenv from "dotenv";
import { dbName } from "./constants.js";

dotenv.config()


const connectToDb = async()=> {
	try {
		 await mongoose.connect(`${process.env.MONGODB_URI}/${dbName}`)
		console.log("mongodb connected");
	} catch (error) {
		console.log("error in db connect");
	}
}
const port = process.env.PORT || 3000 
connectToDb()
.then(()=>{
	app.listen(port, ()=>{
		console.log(`server is running at port http://localhost:${process.env.PORT}`);
	})
})
.catch((error)=>{
	console.log("mongodb connection failed");
})

