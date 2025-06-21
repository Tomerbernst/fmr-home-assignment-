import {createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import * as UsersActions from './users.actions';
import {User} from './users.models';

export interface UsersState extends EntityState<User> {
  selectedUserId: number | null;
}

export const userAdapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialState: UsersState = userAdapter.getInitialState({
  selectedUserId: null
});

export const usersReducer = createReducer(
  initialState,

  on(UsersActions.loadUsersSuccess, (state, {users}) =>
    userAdapter.setAll(users, state)
  ),

  on(UsersActions.upsertUser, (state, {user}) =>
    userAdapter.upsertOne(user, state)
  ),

  on(UsersActions.deleteUser, (state, {userId}) => {
    const newState = userAdapter.removeOne(userId, state);
    return {
      ...newState,
      selectedUserId: state.selectedUserId === userId ? null : state.selectedUserId
    };
  }),

  on(UsersActions.selectUser, (state, {userId}) => ({
    ...state,
    selectedUserId: userId
  }))
);
