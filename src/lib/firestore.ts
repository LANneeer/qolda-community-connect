
import { 
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  DocumentData,
  QueryConstraint
} from 'firebase/firestore';
import { db } from './firebase';

export async function getDocument<T extends DocumentData>(collectionName: string, docId: string): Promise<T | null> {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as unknown as T;
    }
    return null;
  } catch (error) {
    console.error('Error getting document:', error);
    throw error;
  }
}

export async function getDocuments<T extends DocumentData>(
  collectionName: string,
  constraints: QueryConstraint[] = []
): Promise<T[]> {
  try {
    const q = query(collection(db, collectionName), ...constraints);
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as unknown as T));
  } catch (error) {
    console.error('Error getting documents:', error);
    throw error;
  }
}

export async function addDocument<T extends DocumentData>(
  collectionName: string,
  data: Omit<T, 'id'>
): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef.id;
  } catch (error) {
    console.error('Error adding document:', error);
    throw error;
  }
}

export async function updateDocument<T extends DocumentData>(
  collectionName: string,
  docId: string,
  data: Partial<Omit<T, 'id'>>
): Promise<void> {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, data as any);
  } catch (error) {
    console.error('Error updating document:', error);
    throw error;
  }
}

export async function deleteDocument(
  collectionName: string,
  docId: string
): Promise<void> {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting document:', error);
    throw error;
  }
}

// Helper functions for common queries
export const whereQuery = where;
export const orderByQuery = orderBy;
export const limitQuery = limit;
