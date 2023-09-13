import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  async setItem(key: string, value: any): Promise<void> {
    return new Promise<void>((resolve) => {
      localStorage.setItem(key, JSON.stringify(value));
      resolve();
    });
  }

  async getItem<T>(key: string): Promise<T | null> {
    return new Promise<T | null>((resolve) => {
      const item = localStorage.getItem(key);
      resolve(item ? JSON.parse(item) : null);
    });
  }

  async removeItem(key: string): Promise<void> {
    return new Promise<void>((resolve) => {
      localStorage.removeItem(key);
      resolve();
    });
  }
}
