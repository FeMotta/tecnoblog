import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/shared/database/firestore.service';

@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.component.html',
  styleUrls: ['./sobre.component.css']
})
export class SobreComponent implements OnInit {

  mobileNav = false;

  constructor(private firestoreService: FirestoreService) { }

  ngOnInit(): void {

  }

  toggleNavbar(): void {
    this.mobileNav = !this.mobileNav;
  }

}
