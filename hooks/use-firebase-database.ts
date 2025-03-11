import { useState, useEffect } from 'react';
import { 
  collection, 
  onSnapshot, 
  query, 
  QueryConstraint, 
  where, 
  orderBy, 
  limit,
  Unsubscribe 
} from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { 
  getDocument, 
  createDocument, 
  createDocumentWithId, 
  updateDocument, 
  deleteDocument 
} from '@/lib/firebase/firestore';

interface DatabaseHookOptions {
  snapshotListenersEnabled?: boolean;
}

interface UseFirestoreReturn<T> {
  // State
  data: T | null;
  list: T[];
  loading: boolean;
  error: Error | null;
  
  // CRUD operations
  get: (id: string) => Promise<T | null>;
  getAll: (constraints?: QueryConstraint[]) => Promise<T[]>;
  add: (data: Omit<T, 'id'>) => Promise<string>;
  addWithId: (id: string, data: Omit<T, 'id'>) => Promise<void>;
  update: (id: string, data: Partial<T>) => Promise<void>;
  remove: (id: string) => Promise<void>;
  
  // Real-time updates
  listenToDocument: (id: string) => Unsubscribe;
  listenToCollection: (constraints?: QueryConstraint[]) => Unsubscribe;
  
  // Helpers
  resetState: () => void;
}

export function useFirebaseDatabase<T extends { id: string }>(
  collectionName: string,
  options: DatabaseHookOptions = {}
): UseFirestoreReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [list, setList] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  
  // Clean up subscriptions when the hook unmounts
  useEffect(() => {
    const subscriptions: Unsubscribe[] = [];
    
    return () => {
      subscriptions.forEach(unsubscribe => unsubscribe());
    };
  }, [collectionName]);
  
  // Helper for error handling
  const handleError = (error: any, operation: string) => {
    console.error(`Error in ${operation} operation:`, error);
    setError(error instanceof Error ? error : new Error(`${operation} failed: ${error}`));
    setLoading(false);
  };
  
  // CRUD Operations
  const get = async (id: string): Promise<T | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await getDocument<T>(collectionName, id);
      setData(result);
      setLoading(false);
      return result;
    } catch (err: any) {
      handleError(err, 'get');
      return null;
    }
  };
  
  const getAll = async (constraints: QueryConstraint[] = []): Promise<T[]> => {
    setLoading(true);
    setError(null);
    
    try {
      const q = query(collection(db, collectionName), ...constraints);
      return new Promise((resolve, reject) => {
        onSnapshot(
          q,
          (snapshot) => {
            const items: T[] = [];
            snapshot.forEach((doc) => {
              items.push({ id: doc.id, ...doc.data() } as T);
            });
            
            setList(items);
            setLoading(false);
            resolve(items);
          },
          (err) => {
            handleError(err, 'getAll');
            reject(err);
          }
        );
      });
    } catch (err: any) {
      handleError(err, 'getAll');
      return [];
    }
  };
  
  const add = async (data: Omit<T, 'id'>): Promise<string> => {
    setLoading(true);
    setError(null);
    
    try {
      const id = await createDocument(collectionName, data);
      setLoading(false);
      return id;
    } catch (err: any) {
      handleError(err, 'add');
      throw err;
    }
  };
  
  const addWithId = async (id: string, data: Omit<T, 'id'>): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      await createDocumentWithId(collectionName, id, data);
      setLoading(false);
    } catch (err: any) {
      handleError(err, 'addWithId');
      throw err;
    }
  };
  
  const update = async (id: string, data: Partial<T>): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      await updateDocument(collectionName, id, data);
      setLoading(false);
    } catch (err: any) {
      handleError(err, 'update');
      throw err;
    }
  };
  
  const remove = async (id: string): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      await deleteDocument(collectionName, id);
      setLoading(false);
    } catch (err: any) {
      handleError(err, 'remove');
      throw err;
    }
  };
  
  // Real-time updates
  const listenToDocument = (id: string): Unsubscribe => {
    setLoading(true);
    setError(null);
    
    const docRef = collection(db, collectionName);
    const unsubscribe = onSnapshot(
      docRef,
      (doc) => {
        if (doc.exists()) {
          setData({ id: doc.id, ...doc.data() } as T);
        } else {
          setData(null);
        }
        setLoading(false);
      },
      (err) => {
        handleError(err, 'listenToDocument');
      }
    );
    
    return unsubscribe;
  };
  
  const listenToCollection = (constraints: QueryConstraint[] = []): Unsubscribe => {
    setLoading(true);
    setError(null);
    
    const q = query(collection(db, collectionName), ...constraints);
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const items: T[] = [];
        snapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() } as T);
        });
        
        setList(items);
        setLoading(false);
      },
      (err) => {
        handleError(err, 'listenToCollection');
      }
    );
    
    return unsubscribe;
  };
  
  const resetState = () => {
    setData(null);
    setList([]);
    setLoading(false);
    setError(null);
  };
  
  return {
    // State
    data,
    list,
    loading,
    error,
    
    // CRUD operations
    get,
    getAll,
    add,
    addWithId,
    update,
    remove,
    
    // Real-time updates
    listenToDocument,
    listenToCollection,
    
    // Helpers
    resetState,
  };
} 