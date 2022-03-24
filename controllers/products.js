const productModel = require('../model/mongo')
const productFirebase = require('../model/firebase')

module.exports = {
  
  //FIREBASE
  getF: async (req, res) => {
    try {
      const product = await productFirebase.getAll()
      res.status(200).send(product)
    } catch (error) {
      console.log(error)
    }
  },
  postF: async (req, res) => {
    const {body} = req
    try {
      const product = await productFirebase.createFirebase(body)
      res.status(201).send(product)
    } catch (error) {
      console.log(error)
    }
  },

  getByIdF: async(req, res) => {
    const { id } = req.params
    try {
      const getId = await productFirebase.getById(id)
      res.status(200).send(getId)
      
    } catch (error) {
      console.log(error)
      res.status(500).send(error)
    }
  },

  putF: async (req, res) => {
    const { body } = req
    const { id } = req.params
    console.log(id, body);
    try {
      const up = await productFirebase.update(id, body)
      res.status(201).send(up)
    } catch (error) {
      console.log(error)
      res.status(500).send(error)
    }
  },

  deleteProdF: async(req, res) => {
    const { id } = req.params
    try {
      const dlt = await productFirebase.deleteById(id)
      res.status(200).send(dlt)

    } catch (error) {
      console.log(error)
      res.status(500).send(error)
    }
  },






  

  // MONGO
  get: async (req, res) => {
    const { orderBy, search } = req.query
    try {
      const products = await productModel.getAll(orderBy, search)
      res.status(201).send(products)
    } catch (error) {
      console.log(error)
      res.status(500).send(error)
    }
  },

  getById: async(req, res) => {
    const { id } = req.params
    console.log("objectID: ", id);
    try {
      const getId = await productModel.getById(id)
      res.status(200).send(getId)
      
    } catch (error) {
      console.log(error)
      res.status(500).send(error)
    }
  },

  put: async (req, res) => {
    const { body } = req
    const { id } = req.params
    console.log(id, body);
    try {
      const up = await productModel.updateById(id, body)
      res.status(201).send(up)
    } catch (error) {
      console.log(error)
      res.status(500).send(error)
    }
  },

  post: async (req, res) => {
    const {body} = req
    try {
      const product = await productModel.create(body)
      res.status(201).send(product)
    } catch (error) {
      console.log(error)
    }
  },

  deleteProd: async(req, res) => {
    const { id } = req.params
    try {
      const dlt = await productModel.deleteById(id)
      res.status(200).send("Product deleted")

    } catch (error) {
      console.log(error)
      res.status(500).send(error)
    }
  },

  deleteAll: async(req, res) => {
    const delAll = await productModel.deleteAll()
    res.status(200).send(delAll)
  }
}