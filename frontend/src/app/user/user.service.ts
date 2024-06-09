import { Injectable } from '@angular/core';
import { User, UserTable } from './user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  baseUrl = 'http://localhost:8001';
  authHeader = {
    Authorization: 'Basic WFlaOlh5ekAxMjM0',
    'Content-Type': 'application/json',
  };

  constructor() {}

  async create(user: UserTable): Promise<User> {
    try {
      const url = `${this.baseUrl}/user/create`;
      const response = await fetch(url, {
        method: 'POST',
        headers: this.authHeader,
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        throw new Error('Failed to create user');
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      throw error;
    }
  }

  async read(): Promise<User[]> {
    try {
      const url = `${this.baseUrl}/user/list`;
      const response = await fetch(url, {
        method: 'GET',
        headers: this.authHeader,
      });
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const responseData = await response.json();
      return responseData.data;
    } catch (error) {
      throw error;
    }
  }

  async readById(id: any): Promise<User> {
    try {
      const url = `${this.baseUrl}/user/details?id=${id}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: this.authHeader,
      });
      if (!response.ok) {
        throw new Error('Failed to fetch user details');
      }
      const responseData = await response.json();
      return responseData.data;
    } catch (error) {
      throw error;
    }
  }

  async update(user: User): Promise<User> {
    try {
      const url = `${this.baseUrl}/user/update?id=${user.id}`;
      console.log('User', user);
      const response = await fetch(url, {
        method: 'PUT',
        headers: this.authHeader,
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        throw new Error('Failed to update user');
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  }

  async delete(id: number): Promise<User> {
    try {
      const url = `${this.baseUrl}/user/delete?id=${id}`;
      const response = await fetch(url, {
        method: 'DELETE',
        headers: this.authHeader,
      });
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  }

  async generate(): Promise<void> {
    try {
      const url = `${this.baseUrl}/pdf/generate`;
      const response = await fetch(url, {
        method: 'POST',
        headers: this.authHeader,
        body: JSON.stringify({}),
      });
      if (!response.ok) {
        throw new Error('Failed to  generate pdf');
      }
    } catch (error) {
      throw error;
    }
  }

  async preview(): Promise<ArrayBuffer> {
    try {
      const url = `${this.baseUrl}/pdf/preview`;
      const response = await fetch(url, {
        method: 'GET',
        headers: this.authHeader,
      });

      if (!response.ok) {
        throw new Error('Failed to preview pdf');
      }

      const responseData = await response.arrayBuffer();
      return responseData;
    } catch (error) {
      throw error;
    }
  }
}
