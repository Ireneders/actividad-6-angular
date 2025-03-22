import { Component, EventEmitter, inject, Input } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { Router, RouterLink } from '@angular/router';
import { toast } from 'ngx-sonner';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-user-card',
  imports: [RouterLink],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css',
})
export class UserCardComponent {
  router= inject(Router);
  @Input() miUser!: IUser;
  userService = inject(UserService);
  @Input() deleteItemEmit: EventEmitter<Boolean> = new EventEmitter();

deleteUser(_id: string) {
    Swal.fire({
      title: "¿Estas seguro?",
      text: `Vas a borrar al usuario ${this.miUser.username}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrar",
      cancelButtonText: "Cancelar"

    }).then((result) => {
      if (result.isConfirmed) {
      let response =  this.userService.delete(_id);
      Swal.fire({
          title: "Usuario eliminado",
          icon: "success",
          draggable: true
        });
        this.router.navigate(['/home']);
      if ('error' in this.miUser) {
        toast.error((this.miUser as any).error);
      }} else{
        this.router.navigate(['/home']);
      }
      })
    };

}
