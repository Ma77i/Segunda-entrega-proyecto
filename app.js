const express = require('express');
const mongoose = require('mongoose');

const app = express();
const path = require('path')
const PORT = process.env.PORT || 3000

const { HOSTNAME, SCHEMA, OPTIONS, DATABASE, USER, PASSWORD} = require('./config')
const adminMiddleware = require("./middlewares/admin")


//`${SCHEMA}://${HOSTNAME}:${DBPORT}/${DATABASE}` --local
//`${SCHEMA}://${USER}:${PASSWORD}@${HOSTNAME}/${DATABASE}?${OPTIONS}` --cloud
 

mongoose.connect("mongodb+srv://Ma77iass:Tangerine07@cluster0.v01os.mongodb.net/ecommerce?retryWrites=true&w=majority").then(()=>{
    console.log("Connected to mongoose");
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use("/static", express.static(path.join(__dirname, "public")))
    
    
    const productRouter = require("./routes/productos")
    const tiendaRouter = require("./routes/tienda")
    const homeRouter = require('./routes/home')
    const addProdRouter = require('./routes/addProd');
    const carroRouter = require('./routes/carro');
    

    app.use("/", homeRouter)
    app.use("/add", addProdRouter)
    app.use("/productos", tiendaRouter)
    app.use("/api/productos", productRouter)
    app.use("/api/carrito", carroRouter)
    
    
    const server = app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
    server.on('err', (err) => {
        console.log(`Error: ${err}`);
    })
}).catch((err)=>console.log("Error on mongo", err))

