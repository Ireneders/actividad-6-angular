import { Component, inject, Input } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { UserService } from '../../services/user.service';
import { IResponse } from '../../interfaces/iresponse.interface';


@Component({
  selector: 'app-user-form',
  imports: [],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  
}
