import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {UserService} from '../../services/user.service';
import {loadUsers, loadUsersSuccess, selectUser, upsertUser} from './users.actions';
import {switchMap, map, takeUntil, filter} from 'rxjs/operators';
import {Subject} from "rxjs";

@Injectable()
export class UsersEffects {
    private actions$ = inject(Actions);
    private userService = inject(UserService);
    private cancel$ = new Subject<void>();

    loadUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadUsers),
            switchMap(() =>
                this.userService.getUsers().pipe(
                    map(users => loadUsersSuccess({users}))
                )
            )
        )
    );
    loadUserDetails$ = createEffect(() =>
        this.actions$.pipe(
            ofType(selectUser),
            filter(({userId}) => userId !== null),
            switchMap(({userId}) => {
                this.cancel$.next();

                return this.userService.getUserDetails(userId!).pipe(
                    takeUntil(this.cancel$),
                    map(user => upsertUser({user}))
                );
            })
        )
    );

}
