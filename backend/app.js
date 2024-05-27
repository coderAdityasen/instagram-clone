import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";

const app = express()



app.use(
	cors({
		origin:"http://localhost:5173",
	  credentials: true,
	})
  );
  
  
app.use(cookieParser());

app.use(express.json())

app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public"));



//routes
app.use("/api/v1/users" , userRoutes)
export {app}