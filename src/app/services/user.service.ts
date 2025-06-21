import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {mockUsers} from '../mock/mock-data';
import {User} from '../store/users/users.models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  getUsers(): Observable<User[]> {
    return of(mockUsers);
  }

  getUserDetails(userId: number): Observable<User> {
    return of(mockUsers).pipe(
      map(users => {
        const user = users.find((u: { id: number; }) => u.id === userId);
        if (!user) throw new Error('User not found');
        return user;
      })
    );
  }
}
