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
  arrResponse: IResponse = {
    page: 0,
    per_page: 0,
    total: 0,
    total_pages: 0,
    results: [],
  };
  userService = inject(UserService);
  isLoading: boolean = false;

  async ngOnInit(){

   this.loadUsers()
   
  }

  async loadUsers (){
    this.isLoading = true;
    try{ let response:IResponse = await this.userService.getAllPromise()
      this.arrUsers = response.results
      this.arrResponse = response
    } catch (error){
      console.error(error)
    }finally{
      this.isLoading = false;
    }
    
  }

  // goToNextPage() {
  //   if (this.arrResponse.page < this.arrResponse.total_pages) {
  //     this.arrResponse.page + 1;
  //   }
  // }

  // goToPreviousPage() {
  //   if (this.arrResponse.page > 1) {
  //     this.arrResponse.page - 1;
  //   }
  // }

}
