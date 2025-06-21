import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {mockUsers} from '../mock/mock-data';
import {User} from '../app.state';

@Injectable({ providedIn: 'root' })
export class UserService {
  getUsers():Observable<User[]> {
    return of(mockUsers);
  }
}
