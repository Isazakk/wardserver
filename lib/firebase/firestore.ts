import {
  collection,
  doc,
  setDoc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  DocumentData,
  QueryConstraint,
  WithFieldValue,
  DocumentReference,
  CollectionReference
} from 'firebase/firestore';
import { db } from './config';

/**
 * Create a document with a specific ID
 */
export const createDocumentWithId = async <T>(
  collectionName: string,
  docId: string,
  data: WithFieldValue<T>
): Promise<void> => {
  const docRef = doc(db, collectionName, docId);
  await setDoc(docRef, {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

/**
 * Create a document with auto-generated ID
 */
export const createDocument = async <T>(
  collectionName: string,
  data: WithFieldValue<T>
): Promise<string> => {
  const collectionRef = collection(db, collectionName);
  const docRef = await addDoc(collectionRef, {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
};

/**
 * Get a document by ID
 */
export const getDocument = async <T>(
  collectionName: string,
  docId: string
): Promise<T | null> => {
  const docRef = doc(db, collectionName, docId);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as T;
  }
  
  return null;
};

/**
 * Update a document
 */
export const updateDocument = async <T>(
  collectionName: string,
  docId: string,
  data: Partial<T>
): Promise<void> => {
  const docRef = doc(db, collectionName, docId);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
};

/**
 * Delete a document
 */
export const deleteDocument = async (
  collectionName: string,
  docId: string
): Promise<void> => {
  const docRef = doc(db, collectionName, docId);
  await deleteDoc(docRef);
};

/**
 * Query documents with filters
 */
export const queryDocuments = async <T>(
  collectionName: string,
  constraints: QueryConstraint[] = []
): Promise<T[]> => {
  const collectionRef = collection(db, collectionName);
  const q = query(collectionRef, ...constraints);
  const querySnapshot = await getDocs(q);
  
  const documents: T[] = [];
  querySnapshot.forEach((doc) => {
    documents.push({ id: doc.id, ...doc.data() } as T);
  });
  
  return documents;
};

/**
 * Get all documents from a collection
 */
export const getAllDocuments = async <T>(
  collectionName: string
): Promise<T[]> => {
  return queryDocuments<T>(collectionName);
};

/**
 * Get collection reference
 */
export const getCollectionRef = (
  collectionName: string
): CollectionReference => {
  return collection(db, collectionName);
};

/**
 * Get document reference
 */
export const getDocumentRef = (
  collectionName: string,
  docId: string
): DocumentReference => {
  return doc(db, collectionName, docId);
}; 