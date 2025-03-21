import { Component, inject } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { UserService } from '../../services/user.service';
import { IResponse } from '../../interfaces/iresponse.interface';
import { UserCardComponent } from "../../components/user-card/user-card.component";
import { toast } from 'ngx-sonner';

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
  linkPrev : string = "";
  linkNext : string = "";

  async ngOnInit(){

   this.loadUsers()
   
  }

  async loadUsers (){
    this.isLoading = true;
    try{ let response:IResponse = await this.userService.getAllPromise()
      this.arrUsers = response.results
      this.arrResponse = response
      this.linkPrev = "https://peticiones.online/api/users?page=1&limit=8";
      this.linkNext = "https://peticiones.online/api/users?page=2&limit=8";
    } catch (error:any){
      toast.error(error.message)
    }finally{
      this.isLoading = false;
    }
    
  }


  async gotoPrev(){
    let response:IResponse = await this.userService.getAllPromise(this.linkPrev)
  }

  async gotoNext(){
    let response:IResponse = await this.userService.getAllPromise(this.linkNext)
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
