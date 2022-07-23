import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  getToken(): string {
    const token = localStorage.getItem('token');
    if (token) {
      return token;
    }
    return '';
  }
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }
  removeToken(): void {
    localStorage.removeItem('token');
  }
}
