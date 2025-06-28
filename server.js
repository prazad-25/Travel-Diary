const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT;
const errorHandler = require("./middleware/errorHandler.js");
const connectDB = require("./config/dbConnection.js");
//DataBase Connection
connectDB();
//Middlewares
app.use(express.json());
//Routes
app.use("/api/entries",require("./routes/travelRoutes.js"));
app.use("/api/user",require("./routes/userRoutes.js"));
app.use(errorHandler);


app.listen(PORT ,() =>{
    console.log(`server started at Port ${PORT}`);
})

