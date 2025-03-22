import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IResponse } from '../interfaces/iresponse.interface';
import { lastValueFrom } from 'rxjs';
import { IUser } from '../interfaces/iuser.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject (HttpClient);
  private baseUrl = 'https://peticiones.online/api/users'


  getAllPromise(url: string): Promise<IResponse> {
    url = (url === "") ? "https://peticiones.online/api/users?page=1&limit=8" : url;
    return lastValueFrom(this.http.get<IResponse>(url));
  }

  getById(_id: string) : Promise<IUser> {
    return lastValueFrom(this.http.get<IUser>(`${this.baseUrl}/${_id}`));	 ;
  }

  delete(_id: string) : Promise<IUser> {
    return lastValueFrom(this.http.delete<IUser>(`${this.baseUrl}/${_id}`));
  }

  update(user : IUser) : Promise<IUser> {
    return lastValueFrom(this.http.put<IUser>(`${this.baseUrl}/${user._id}`, user));
  }

  insert (user : IUser) : Promise<IUser> {
    return lastValueFrom(this.http.post<IUser>(this.baseUrl, user));
  }

  
}
