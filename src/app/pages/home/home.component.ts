import { Component, EventEmitter, inject, Output } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { UserService } from '../../services/user.service';
import { IResponse } from '../../interfaces/iresponse.interface';
import { toast } from 'ngx-sonner';
import { UserCardComponent } from '../../shared/user-card/user-card.component';

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
  @Output() deleteItemEmit: EventEmitter<Boolean> = new EventEmitter();

  ngOnInit(){
   this.loadUsers("")
  }

  async loadUsers (url:string = ""){
    this.isLoading = true;
    try{ 
      let response:IResponse = await this.userService.getAllPromise(url)
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
    this.loadUsers(this.linkPrev)
  }

  async gotoNext()
  {this.loadUsers(this.linkNext)
  }

  async deleteUser(event: any){
    if(event){
      this.loadUsers("")
    }
  }
}
