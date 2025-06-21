import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { OrderService } from '../../services/order.service'; // or wherever you put it
import { loadOrders, loadOrdersSuccess } from './orders.actions';

@Injectable()
export class OrderEffects {
  private actions$ = inject(Actions);
  private orderService = inject(OrderService);

  loadOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadOrders),
      mergeMap(() =>
        this.orderService.getOrders().pipe(
          map(orders => loadOrdersSuccess({ orders }))
        )
      )
    )
  );
}
