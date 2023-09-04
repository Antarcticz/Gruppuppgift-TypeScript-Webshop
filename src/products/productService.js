import { db } from "../firebase/config"
import { addDoc, collection, getDocs } from 'firebase/firestore'


const createProduct = async (productData) => {
    const collectionRef = collection(db, 'products')
    const docRef = await addDoc(collectionRef, productData)

    if (!docRef.id) throw new Error('Something went wrong')

    console.log(docRef)
    return { id: docRef.id, ...productData }

}

const getAllAsync = async (col) => {
    const colRef = collection(db, col)
    const querySnapshot = await getDocs(colRef)

    const products = []
    querySnapshot.forEach(doc => {
        products.push({ id: doc.id, ...doc.data() })
    })

    return products
}

// const getAsync = async (col, id) => {
//     const docRef = doc(db, col, id)
//     const docSnapshot = await getDocs(docRef)
//     return { id: docSnapshot.id, ...docSnapshot.data() }
// }

const productsService = {
    createProduct,
    getAllAsync
}

export default productsService