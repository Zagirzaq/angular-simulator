import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  setItem<T>(key: string, value: T): void {
    const text: string = JSON.stringify(value);
    localStorage.setItem(key, text);
  }

  getItem<T>(key: string): T | null {
    const text: string | null = localStorage.getItem(key);
    if (text === null) {
      return null;
    }
    return JSON.parse(text);
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}
