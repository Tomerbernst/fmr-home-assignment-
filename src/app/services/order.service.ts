import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {mockOrders} from '../mock/mock-data';
import {Order} from '../store/orders/orders.models';

@Injectable({providedIn: 'root'})
export class OrderService {
  public getOrders(): Observable<Order[]> {
    return of(mockOrders);
  }
}
