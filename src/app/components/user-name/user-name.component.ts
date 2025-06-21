import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-user-name',
  standalone: true,
  imports: [],
  templateUrl: './user-name.component.html',
  styleUrl: './user-name.component.scss'
})
export class UserNameComponent {
  @Input() name: string | null = null;

}
