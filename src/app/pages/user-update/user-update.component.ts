import { Component, inject, Input } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { UserService } from '../../services/user.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserFormComponentComponent } from '../../components/user-form-component/user-form-component.component';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-user-update',
  imports: [FormsModule, UserFormComponentComponent],
  templateUrl: './user-update.component.html',
  styleUrl: './user-update.component.css'
})
export class UserUpdateComponent {
  @Input() idUser: string = '';
  theUser: IUser = {
    _id: '',
    id: 0,
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    image: '',
    password: '',
  
  }
  userServices = inject (UserService);
  isLoading: boolean = false;
  

  async ngOnInit() {
      let _id = this.idUser;
      this.isLoading = true;
      try{
        this.theUser = await this.userServices.getById(_id);
      } catch (error:any){
       toast.error(error.message);
      }finally{
        this.isLoading = false;
      }
      
    }
}
