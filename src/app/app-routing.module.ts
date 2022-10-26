import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';

import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { LoginComponent } from './admin/login/login.component';
import { NoticiaComponent } from './admin/noticia/noticia.component';
import { NoticiaEditComponent } from './admin/noticia-edit/noticia-edit.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['admin/login']);
const redirectLoggedInToDashboard = () => redirectLoggedInTo(['admin/dashboard']);

const routes: Routes = [
  { path: 'admin/login', component: LoginComponent, ...canActivate(redirectLoggedInToDashboard) },
  { path: 'admin/dashboard', component: DashboardComponent, ...canActivate(redirectUnauthorizedToLogin) },
  { path: 'admin/noticia', component: NoticiaComponent, ...canActivate(redirectUnauthorizedToLogin) },
  { path: 'admin/noticia/:id', component: NoticiaEditComponent, ...canActivate(redirectUnauthorizedToLogin) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
