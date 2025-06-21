import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import * as OrdersActions from './orders.actions';
import { Order } from './orders.models';

export interface OrdersState extends EntityState<Order> {}

export const orderAdapter: EntityAdapter<Order> = createEntityAdapter<Order>();

export const initialState: OrdersState = orderAdapter.getInitialState();

export const ordersReducer = createReducer(
  initialState,

  on(OrdersActions.loadOrdersSuccess, (state, { orders }) =>
    orderAdapter.setAll(orders, state)
  ),

  on(OrdersActions.addOrder, (state, { order }) =>
    orderAdapter.upsertOne(order, state)
  ),

  on(OrdersActions.deleteOrdersByUserId, (state, { userId }) => {
    const ordersToKeep = Object.values(state.entities).filter(
      (order): order is Order => !!order && order.userId !== userId
    );

    return orderAdapter.setAll(ordersToKeep, state);
  })
);
