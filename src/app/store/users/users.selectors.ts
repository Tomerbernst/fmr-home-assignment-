import {createSelector} from '@ngrx/store';
import {AppState} from '../../app.state';
import {UsersState, userAdapter} from './users.reducer';

const selectUsersState = (state: AppState): UsersState => state.users;

const {
  selectAll: selectAllUsers,
  selectEntities: selectUserEntities,
  selectIds: selectUserIds,
} = userAdapter.getSelectors(selectUsersState);

export {selectAllUsers, selectUserEntities, selectUserIds};

export const selectSelectedUserId = createSelector(
  selectUsersState,
  state => state.selectedUserId
);

export const selectSelectedUser = createSelector(
  selectUserEntities,
  selectSelectedUserId,
  (entities, selectedId) => (selectedId != null ? entities[selectedId] ?? null : null)
);

export const selectSelectedUserName = createSelector(
  selectSelectedUser,
  user => user?.name ?? null
);

export const selectLastUserId = createSelector(
  selectUserIds,
  ids => ids.length ? Math.max(...ids.map(Number)) : 0
);
