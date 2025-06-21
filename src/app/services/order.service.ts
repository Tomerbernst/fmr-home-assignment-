import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {mockOrders} from '../mock/mock-data';
import {Order} from '../app.state';

@Injectable({providedIn: 'root'})
export class OrderService {
  getOrders(): Observable<Order[]> {
    return of(mockOrders);
  }
}
