import {createSelector} from '@ngrx/store';
import {AppState, Order} from '../../app.state';

export const selectOrderEntities = createSelector(
  (state: AppState) => state.orders,
  orders => orders.entities
);

export const selectTotalOrderAmount = createSelector(
  selectOrderEntities,
  entities => {
    const orders = Object.values(entities as Record<number, Order>);
    return orders.reduce((sum: number, o: Order) => sum + o.total, 0);
  }
);
