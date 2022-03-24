const mongoose = require('mongoose');

class Product {
    constructor() {
        const schema = new mongoose.Schema({
            title: { type: String, default: 'no name'},
            descripcion: String,
            price: Number,
            stock: { type: Number, default: 0},
            code: String,
            thumbnail: String,
            timestamp: { type: Number, default: Date.now() }
        })

        this.model = mongoose.model("productos", schema)
    }


// CREAR UN PRODUCTO
    async create(obj) {
        const product = await this.model.create(obj)
        console.log(JSON.stringify(product, null, 2))
        return product
    }

// OBTENER TODOS LOS PRODUCTOS
    async getAll(orderBy = '', search = '') {
        let products = []
        let find = search ? { title: { $regex: search, $options: "i" } } : {}        
        if (orderBy) {
            const ord = {}
            ord[orderBy] = 1
            products = await this.model.find(find).sort(ord)
        } else {
            products = await this.model.find(find)
        }
        //console.log(products)
        return products
    }

// OBTENER UN PRODUCTO
    async getById(id) {
		let doc = await this.model.findOne({id});
        console.log("object", doc);
		if (!doc) {
			throw new Error(`id ${id} no encontrado`);
		}
		return doc
	}

// ACTUALIZAR UN PRODUCTO
    async updateById(id, obj) {
		const up = await this.model.updateOne({ _id: id }, { $set: obj })
        if (!up) {
            throw new Error(`id ${id} no encontrado`);
        }
        return up
	}


// BORRAR UN PRODUCTO
	async deleteById(id) {
        const del = await this.model.deleteOne({ _id: id })
        if (!del) {
            throw new Error(`id ${id} no encontrado`);
        }
        return del
	}


// BORRAR TODO
	async deleteAll() {
		await this.model
			.deleteMany({})
			.then(() => console.log("Se eliminaron todos los objetos"))
			.catch((err) => console.log(err));
	}

}


module.exports = new Product()