import { createSelector } from '@ngrx/store';
import {AppState} from '../../app.state';

const selectOrdersState = (state: AppState) => state.orders;

export const selectOrderEntities = createSelector(
  selectOrdersState,
  orders => orders.entities
);
