import { Component, EventEmitter, inject, Input } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { IResponse } from '../../interfaces/iresponse.interface';
import { UserService } from '../../services/user.service';
import { Router, RouterLink } from '@angular/router';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-user-detail',
  imports: [RouterLink],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent {
  @Input() idUser: string = '';
  theUser: IUser={
    _id: '',
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    image: '',
    password: ''
  }
  userServices = inject (UserService);

  isLoading: boolean = false;
  router= inject(Router);
  

  async ngOnInit() {
    this.isLoading = true;
    try{
      this.theUser = await this.userServices.getById(this.idUser);
      if ('error' in this.theUser) {
        toast.error((this.theUser as any).error);
        this.router.navigate(['/home']);
      }
    } catch (error:any){
      toast.error(error);
    }finally{
      this.isLoading = false;
    }
  }

  deleteUser(_id: string) {
    toast(`Vas a borrar al usuario ${this.theUser.username}`, {
      action: {
      label: 'Borrar',
      onClick: async () => {
        try {
        let response = await this.userServices.delete(_id);
        toast.success('User deleted successfully');
        if ('error' in this.theUser) {
          toast.error((this.theUser as any).error);
        }
        } catch (error: any) {
        toast.error(`Error deleting user: ${error.message || error}`);
        }
      },
      },
    });
  }
}
