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


    async createFirebase (obj) {
        const data = await this.query.get()
        let docs = data.docs
        let id = 0
        for (let d of docs) {
            id = d.id
        }
        id++
        const doc = this.query.doc(`${id}`)
        await doc.create(obj)
    }


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
        return products;
    }

    async getById (id) {
        const docs = await this.getAll()
        const doc = docs.find(i => i.id == id)
        return doc
        
    }
    
    async update(id, obj) {
        const doc = this.query.doc(`${id}`)
        await doc.update(obj)

    }

    async deleteById(id) {
        const doc = this.query.doc(id)
        await doc.delete()
    }

    async deleteAll() {
        const doc = this.query.doc()
        doc = []
        return doc
    }
}


module.exports = new Product()