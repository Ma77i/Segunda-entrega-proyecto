const express = require('express')
const { Router } = express;


const controller = require('../controllers/products')

const router = Router()


//GET PRODUCTS
router.get("", controller.get) // Mongo
//router.get("", controller.getF) // firebase

//SAVE PRODUCT
router.post("", controller.post) //mongo
//router.post("", controller.postF) //firebase

//UPDATE PRODUCT
router.put("/:id", controller.put) // mongo
//router.put("/:id", controller.putF) // firebase

//GET PRODUCT BY ID
router.get("/:id", controller.getById) //mongo
//router.get("/:id", controller.getByIdF) //firebase

// DELETE PRODUCT BY ID
router.delete("/:id", controller.deleteProd) //mongo
//router.delete("/:id", controller.deleteProdF) //firebase

//DELETE ALL 
router.delete("", controller.deleteAll) //mongo


module.exports = router