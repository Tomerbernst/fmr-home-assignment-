import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { routes } from './app.routes';
import { usersReducer } from './store/users/users.reducer';
import { ordersReducer } from './store/orders/orders.reducer';
import {provideEffects} from '@ngrx/effects';
import {UsersEffects} from './store/users/users.effects';
import {OrderEffects} from './store/orders/orders.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({
      users: usersReducer,
      orders: ordersReducer
    }),
    provideEffects(UsersEffects, OrderEffects)
  ]
};
