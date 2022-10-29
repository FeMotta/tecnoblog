import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { BlogComponent } from './blog/blog.component';
import { SobreComponent } from './sobre/sobre.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { RouterModule } from '@angular/router';
import { NgxSpinner, NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    HomeComponent,
    BlogComponent,
    SobreComponent,
    BlogDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgxSpinnerModule,
    RouterModule.forChild([
      { path: 'home', component: HomeComponent },
      { path: 'blog', component: BlogComponent },
      { path: 'blog/:id', component: BlogDetailComponent },
      { path: 'sobre', component: SobreComponent},
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'home', pathMatch: 'full' },
    ])
  ]
})
export class PublicModule { }
