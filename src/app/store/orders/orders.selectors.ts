import {createSelector} from '@ngrx/store';
import {AppState} from '../../app.state';
import {selectSelectedUserId} from '../users/users.selectors';
import {orderAdapter} from './orders.reducer';
import {OrdersState} from './orders.reducer';

export const selectOrdersState = (state: AppState): OrdersState => state.orders;

const {
  selectAll: selectAllOrders,
} = orderAdapter.getSelectors(selectOrdersState);


export const selectSelectedUserOrders = createSelector(
  selectAllOrders,
  selectSelectedUserId,
  (orders, userId) =>
    userId !== null ? orders.filter(order => order.userId === userId) : []
);

export const selectSelectedUserTotal = createSelector(
  selectSelectedUserOrders,
  (orders) => orders.reduce((sum, order) => sum + order.total, 0)
);

export const selectLastOrderId = createSelector(
  selectAllOrders,
  (orders) => orders.length ? Math.max(...orders.map(order => order.id)) : 0
);
