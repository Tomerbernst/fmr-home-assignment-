import { createAction, props } from '@ngrx/store';
import { Order } from '../../app.state';

export const loadOrders = createAction('[Order] Load Orders');
export const loadOrdersSuccess = createAction(
  '[Order] Load Orders Success',
  props<{ orders: Order[] }>()
);

export const addOrder = createAction(
  '[Order] Add Order',
  props<{ order: Order }>()
);

export const deleteOrdersByUserId = createAction(
  '[Order] Delete Orders By UserId',
  props<{ userId: number }>()
);
