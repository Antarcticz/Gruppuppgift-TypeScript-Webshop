import { db } from "../../firebase/config";
import 'firebase/auth';
import { auth } from '../../firebase/config';
import { Auth, UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword, User } from "firebase/auth";


import {
  addDoc,
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { Thread } from "../../types";


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
async function addCommentToThread(threadId: string, comment: string): Promise<void> { // Ändra threadId till string
  console.log(`Thread ID: ${threadId}`);
  try {
    const threadDocRef = doc(db, "threads", threadId); // Hämta direkt tråden med hjälp av dess ID

    // Update existing document
    await updateDoc(threadDocRef, {
      comments: arrayUnion(comment)
    });
    console.log('Comment added successfully');
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

/*GET THREADS*/
const getThreads = async (): Promise<Thread[]> => {
  try {
    const threadsCollectionRef = collection(db, 'threads');
    const querySnapshot = await getDocs(threadsCollectionRef);

    const threadsData: Thread[] = [];
    querySnapshot.forEach((doc) => {
      const thread = doc.data() as Thread;
      thread.id = doc.id;
      threadsData.push(thread);
    });

    return threadsData;
  } catch (error) {
    console.error('Error fetching threads:', error);
    throw error;
  }
};

/*registerUser*/
const registerUser = async (email: string, password: string): Promise<UserCredential> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth as Auth, email, password);

    const user = userCredential.user;
    console.log('User registered:', user);
    return userCredential;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

/*loginUser*/
const loginUser = async (email: string, password: string): Promise<UserCredential> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth as Auth, email, password);

    const user = userCredential.user;
    console.log('User logged in:', user);
    return userCredential;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

async function createThread(threadData: Thread): Promise<void> {
  try {
    const user = auth.currentUser; // Get the currently authenticated user

    if (user) {
      // If the user is authenticated, set the creator's information
      threadData.creator = {
        uid: user.uid,
        displayName: user.displayName || 'Anonymous',
      };
    } else {
      // Handle the case where the user is not authenticated
      console.error('User is not authenticated.');
      // You can choose to handle this case differently, e.g., by throwing an error or setting a default creator.
    }

    // Continue with thread creation
    const threadsCollectionRef = collection(db, "threads");
    await addDoc(threadsCollectionRef, threadData);
    console.log("Thread created successfully");
  } catch (error) {
    console.error("Error creating thread:", error);
    throw error;
  }
}

const threadsService = {
  loginUser,
  registerUser,
  getThreads,
  createThread,
  deleteThread,
  addCommentToThread,
  removeCommentFromThread,
};

export default threadsService;