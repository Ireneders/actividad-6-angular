import { Component, inject } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { UserService } from '../../services/user.service';
import { IResponse } from '../../interfaces/iresponse.interface';
import { UserCardComponent } from "../../components/user-card/user-card.component";

@Component({
  selector: 'app-home',
  imports: [UserCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {

  arrUsers: IUser[]= []
  userService = inject(UserService);

  async ngOnInit(){

    try{ let response:IResponse = await this.userService.getAllPromise()
      this.arrUsers = response.results
      console.log('HomeComponent', this.arrUsers)
    } catch (error){
      console.error(error)
    }
   
  }
}
