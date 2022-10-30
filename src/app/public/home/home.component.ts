import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { FirestoreService } from 'src/app/shared/database/firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  mobileNav = false;
  spinnerClose = false;
  noticias: Observable<any> = new Observable<any>();

  constructor(private firestoreService: FirestoreService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.getNoticias();
  }

  toggleNavbar(): void {
    this.mobileNav = !this.mobileNav;
  }

  getNoticias() {
    this.noticias = this.firestoreService.getNoticiasLimit(3);
    this.noticias.subscribe(() => {
      this.spinner.hide();
      this.spinnerClose = true;
    })
  }

}
