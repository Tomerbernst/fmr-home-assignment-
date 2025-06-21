import {Order, User} from '../app.state';

export const mockUsers: User[] = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
];

export const mockOrders: Order[] = [
  { id: 101, userId: 1, total: 250 },
  { id: 102, userId: 1, total: 150 },
  { id: 103, userId: 2, total: 300 },
  { id: 104, userId: 3, total: 100 },
  { id: 105, userId: 3, total: 200 }
];
