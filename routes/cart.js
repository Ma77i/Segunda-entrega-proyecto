const express = require('express');
const { Router } = express;

const controller = require('../controllers/cart')

const router = Router();



//OBTENGO TODOS LOS CARRITOS
router.get("", controller.get)

//CREO UN CARRITO
router.post("", controller.post)

//OBTENGO UN CARRITO
router.get("/:id/productos", controller.getCart)

// AGREGO UN PRODUCTO AL CARRITO
router.post("/:id/productos/:idprod", controller.postCart)

// BORRO UN CARRITO
router.delete('/:id', controller.deleteCart)

// BORRO UN PRODUCTO
router.delete('/:id/productos/:product', controller.deleteProd)

// BORRO TODO
router.delete("", controller.deleteAll)


module.exports = router;
