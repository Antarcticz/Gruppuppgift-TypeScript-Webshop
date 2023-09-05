import { db } from "../../firebase/config"
import { addDoc, collection, getDocs, doc, deleteDoc } from 'firebase/firestore'

/*GET ALL*/
async function getThreads(): Promise<Thread[]> {
    try {
        const threadCollectionRef = collection(db, 'products')
        const threadSnapshot = await getDocs(threadCollectionRef)
        const threads: Thread[] = []
        threadSnapshot.forEach((doc) => {
          threads.push(doc.data() as Thread)
        }); 
        return threads
    } catch (error) {
        console.error('Dosent work', error)
        return []
    }
}

/*POST*/
async function createThread(threadData: Thread): Promise<void> {
  try {
    const threadsCollectionRef = collection(db, 'products');

    await addDoc(threadsCollectionRef, threadData);
    
    console.log('Thread created successfully');
  } catch (error) {
    console.error('Error creating thread:', error);
    throw error;
  }
}

/*DELETE*/
async function deleteThread(threadId: string): Promise<void> {
  try {
    const threadDocRef = doc(db, 'products', threadId);

    await deleteDoc(threadDocRef);

    console.log('Thread deleted successfully');
  } catch (error) {
    console.error('Error deleting thread:', error);
    throw error;
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
    getThreads,
    createThread,
    deleteThread
}

export default productsService