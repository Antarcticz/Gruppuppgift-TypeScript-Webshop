import { db } from "../../firebase/config"
import { addDoc, collection, getDocs, doc } from 'firebase/firestore'


async function getProduct(): Promise<Product[]> {
    try {
        const productCollectionRef = collection(db, 'products')
        const productSnapshot = await getDocs(productCollectionRef)
        const products: Product[] = []
        productSnapshot.forEach((doc) => {
            products.push(doc.data() as Product)
        }); 
        return products
    } catch (error) {
        console.error('Dosent work', error)
        return []
    }
}






// const createProduct = async (productData) => {
//     const collectionRef = collection(db, 'products')
//     const docRef = await addDoc(collectionRef, productData)

//     if (!docRef.id) throw new Error('Something went wrong')

//     console.log(docRef)
//     return { id: docRef.id, ...productData }

// }

// const getAllAsync = async (col) => {
//     const colRef = collection(db, col)
//     const querySnapshot = await getDocs(colRef)

//     const products = []
//     querySnapshot.forEach(doc => {
//         products.push({ id: doc.id, ...doc.data() })
//     })

//     return products
// }

const productsService = {
    getProduct
}

export default productsService