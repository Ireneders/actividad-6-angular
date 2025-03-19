import { Component, Input } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';

@Component({
  selector: 'app-user-card',
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {

  @Input() miUser: IUser= {
    _id: '',
    id: 0,
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    image: '',
    password: ''
  };
  
  constructor() {
    console.log('Constructor:', this.miUser);
  }
}
