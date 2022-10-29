import { NgModule } from '@angular/core';
import { QuillModule } from 'ngx-quill';

import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NoticiaComponent } from './noticia/noticia.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NoticiaEditComponent } from './noticia-edit/noticia-edit.component';



@NgModule({
  declarations: [
    LoginComponent,
    DashboardComponent,
    NoticiaComponent,
    NoticiaEditComponent
  ],
  imports: [
    SharedModule,
    QuillModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class AdminModule { }
