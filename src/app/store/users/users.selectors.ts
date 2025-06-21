import { createSelector } from '@ngrx/store';
import {AppState, Order} from '../../app.state';

const selectUsersState = (state: AppState) => state.users;
const selectOrdersState = (state: AppState) => state.orders;

export const selectUserEntities = createSelector(
  selectUsersState,
  users => users.entities
);

export const selectSelectedUserId = createSelector(
  selectUsersState,
  users => users.selectedUserId
);

export const selectSelectedUser = createSelector(
  selectUserEntities,
  selectSelectedUserId,
  (entities, selectedId) => selectedId !== null ? entities[selectedId] : null
);

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

export const selectSelectedUserName = createSelector(
  selectSelectedUser,
  user => user?.name ?? null
);

export const selectSelectedUserTotal = createSelector(
  selectSelectedUserOrders,
  orders => orders.reduce((sum: number, o: Order) => sum + o.total, 0)
);

export const selectSelectedUserNameAndTotal = createSelector(
  selectSelectedUserName,
  selectSelectedUserTotal,
  (name, total) => name !== null ? { name, total } : null
);
