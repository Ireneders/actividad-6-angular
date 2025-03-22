import { Component, EventEmitter, inject, Input } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { IResponse } from '../../interfaces/iresponse.interface';
import { UserService } from '../../services/user.service';
import { Router, RouterLink } from '@angular/router';
import { toast } from 'ngx-sonner';
import Swal from 'sweetalert2';

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
        Swal.fire({
          icon: "error",
          title: "Error",
          text: ((this.theUser as any).error),
        });
        this.router.navigate(['/home']);
      }
    } catch (error:any){
      toast.error(error);
    }finally{
      this.isLoading = false;
    }
  }

  deleteUser(_id: string) {
    Swal.fire({
      title: "¿Estas seguro?",
      text: `Vas a borrar al usuario ${this.theUser.username}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrar",
      cancelButtonText: "Cancelar"

    }).then((result) => {
      if (result.isConfirmed) {
      let response =  this.userServices.delete(_id);
      Swal.fire({
          title: "Usuario eliminado",
          icon: "success",
          draggable: true
        });
        this.router.navigate(['/home']);
      if ('error' in this.theUser) {
        toast.error((this.theUser as any).error);
      }} else{
        this.router.navigate(['/home']);
      }
      })
    };

   

}
