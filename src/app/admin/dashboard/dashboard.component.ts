import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FirestoreService } from 'src/app/shared/database/firestore.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  noticias: Observable<any> = new Observable<any>();

  constructor(private firestoreService: FirestoreService) { }

  ngOnInit(): void {
    this.noticias = this.firestoreService.getNoticias();
    console.log(this.noticias);
  }

  deleta(id: string) {
    this.firestoreService.deleteNoticia(id);
  }

}
