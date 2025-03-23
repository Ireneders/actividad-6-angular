import { Component, inject, input, Input } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { UserService } from '../../services/user.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { toast } from 'ngx-sonner';
import { IError } from '../../interfaces/error.interface';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  isLoading: boolean = false;
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
      } else {
        this.createUser(this.userForm.value);
      }
    } catch (error) {
      toast.error(`Error inesperado: ${Error || error}`);
    }
  }

  async updateUser(userFormValue: any) {
    try {
      const responseData = await this.userService.update(userFormValue); 
      if (this.isUser(responseData)) {
        Swal.fire({
          title: "Usuario actualizado",
          text: `Has actualizado a ${responseData.first_name} cuyo usuario es ${responseData.username}`,
          icon: "success",
          draggable: true
        });
      } else if (this.isError(responseData)) {
        toast.error(`Error: ${responseData}`);
      }
    } catch (error) {
      toast.error(`Error al actualizar el usuario: ${error}`);
    }
  }

  
  async createUser(userFormValue: any) {
    try {
      const responseData = await this.userService.insert(userFormValue); 
      if (this.isUser(responseData)) {
        Swal.fire({
          title: "Nuevo usuario creado",
          imageUrl: `${responseData.image}`,
          imageWidth: 100, 
          imageHeight: 100, 
          customClass: {
            image: 'rounded-circle' 
          },
          html: `Se ha ingresado correctamente un nuevo usuario.<br><br>
          <strong>Nombre:</strong> ${responseData.first_name}<br>
          <strong>Apellidos:</strong> ${responseData.last_name}<br>
          <strong>Email:</strong> ${responseData.email}`,
          icon: "success",
          draggable: true
        });
        this.cleanForm()
      } 
    } catch (error) {
      toast.error(`Error al crear el usuario: ${error}`);
    }

  }


  cleanForm() {
    this.userForm.reset();
  }

  // Funciones de tipo guardia
  private isUser(responseData: any): responseData is IUser {
    return responseData && responseData.first_name;
  }

  private isError(responseData: any): responseData is IError {
    return responseData && responseData.message;
  }

  

  checkControl (controlName: string, errorName: string):boolean | undefined {
    return this.userForm.get(controlName)?.hasError(errorName) && this.userForm.get(controlName)?.touched;
  }

}
