import { createReducer, on } from '@ngrx/store';
import * as UsersActions from './users.actions';
import { User } from '../../app.state';

export interface UsersState {
  entities: { [id: number]: User };
  selectedUserId: number | null;
}

const initialState: UsersState = {
  entities: {},
  selectedUserId: null
};

export const usersReducer = createReducer(
  initialState,

  on(UsersActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    entities: users.reduce((acc, user) => ({ ...acc, [user.id]: user }), {})
  })),

  on(UsersActions.selectUser, (state, { userId }) => ({
    ...state,
    selectedUserId: userId
  })),

  on(UsersActions.upsertUser, (state, { user }) => ({
    ...state,
    entities: { ...state.entities, [user.id]: user }
  })),

  on(UsersActions.deleteUser, (state, { userId }) => {
    const newEntities = { ...state.entities };
    delete newEntities[userId];
    return {
      ...state,
      entities: newEntities,
      selectedUserId: state.selectedUserId === userId ? null : state.selectedUserId
    };
  })
);
