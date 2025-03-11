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
  
  // React types that components need
  export interface SVGProps<T> extends React.SVGAttributes<T> {
    children?: React.ReactNode;
    className?: string;
  }
  
  export interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    className?: string;
    style?: CSSProperties;
    // Add other common HTML attributes as needed
    [key: string]: any;
  }
  
  export interface ButtonHTMLAttributes<T> extends HTMLAttributes<T> {
    type?: 'submit' | 'reset' | 'button';
    disabled?: boolean;
    // Add other button-specific attributes as needed
  }
  
  export interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
    type?: string;
    value?: string | number | readonly string[];
    disabled?: boolean;
    // Add other input-specific attributes as needed
  }
  
  export interface TextareaHTMLAttributes<T> extends HTMLAttributes<T> {
    value?: string | number | readonly string[];
    disabled?: boolean;
    // Add other textarea-specific attributes as needed
  }
  
  export interface ThHTMLAttributes<T> extends HTMLAttributes<T> {}
  export interface TdHTMLAttributes<T> extends HTMLAttributes<T> {}
  
  export type ElementRef<T> = T;
  export type ComponentPropsWithoutRef<T> = any;
  export type ReactNode = any;
  export type ReactElement<T> = any;
  
  export const forwardRef: any;
  export const useState: any;
  export const useEffect: any;
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
declare module '@radix-ui/react-slot';

// React Three Fiber modules
declare module '@react-three/fiber';
declare module '@react-three/drei';

// Utility modules
declare module 'class-variance-authority' {
  export function cva(...args: any[]): any;
  export type VariantProps<T> = any;
} 