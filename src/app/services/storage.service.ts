import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() { }

  /**
   * Save data to localStorage
   * @param key Storage key
   * @param data Data to be stored
   */
  save<T>(key: string, data: T): void {
    try {
      const serializedData = JSON.stringify(data);
      localStorage.setItem(key, serializedData);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      throw new Error('Failed to save data to localStorage');
    }
  }

  /**
   * Retrieve data from localStorage
   * @param key Storage key
   * @returns The stored data or null if not found
   */
  get<T>(key: string): T | null {
    try {
      const data = localStorage.getItem(key);
      if (data === null) {
        return null;
      }
      return JSON.parse(data) as T;
    } catch (error) {
      console.error('Error retrieving from localStorage:', error);
      throw new Error('Failed to retrieve data from localStorage');
    }
  }

  /**
   * Remove data from localStorage
   * @param key Storage key
   */
  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
      throw new Error('Failed to remove data from localStorage');
    }
  }

  /**
   * Clear all data from localStorage
   */
  clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      throw new Error('Failed to clear localStorage');
    }
  }
}
