import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { BlogComponent } from './blog/blog.component';
import { SobreComponent } from './sobre/sobre.component';



@NgModule({
  declarations: [
    HomeComponent,
    BlogComponent,
    SobreComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class PublicModule { }
