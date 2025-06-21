import {createSelector} from '@ngrx/store';
import {AppState, Order} from '../../app.state';
import {selectSelectedUserId} from '../users/users.selectors';

const selectOrdersState = (state: AppState) => state.orders;

export const selectOrderEntities = createSelector(
  selectOrdersState,
  orders => orders.entities
);

export const selectSelectedUserOrders = createSelector(
  selectOrderEntities,
  selectSelectedUserId,
  (orders, userId) =>
    userId !== null
      ? Object.values(orders as Record<number, Order>).filter(o => o.userId === userId)
      : []
);

export const selectSelectedUserTotal = createSelector(
  selectSelectedUserOrders,
  orders =>
    orders.reduce((sum: number, order: Order) => sum + order.total, 0)
);
