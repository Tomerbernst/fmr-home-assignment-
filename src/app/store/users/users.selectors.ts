import {createSelector} from '@ngrx/store';
import {AppState} from '../../app.state';

const selectUsersState = (state: AppState) => state.users;

export const selectUserEntities = createSelector(
  selectUsersState,
  users => users.entities
);

export const selectSelectedUserId = createSelector(
  selectUsersState,
  users => users.selectedUserId
);

export const selectSelectedUser = createSelector(
  selectUserEntities,
  selectSelectedUserId,
  (entities, selectedId) =>
    selectedId !== null ? entities[selectedId] : null
);

export const selectSelectedUserName = createSelector(
  selectSelectedUser,
  user => user?.name ?? null
);

