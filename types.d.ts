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
}

declare module '@radix-ui/react-tabs';
declare module '@radix-ui/react-dialog';
declare module '@radix-ui/react-label';
declare module '@radix-ui/react-progress';
declare module '@radix-ui/react-radio-group';
declare module '@radix-ui/react-select';
declare module '@radix-ui/react-slider';
declare module '@radix-ui/react-toast';
declare module 'class-variance-authority'; 