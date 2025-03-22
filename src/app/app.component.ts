import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'
import { UserFormComponent } from './pages/user-form/user-form.component';
import { HomeComponent } from './pages/home/home.component';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { HeaderComponent } from './shared/header/header.component';
import { toast, NgxSonnerToaster } from 'ngx-sonner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, NgxSonnerToaster],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'actividad-6';
}
