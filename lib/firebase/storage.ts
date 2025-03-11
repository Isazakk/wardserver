import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll,
  UploadResult,
  StorageReference
} from 'firebase/storage';
import { storage } from './config';

/**
 * Upload a file to Firebase Storage
 */
export const uploadFile = async (
  path: string,
  file: Blob | Uint8Array | ArrayBuffer,
  metadata?: { contentType?: string; customMetadata?: Record<string, string> }
): Promise<{ url: string; ref: StorageReference }> => {
  const storageRef = ref(storage, path);
  const uploadResult = await uploadBytes(storageRef, file, metadata);
  const url = await getDownloadURL(uploadResult.ref);
  
  return {
    url,
    ref: uploadResult.ref,
  };
};

/**
 * Get the download URL for a file
 */
export const getFileUrl = async (path: string): Promise<string> => {
  const storageRef = ref(storage, path);
  return getDownloadURL(storageRef);
};

/**
 * Delete a file from Firebase Storage
 */
export const deleteFile = async (path: string): Promise<void> => {
  const storageRef = ref(storage, path);
  await deleteObject(storageRef);
};

/**
 * List all files in a directory
 */
export const listFiles = async (path: string): Promise<StorageReference[]> => {
  const storageRef = ref(storage, path);
  const listResult = await listAll(storageRef);
  return listResult.items;
};

/**
 * Generate a unique file path for upload
 */
export const generateFilePath = (
  folder: string,
  fileName: string,
  userId?: string
): string => {
  const timestamp = Date.now();
  const uniqueId = Math.random().toString(36).substring(2, 10);
  const extension = fileName.split('.').pop();
  
  // Format: folder/userId_timestamp_uniqueId.extension
  const userPrefix = userId ? `${userId}_` : '';
  return `${folder}/${userPrefix}${timestamp}_${uniqueId}.${extension}`;
}; 