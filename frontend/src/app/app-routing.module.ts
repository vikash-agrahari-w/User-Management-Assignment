import { UserDeleteComponent } from './components/user/user-delete/user-delete.component';
import { UserUpdateComponent } from './components/user/user-update/user-update.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./views/home/home.component";
import { UserCrudComponent } from "./views/user-crud/user-crud.component";
import { UserCreateComponent } from './components/user/user-create/user-create.component';
import { PdfGenerateComponent } from './components/pdf/pdf-generate/pdf-generate.component';
import { PdfPreviewComponent } from './components/pdf/pdf-preview/pdf-preview.component';
import { PdfDownLoadomponent } from './components/pdf/pdf-download/pdf-download.component';


const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "users",
    component: UserCrudComponent
  },
  {
    path: "users/create",
    component: UserCreateComponent
  },
  {
    path: "users/update/:id",
    component: UserUpdateComponent
  },
  {
    path: "users/delete/:id",
    component: UserDeleteComponent
  },
  {
    path: "users/generate-pdf",
    component: PdfGenerateComponent
  },
  {
    path: "users/preview-pdf",
    component: PdfPreviewComponent
  },
  {
    path: "users/download-pdf",
    component: PdfDownLoadomponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
