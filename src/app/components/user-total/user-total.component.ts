import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-user-total',
  standalone: true,
  imports: [],
  templateUrl: './user-total.component.html',
  styleUrl: './user-total.component.scss'
})
export class UserTotalComponent {
  @Input() total: number | null = null;

}
