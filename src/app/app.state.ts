export interface AppState {
  users: {
    entities: { [id: number]: User };
    selectedUserId: number | null;
  };
  orders: {
    entities: { [id: number]: Order };
  };
}

export interface User {
  id: number;
  name: string;
}

export interface Order {
  id: number;
  userId: number;
  total: number;
}
