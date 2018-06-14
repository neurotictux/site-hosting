import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get('/api/user')
  }

  saveUser(user) {
    if (user.userId > 0)
      return this.http.put('/api/user', user)
    else
      return this.http.post('/api/user', user)
  }

  removeUser(id){
    return this.http.delete(`/api/user/${id}`)
  }
}