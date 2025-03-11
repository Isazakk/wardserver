import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { 
  signIn, 
  signUp, 
  signOut, 
  resetPassword, 
  onAuthChange, 
  getCurrentUser 
} from '@/lib/firebase/auth';
import { getDocument, createDocumentWithId } from '@/lib/firebase/firestore';
import { collections, User as UserData } from '@/lib/firebase';

interface AuthState {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  error: string | null;
}

interface UseAuthReturn extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName?: string) => Promise<void>;
  logout: () => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
}

export function useFirebaseAuth(): UseAuthReturn {
  const [state, setState] = useState<AuthState>({
    user: getCurrentUser(),
    userData: null,
    loading: true,
    error: null,
  });

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthChange(async (user) => {
      setState((prev) => ({ ...prev, loading: true }));

      if (user) {
        try {
          // Get additional user data from Firestore
          const userData = await getDocument<UserData>(collections.USERS, user.uid);
          setState({
            user,
            userData,
            loading: false,
            error: null,
          });
        } catch (error) {
          console.error('Error fetching user data:', error);
          setState({
            user,
            userData: null,
            loading: false,
            error: 'Failed to load user data',
          });
        }
      } else {
        // User is signed out
        setState({
          user: null,
          userData: null,
          loading: false,
          error: null,
        });
      }
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const user = await signIn(email, password);
      // Note: userData will be set by the auth state listener
    } catch (error) {
      console.error('Login error:', error);
      setState((prev) => ({
        ...prev,
        loading: false,
        error: 'Failed to login. Please check your credentials.',
      }));
      throw error;
    }
  };

  const register = async (email: string, password: string, displayName?: string) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const user = await signUp(email, password, displayName);
      
      // Create user document in Firestore
      await createDocumentWithId<UserData>(
        collections.USERS,
        user.uid,
        {
          id: user.uid,
          email: user.email || email,
          displayName: displayName || user.displayName || email.split('@')[0],
          role: 'user',
        }
      );
      
      // Note: userData will be set by the auth state listener
    } catch (error) {
      console.error('Registration error:', error);
      setState((prev) => ({
        ...prev,
        loading: false,
        error: 'Failed to register. Please try again.',
      }));
      throw error;
    }
  };

  const logout = async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      await signOut();
      // State will be updated by the auth state listener
    } catch (error) {
      console.error('Logout error:', error);
      setState((prev) => ({
        ...prev,
        loading: false,
        error: 'Failed to logout. Please try again.',
      }));
      throw error;
    }
  };

  const sendPasswordReset = async (email: string) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      await resetPassword(email);
      setState((prev) => ({ ...prev, loading: false }));
    } catch (error) {
      console.error('Password reset error:', error);
      setState((prev) => ({
        ...prev,
        loading: false,
        error: 'Failed to send password reset email. Please try again.',
      }));
      throw error;
    }
  };

  return {
    ...state,
    login,
    register,
    logout,
    sendPasswordReset,
  };
} 