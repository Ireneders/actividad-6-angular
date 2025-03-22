import { Component, inject, input, Input } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { UserService } from '../../services/user.service';
import { IResponse } from '../../interfaces/iresponse.interface';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { toast, NgxSonnerToaster } from 'ngx-sonner';
import { IError, IRequest } from '../../interfaces/error.interface';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
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
  userService = inject (UserService);
  userForm : FormGroup = new FormGroup({}, []);
  tittle: string = 'Nuevo ';
  router= inject(Router);

  async ngOnInit() {

    if (this.idUser) {
      
        this.theUser = await this.userService.getById(this.idUser);
        this.tittle = 'Actualizar ';
        if ('error' in this.theUser) {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: ((this.theUser as any).error),
              });
              this.router.navigate(['/home']);
        }
     
    }

    this.userForm = new FormGroup({
      _id: new FormControl(this.idUser || null, []),
      first_name: new FormControl(this.theUser?.first_name || "", []),
      last_name: new FormControl(this.theUser?.last_name || "", []),
      email: new FormControl(this.theUser?.email || "", []),
      image: new FormControl(this.theUser?.image || "", []),
    }, []);

  }

  getDataForm () {
    //console.log(this.userForm.value);check

     try {
       if (this.userForm.value._id) {
         this.userService.update(this.userForm.value);
         Swal.fire({
          title: "Usuario actualizado",
          text: `Has actualizado a ${this.theUser.first_name} ${this.theUser.username}`, 
          icon: "success",
          draggable: true
        });
         if ('request' in this.theUser) {
           toast.error((this.theUser as any).request);
         }
       } else {
         this.userService.insert(this.userForm.value);
       }
     } catch (error) {
       toast.error(error as string);
     }
  }

}
