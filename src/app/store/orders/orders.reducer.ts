import {createReducer, on} from '@ngrx/store';
import * as OrdersActions from './orders.actions';
import {Order} from '../../app.state';
import {addOrder} from './orders.actions';

export interface OrdersState {
  entities: { [id: number]: Order };
}

const initialState: OrdersState = {
  entities: {}
};

export const ordersReducer = createReducer(
  initialState,
  on(OrdersActions.loadOrdersSuccess, (state, {orders}) => ({
    ...state,
    entities: orders.reduce((acc, order) => ({...acc, [order.id]: order}), {})
  })),
  on(addOrder, (state, {order}) => ({
    ...state,
    entities: {
      ...state.entities,
      [order.id]: order
    }
  })),
  on(OrdersActions.deleteOrdersByUserId, (state, { userId }) => {
    const filtered: Record<number, Order> = {};

    for (const [id, order] of Object.entries(state.entities)) {
      const numericId = Number(id);
      if (order.userId !== userId) {
        filtered[numericId] = order;
      }
    }

    return {
      ...state,
      entities: filtered
    };
  })

);
