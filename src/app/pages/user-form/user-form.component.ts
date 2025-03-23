import { Component, inject, input, Input } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { UserService } from '../../services/user.service';
import { IResponse } from '../../interfaces/iresponse.interface';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
      first_name: new FormControl(this.theUser?.first_name || "", [
        Validators.required,
        Validators.minLength(3),
      ]),
      last_name: new FormControl(this.theUser?.last_name || "", [
        Validators.required,
        Validators.maxLength(50)]),
      email: new FormControl(this.theUser?.email || "", [
        Validators.required,
        Validators.pattern(/^\w+([.-]?\w+)*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
      ]),
      image: new FormControl(this.theUser?.image || "", [
        Validators.required,
        Validators.pattern(/^(https?:\/\/)?(www\.)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/),
      ]),
    }, [


    ]);

  }

  getDataForm () {
    try {
      if (this.userForm.value._id) {
        this.updateUser(this.userForm.value);
        console.log(this.userForm.value)
      } else {
        this.createUser(this.userForm.value);
      }
    } catch (error) {
      toast.error(`Error inesperado: ${Error || error}`);
    }
  }

  updateUser(userData: Partial<IUser>) {
    // Logic to update the user
    console.log('Updating user:', userData);
  }

  
    createUser(userData: Partial<IUser>) {
      // Logic to create a new user
      console.log('Creating user:', userData);
    }
  
      //console.log(this.userForm.value);check
    //console.log(this.userForm.value);check

    // try {
    //   if (this.userForm.value._id) {
    //     this.userService.update(this.userForm.value);
    //     Swal.fire({
    //       title: "Usuario actualizado",
    //       text: `Has actualizado a ${this.theUser.first_name} ${this.theUser.username}`, 
    //       icon: "success",
    //       draggable: true
    //     });
    //     if ('request' in this.theUser) {
    //       toast.error((this.theUser as any).request);
    //     }
    //   } else {
    //     this.userService.insert(this.userForm.value);
    //   }
    // } catch (error) {
    //   toast.error(error as string);
    // }
  


  checkControl (controlName: string, errorName: string):boolean | undefined {
    return this.userForm.get(controlName)?.hasError(errorName) && this.userForm.get(controlName)?.touched;
  }

}
