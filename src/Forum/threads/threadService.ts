import { db } from "../../firebase/config"
import { addDoc, collection, getDocs, doc, deleteDoc } from 'firebase/firestore'

/*GET ALL*/
async function getThreads(): Promise<Thread[]> {
    try {
        const threadCollectionRef = collection(db, 'threads')
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
    const threadsCollectionRef = collection(db, 'threads');

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
    const threadDocRef = doc(db, 'threads', threadId);

    await deleteDoc(threadDocRef);

    console.log('Thread deleted successfully');
  } catch (error) {
    console.error('Error deleting thread:', error);
    throw error;
  }
}

const threadsService = {
    getThreads,
    createThread,
    deleteThread,
}

export default threadsService