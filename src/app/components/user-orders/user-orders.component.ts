import {Component, inject, OnInit} from '@angular/core';
import {
    selectLastUserId,
    selectSelectedUserId,
    selectSelectedUserName,
    selectUserEntities
} from '../../store/users/users.selectors';
import {Store} from '@ngrx/store';
import {deleteUser, selectUser, upsertUser} from '../../store/users/users.actions';
import {AsyncPipe, CommonModule} from '@angular/common';
import {map, take} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {User} from '../../app.state';
import {UserNameComponent} from '../user-name/user-name.component';
import {UserTotalComponent} from '../user-total/user-total.component';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators
} from '@angular/forms';
import {MatCard} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {MatError, MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {MatSelect} from "@angular/material/select";
import {MatOption} from "@angular/material/core";
import {addOrder, deleteOrdersByUserId} from "../../store/orders/orders.actions";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {selectLastOrderId, selectSelectedUserTotal} from "../../store/orders/orders.selectors";

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
export class UserOrdersComponent implements OnInit {
    public store = inject(Store);
    public fb = inject(FormBuilder);

    public selectedTabIndex = 0;

    public addUserForm: FormGroup = this.fb.group({
        name: ['', Validators.required],
        order: [null, Validators.required]
    });

    public updateUserForm: FormGroup = this.fb.group({
        id: [null],
        name: [''],
        order: [null]
    });

    public usersArray$: Observable<{ id: number; name: string }[]> = this.store.select(selectUserEntities).pipe(
        map(entities => Object.entries(entities).map(([id, user]) => ({
            id: Number(id),
            name: user.name
        })))
    );

    public selectedUserId$ = this.store.select(selectSelectedUserId);
    public userName$ = this.store.select(selectSelectedUserName);
    public userTotal$ = this.store.select(selectSelectedUserTotal);
    public userEntities: { [id: number]: User } = {};

    public ngOnInit(): void {
        this.store.select(selectUserEntities).pipe(take(1)).subscribe(entities => {
            this.userEntities = entities;
        });
    }

    public onSelectUser(userId: number): void {
        this.store.select(selectUserEntities).pipe(take(1)).subscribe(entities => {
            const user = entities[userId];
            if (user) {
                this.updateUserForm.patchValue({
                    id: user.id,
                    name: user.name,
                    order: null
                });
            }
        });
        this.store.dispatch(selectUser({userId}));
    }

    public onAddUser(): void {
        if (this.addUserForm.invalid) return;

        const {name, order} = this.addUserForm.value;

        this.store.select(selectLastUserId).pipe(take(1)).subscribe(lastUserId => {
            const newUserId = lastUserId + 1;

            this.store.select(selectLastOrderId).pipe(take(1)).subscribe(lastOrderId => {
                const newOrderId = lastOrderId + 1;

                this.store.dispatch(upsertUser({user: {id: newUserId, name}}));
                this.store.dispatch(addOrder({ order: { id: newOrderId, userId: newUserId, total: order } }));


                this.addUserForm.reset();
            });
        });
    }


    public onUpdateUser(): void {
        const {id, name, order} = this.updateUserForm.getRawValue();

        if (!name && !order) return;

        if (name) {
            this.store.dispatch(upsertUser({user: {id, name}}));
        }

        if (order) {
            this.store.select(selectLastOrderId).pipe(take(1)).subscribe(lastOrderId => {
                const newOrderId = lastOrderId + 1;
                this.store.dispatch(addOrder({ order: { id: newOrderId, userId: id, total: order } }));
            });
        }

        this.updateUserForm.reset();
        this.store.dispatch(selectUser({userId: 0}));
    }


    public onRemoveUser(): void {
        this.store.select(selectSelectedUserId).pipe(take(1)).subscribe(userId => {
            if (userId != null) {
                this.store.dispatch(deleteUser({userId}));
                this.store.dispatch(deleteOrdersByUserId({userId}));
            }
        });
        this.updateUserForm.reset();
    }
}
