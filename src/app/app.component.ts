import {Component, inject, OnInit} from '@angular/core';
import {UserOrdersComponent} from './components/user-orders/user-orders.component';
import {loadUsers} from './store/users/users.actions';
import {Store} from '@ngrx/store';
import {loadOrders} from './store/orders/orders.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserOrdersComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  public title = 'fmr-home-assignment';
  public store = inject(Store);

  public ngOnInit(): void {
    this.store.dispatch(loadUsers());
    this.store.dispatch(loadOrders());
  }

}
