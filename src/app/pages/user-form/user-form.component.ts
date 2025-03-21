import { Component, inject, Input } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { UserService } from '../../services/user.service';
import { IResponse } from '../../interfaces/iresponse.interface';
import { UserFormComponentComponent } from '../../components/user-form-component/user-form-component.component';

@Component({
  selector: 'app-user-form',
  imports: [UserFormComponentComponent],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  
}
