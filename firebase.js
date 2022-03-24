(async() => {
    const admin = require("firebase-admin")
    const { getFirestore } = require("firebase-admin/firestore")

    const serviceAccount = require("./sdk.json")

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://ecommerce.firebaseio.com"
    })

    const db = getFirestore()

    console.log("Connected");

    const query = db.collection("productos")
    const data = await query.get()
    let docs = data.docs

    console.log(docs)

    for (let d of docs) {
        console.log(d.data(), d.id);
        id = d.id
    }

    id++

    const doc = query.doc(`${id}`)
    //await doc.create({title: "Hola banda", price: 234})
    //await doc.update({ title: "Pink Floyd" })
    //await doc.delete()
})()