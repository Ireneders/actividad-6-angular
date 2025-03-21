import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IUser } from '../../interfaces/iuser.interface';

@Component({
  selector: 'app-user-form-component',
  imports: [FormsModule],
  templateUrl: './user-form-component.component.html',
  styleUrl: './user-form-component.component.css'
})
export class UserFormComponentComponent {
  @Input() miUser!: IUser;

}
