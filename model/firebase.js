const admin = require("firebase-admin")
const { getFirestore } = require("firebase-admin/firestore")

const serviceAccount = require("../sdk.json")

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://ecommerce.firebaseio.com"
})

class Product {
    constructor() {
        const db = getFirestore()
        this.query = db.collection("productos")
    }

// CREAR PRODUCTO
    async createFirebase (obj) {
        const data = await this.query.get()
        let docs = data.docs
        let id = 0
        for (let d of docs) { id = d.id }
        id++
        await this.query
            .doc(`${id}`)
            .create(obj)
            .then(() => console.log("Producto creado con exito"))
            .catch((err) => console.log(err));
    }

// OBTENER TODOS LOS PRODUCTOS
    async getAll() {
        const data = await this.query.get()
        const products = data.docs.map(doc=>{
            return({
                id: doc.id,
                title: doc.data().title,
                price: doc.data().price,
                code: doc.data().code,
                description: doc.data().description,
                stock: doc.data().stock,
                thumbnail: doc.data().thumbnail
            })})
        if (!products) {
            console.log("No existen productos")
        }
        return products;
    }

// OBTENER UN PRODUCTO
    async getById (id) {
        const docs = await this.getAll()
        const doc = docs.find(i => i.id == id)
        if (!doc) {
            console.log("id no encontrado");
        }
        return doc
        
    }

// ACTUALIZAR UN PRODUCTO 
    async update(id, obj) {
        await this.query.doc(`${id}`)
            .update(obj)            
            .then(() => console.log("Producto creado con exito"))
            .catch((err) => console.log(err));
    }


// BORRAR UN PRODUCTO
    async deleteById(id) {
        await this.query.doc(id)
            .delete()            
            .then(() => console.log("Producto eliminado con exito"))
            .catch((err) => console.log(err));
    }

}


module.exports = new Product()