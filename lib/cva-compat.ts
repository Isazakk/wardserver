/**
 * class-variance-authority Compatibility Layer
 * 
 * This file provides type definitions for class-variance-authority
 * to avoid TypeScript errors in UI components.
 */

import { cva as originalCva } from 'class-variance-authority';

export const cva = originalCva;
export type VariantProps<T> = any; 