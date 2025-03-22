import { Component, inject, input, Input } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { UserService } from '../../services/user.service';
import { IResponse } from '../../interfaces/iresponse.interface';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { toast, NgxSonnerToaster } from 'ngx-sonner';
import { IError } from '../../interfaces/error.interface';


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

  async ngOnInit() {
    if (this.idUser) {
      try{
        this.theUser = await this.userService.getById(this.idUser);
        console.log(this.theUser);

      }catch(error){
        toast.error(Error);
      }
     
    }



    this.userForm = new FormGroup({
      _id: new FormControl(this.theUser._id || null, []),
      first_name: new FormControl(this.theUser.first_name || "", []),
      last_name: new FormControl(this.theUser.last_name || "", []),
      email: new FormControl(this.theUser.email || "", []),
      image: new FormControl(this.theUser.image || "", []),
    }, []);

  }

  getDataForm () {
    let response: IUser | any;

    try {
      if (this.userForm.value._id) {
        response = this.userService.update(this.userForm.value);
        if ('request' in this.theUser) {
          toast.error((this.theUser as any).request);
        }
      } else {
        response = this.userService.insert(this.userForm.value);
      }
    } catch (error) {
      toast.error(error as string);
    }
  }

}
