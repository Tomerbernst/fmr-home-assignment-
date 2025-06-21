import { createAction, props } from '@ngrx/store';
import {User} from '../../app.state';

export const loadUsers = createAction('[User] Load Users');
export const loadUsersSuccess = createAction('[User] Load Users Success', props<{ users: User[] }>());
export const selectUser = createAction('[User] Select User', props<{ userId: number | null }>());
export const upsertUser = createAction('[User] Upsert User', props<{ user: User }>());
export const deleteUser = createAction('[User] Delete User', props<{ userId: number }>());
