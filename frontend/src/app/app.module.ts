import { NgModule } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoute } from './app-routes.module';
import { FormsModule } from '@angular/forms';
import { UserReadComponent } from './user/user-read/user-read.component';
import { NavComponent } from './nav/nav.component';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { UserUpdateComponent } from './user/user-update/user-update.component';
import { UserDeleteComponent } from './user/user-delete/user-delete.component';
import { PdfPreviewComponent } from './pdf-preview/pdf-preview.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserReadComponent,
    NavComponent,
    UserCreateComponent,
    UserUpdateComponent,
    UserDeleteComponent,
    PdfPreviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoute,
    FormsModule,
    MatTableModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
