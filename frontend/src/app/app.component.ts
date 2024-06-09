import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { UserReadComponent } from './user/user-read/user-read.component';
import { HeaderComponent } from './header/header.component';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { UserUpdateComponent } from './user/user-update/user-update.component';
import { UserDeleteComponent } from './user/user-delete/user-delete.component';
import { PdfPreviewComponent } from './pdf-preview/pdf-preview.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavComponent,
    HeaderComponent,
    HomeComponent,
    UserReadComponent,
    UserCreateComponent,
    UserUpdateComponent,
    UserDeleteComponent,
    PdfPreviewComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
