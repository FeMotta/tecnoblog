import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { HeaderComponent } from './header/header.component';
import { AdmMenuComponent } from './adm-menu/adm-menu.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    HeaderComponent,
    AdmMenuComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    HeaderComponent,
    AdmMenuComponent,
    FooterComponent,
    FormsModule,
    BrowserModule,
    CommonModule,
  ]
})
export class SharedModule { }
