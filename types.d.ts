// This file provides global type declarations

// Declare React JSX namespace to avoid "JSX element implicitly has type 'any'" errors
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

// Declare modules for which type definitions are missing
declare module 'react' {
  export * from 'react';
  export interface SVGProps<T> extends React.SVGAttributes<T> {
    children?: React.ReactNode;
    className?: string;
  }
}

declare module 'next/link';
declare module 'next/image';
declare module 'next/font/google';
declare module 'next-themes';
declare module 'lucide-react';
declare module 'firebase/firestore';
declare module 'firebase/auth';

// Radix UI modules
declare module '@radix-ui/react-tabs';
declare module '@radix-ui/react-dialog';
declare module '@radix-ui/react-label';
declare module '@radix-ui/react-progress';
declare module '@radix-ui/react-radio-group';
declare module '@radix-ui/react-select';
declare module '@radix-ui/react-slider';
declare module '@radix-ui/react-toast';

// React Three Fiber modules
declare module '@react-three/fiber';
declare module '@react-three/drei';

// Utility modules
declare module 'class-variance-authority'; 