import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AsyncPipe, CommonModule } from '@angular/common';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
    FormControl
} from '@angular/forms';
import { Observable, take, withLatestFrom } from 'rxjs';

import {
    selectAllUsers,
    selectLastUserId,
    selectSelectedUserId,
    selectSelectedUserName
} from '../../store/users/users.selectors';
import { upsertUser, deleteUser, selectUser } from '../../store/users/users.actions';
import {
    addOrder,
    deleteOrdersByUserId
} from '../../store/orders/orders.actions';
import {
    selectLastOrderId,
    selectSelectedUserTotal
} from '../../store/orders/orders.selectors';

import { UserNameComponent } from '../user-name/user-name.component';
import { UserTotalComponent } from '../user-total/user-total.component';
import { MatCard } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import {map} from "rxjs/operators";

@Component({
    selector: 'app-user-orders',
    standalone: true,
    imports: [
        AsyncPipe,
        CommonModule,
        UserNameComponent,
        UserTotalComponent,
        FormsModule,
        ReactiveFormsModule,
        MatCard,
        MatFormField,
        MatLabel,
        MatSelect,
        MatOption,
        MatButton,
        MatInput,
        MatError,
        MatTabGroup,
        MatTab
    ],
    templateUrl: './user-orders.component.html',
    styleUrl: './user-orders.component.scss'
})
export class UserOrdersComponent {
    private store = inject(Store);
    private fb = inject(FormBuilder);

    public selectedTabIndex = 0;

    public addUserForm: FormGroup<{
        name: FormControl<string>;
        order: FormControl<number | null>;
    }> = this.fb.group({
        name: this.fb.control('', { nonNullable: true, validators: [Validators.required] }),
        order: this.fb.control<number | null>(null, Validators.required)
    });

    public updateUserForm: FormGroup<{
        id: FormControl<number | null>;
        name: FormControl<string>;
        order: FormControl<number | null>;
    }> = this.fb.group({
        id: this.fb.control<number | null>(null),
        name: this.fb.control('', { nonNullable: true }),
        order: this.fb.control<number | null>(null)
    });

    public usersArray$: Observable<{ id: number; name: string }[]> = this.store.select(selectAllUsers).pipe(
        map(users => users.map(user => ({ id: user.id, name: user.name })))
    );

    public selectedUserId$ = this.store.select(selectSelectedUserId);
    public userName$ = this.store.select(selectSelectedUserName);
    public userTotal$ = this.store.select(selectSelectedUserTotal);

    public onSelectUser(userId: number): void {
        this.store.select(selectAllUsers).pipe(take(1)).subscribe(users => {
            const user = users.find(u => u.id === userId);
            if (user) {
                this.updateUserForm.patchValue({
                    id: user.id,
                    name: user.name,
                    order: null
                });
                this.store.dispatch(selectUser({ userId }));
            }
        });
    }

    public onAddUser(): void {
        if (this.addUserForm.invalid) return;

        const { name, order } = this.addUserForm.getRawValue();
        if (!order) return;

        this.store.select(selectLastUserId).pipe(
            take(1),
            withLatestFrom(this.store.select(selectLastOrderId))
        ).subscribe(([lastUserId, lastOrderId]) => {
            const newUserId = lastUserId + 1;
            const newOrderId = lastOrderId + 1;

            this.store.dispatch(upsertUser({ user: { id: newUserId, name } }));
            this.store.dispatch(addOrder({ order: { id: newOrderId, userId: newUserId, total: order } }));

            this.addUserForm.reset();
        });
    }

    public onUpdateUser(): void {
        const { id, name, order } = this.updateUserForm.getRawValue();
        if (id === null || (!name && !order)) return;

        if (name) {
            this.store.dispatch(upsertUser({ user: { id, name } }));
        }

        if (order) {
            this.store.select(selectLastOrderId).pipe(take(1)).subscribe(lastOrderId => {
                const newOrderId = lastOrderId + 1;
                this.store.dispatch(addOrder({ order: { id: newOrderId, userId: id, total: order } }));
            });
        }

        this.updateUserForm.reset();
        this.store.dispatch(selectUser({ userId: null }));
    }

    public onRemoveUser(): void {
        this.store.select(selectSelectedUserId).pipe(take(1)).subscribe(userId => {
            if (userId != null) {
                this.store.dispatch(deleteUser({ userId }));
                this.store.dispatch(deleteOrdersByUserId({ userId }));
            }
        });
        this.updateUserForm.reset();
    }
}
