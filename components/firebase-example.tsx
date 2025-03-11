'use client';

import { useState, useEffect } from 'react';
import { useFirebase } from '@/lib/firebase/context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { QueryDocumentSnapshot, DocumentData, Timestamp } from 'firebase/firestore';
import { collection, getDocs, query, orderBy, limit, addDoc, serverTimestamp } from 'firebase/firestore';

interface TestData {
  id: string;
  message: string;
  timestamp: Timestamp;
  userId?: string;
}

export function FirebaseExample() {
  const { db, isAuthenticated, currentUser } = useFirebase();
  const [testData, setTestData] = useState<TestData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Example of using Firebase Firestore
  useEffect(() => {
    const fetchData = async () => {
      if (!db) {
        setError('Firebase is not initialized');
        setLoading(false);
        return;
      }

      try {
        const q = query(
          collection(db, 'test'),
          orderBy('timestamp', 'desc'),
          limit(5)
        );
        
        const querySnapshot = await getDocs(q);
        const data: TestData[] = [];
        
        querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
          data.push({ id: doc.id, ...doc.data() } as TestData);
        });
        
        setTestData(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data');
        setLoading(false);
      }
    };
    
    fetchData();
  }, [db]);

  // Example of adding data to Firestore
  const addTestData = async () => {
    if (!db) {
      setError('Firebase is not initialized');
      return;
    }

    try {
      await addDoc(collection(db, 'test'), {
        message: `Test message created at ${new Date().toISOString()}`,
        timestamp: serverTimestamp(),
        userId: currentUser?.uid || 'anonymous'
      });
      
      // Reload data
      setLoading(true);
      
      const q = query(
        collection(db, 'test'),
        orderBy('timestamp', 'desc'),
        limit(5)
      );
      
      const querySnapshot = await getDocs(q);
      const data: TestData[] = [];
      
      querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
        data.push({ id: doc.id, ...doc.data() } as TestData);
      });
      
      setTestData(data);
      setLoading(false);
    } catch (err) {
      console.error('Error adding test data:', err);
      setError('Failed to add test data');
    }
  };
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Firebase Integration</CardTitle>
        <CardDescription>
          {isAuthenticated 
            ? `Logged in as ${currentUser?.email}` 
            : 'Not authenticated'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p>Loading data...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : testData.length === 0 ? (
          <p>No test data found. Try adding some!</p>
        ) : (
          <ul className="space-y-2">
            {testData.map((item) => (
              <li key={item.id} className="p-3 bg-secondary rounded-md">
                <p className="font-medium">{item.message}</p>
                <p className="text-sm text-gray-400">
                  ID: {item.id}
                </p>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          onClick={addTestData}
          disabled={loading}
        >
          Add Test Data
        </Button>
      </CardFooter>
    </Card>
  );
}

export default FirebaseExample; 