import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get('/api/user')
  }

  createUser(user: User) {
    return this.http.post('/api/user', user)
  }

  getToken(user) {
    return this.http.post('/api/token', user)
  }

  removeUser(id) {
    return this.http.delete(`/api/user/${id}`)
  }
}