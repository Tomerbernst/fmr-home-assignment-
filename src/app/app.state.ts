import {UsersState} from './store/users/users.reducer';
import {OrdersState} from './store/orders/orders.reducer';

export interface AppState {
  users: UsersState;
  orders: OrdersState;
}

