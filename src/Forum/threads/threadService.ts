import { db } from "../../firebase/config";
import {
  addDoc,
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
  query,
  where,
} from "firebase/firestore";

interface Thread {
  id: number;
  threadName: string;
  title: string;
  category: string;
  creationDate: string;
  description: string;
  creator: User;
  comments?: string[];
}

/*GET ALL*/
async function getThreads(): Promise<Thread[]> {
  try {
    const threadCollectionRef = collection(db, "threads");
    const threadSnapshot = await getDocs(threadCollectionRef);
    const threads: Thread[] = [];
    threadSnapshot.forEach((doc) => {
      threads.push(doc.data() as Thread);
    });
    return threads;
  } catch (error) {
    console.error("Dosent work", error);
    return [];
  }
}

/*POST*/
async function createThread(threadData: Thread): Promise<void> {
  try {
    const threadsCollectionRef = collection(db, "threads");
    await addDoc(threadsCollectionRef, threadData);
    console.log("Thread created successfully");
  } catch (error) {
    console.error("Error creating thread:", error);
    throw error;
  }
}

/*DELETE*/
async function deleteThread(threadId: string): Promise<void> {
  try {
    const threadDocRef = doc(db, 'threads', threadId);
    await deleteDoc(threadDocRef);
    console.log("Thread deleted successfully");
  } catch (error) {
    console.error("Error deleting thread:", error);
    throw error;
  }
}


/*ADD COMMENT*/
async function addCommentToThread(threadId: number, comment: string): Promise<void> {
  console.log(`Thread ID: ${threadId}`);
  try {
    const q = query(collection(db, "threads"), where("id", "==", threadId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      const threadDocRef = doc.ref;

      // Update existing document
      await updateDoc(threadDocRef, {
        comments: arrayUnion(comment)
      });
      console.log('Comment added successfully');
    } else {
      // Throw an error if the document does not exist
      throw new Error(`Thread with ID ${threadId} does not exist.`);
    }
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
}


/*REMOVE COMMENT*/
async function removeCommentFromThread(
  threadId: string,
  comment: string
): Promise<void> {
  try {
    const threadDocRef = doc(db, "threads", threadId);
    await updateDoc(threadDocRef, {
      comments: arrayRemove(comment),
    });
    console.log("Comment removed successfully");
  } catch (error) {
    console.error("Error removing comment:", error);
    throw error;
  }
}

/*GET COMMENTS*/
async function getCommentsFromThread(threadId: string): Promise<string[]> {
  try {
    const threadDocRef = doc(db, "threads", threadId);
    const threadDoc = await getDoc(threadDocRef);
    if (threadDoc.exists()) {
      const threadData = threadDoc.data() as Thread;
      return threadData.comments || [];
    } else {
      console.error("Thread does not exist");
      return [];
    }
  } catch (error) {
    console.error("Error getting comments:", error);
    return [];
  }
}

// const createProduct = async (productData) => {
//     const collectionRef = collection(db, 'threads')
//     const docRef = await addDoc(collectionRef, productData)

//     if (!docRef.id) throw new Error('Something went wrong')

//     console.log(docRef)
//     return { id: docRef.id, ...productData }

// }

// const getAllAsync = async (col) => {
//     const colRef = collection(db, col)
//     const querySnapshot = await getDocs(colRef)

//     const threads = []
//     querySnapshot.forEach(doc => {
//         threads.push({ id: doc.id, ...doc.data() })
//     })

//     return threads
// }

const threadsService = {
  getThreads,
  createThread,
  deleteThread,
  addCommentToThread,
  removeCommentFromThread,
  getCommentsFromThread,
};

export default threadsService;