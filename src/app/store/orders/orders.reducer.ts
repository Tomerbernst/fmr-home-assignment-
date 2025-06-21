import { createReducer, on } from '@ngrx/store';
import * as OrdersActions from './orders.actions';
import { Order } from '../../app.state';

export interface OrdersState {
  entities: {
    [id: number]: Order;
  };
}

const initialState: OrdersState = {
  entities: {}
};

export const ordersReducer = createReducer(
  initialState,

  on(OrdersActions.loadOrdersSuccess, (state, { orders }) => ({
    ...state,
    entities: orders.reduce(
      (acc, order) => ({ ...acc, [order.id]: order }),
      {} as { [id: number]: Order }
    )
  })),

  on(OrdersActions.addOrder, (state, { order }) => ({
    ...state,
    entities: {
      ...state.entities,
      [order.id]: order
    }
  })),

  on(OrdersActions.deleteOrdersByUserId, (state, { userId }) => {
    const filtered: { [id: number]: Order } = {};

    for (const [id, order] of Object.entries(state.entities)) {
      if (order.userId !== userId) {
        filtered[+id] = order;
      }
    }

    return {
      ...state,
      entities: filtered
    };
  })
);
