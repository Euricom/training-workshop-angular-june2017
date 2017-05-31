import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { User } from '../models/user.model';

@Injectable()
export class UserService {
  constructor(private http: Http) {
  }

  getAll(): Observable<User[]> {
    return this.http.get('/api/users')
      .map((res: Response) => res.json())
      .map(data => data.users.map(item => new User(item)));
  }

  getById(id): Observable<User> {
    return this.http.get(`/api/users/${id}`)
      .map((res: Response) => res.json())
      .map(data => new User(data));
  }

  save(user: User): Observable<User> {
    if (user.id) {
      return this.http.put(`/api/users/${user.id}`, user)
        .map((res: Response) => res.json())
        .map(resource => new User(resource));
    } else {
      return this.http.post(`/api/users`, user)
        .map((res: Response) => res.json())
        .map(resource => new User(resource));
    }
  }

  delete(user: User): Observable<User> {
    return this.http.delete(`/api/users/${user.id}`)
      .map((res: Response) => res.json())
      .map(resource => new User(resource));
  }
}


