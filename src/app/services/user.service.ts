import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IResponse } from '../interfaces/iresponse.interface';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject (HttpClient);
  private baseUrl = 'https://peticiones.online/api/users'


  getAllPromise() : Promise<IResponse> {
    return lastValueFrom(this.http.get<IResponse>(this.baseUrl)) ;
  }
}
