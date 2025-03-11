/**
 * React Compatibility Layer
 * 
 * This file provides type definitions for React components
 * to avoid TypeScript errors in UI components.
 */

import * as React from 'react';

// Type utilities 
export type ComponentProps<T> = any;
export type ElementRef<T> = any;
export type ComponentPropsWithoutRef<T> = any;
export type ReactNode = any;
export type ReactElement<T> = any;
export type HTMLAttributes<T> = any;
export type ButtonHTMLAttributes<T> = any;
export type InputHTMLAttributes<T> = any;
export type TextareaHTMLAttributes<T> = any;
export type ThHTMLAttributes<T> = any;
export type TdHTMLAttributes<T> = any;
export type SVGProps<T> = any;

// React functions
export function forwardRef(render: any): any {
  return React.forwardRef(render);
}
export const useState = React.useState;
export const useEffect = React.useEffect; 