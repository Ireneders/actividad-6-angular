import { Routes } from '@angular/router';
import { UserFormComponent } from './pages/user-form/user-form.component';
import { HomeComponent } from './pages/home/home.component';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { UserUpdateComponent } from './pages/user-update/user-update.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'user/:idUser', component: UserDetailComponent},	
    {path: 'newuser', component: UserFormComponent},
    {path: 'updateuser/:idUser', component: UserUpdateComponent},
    {path: '**', redirectTo: 'home'}
];
