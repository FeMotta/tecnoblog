import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FirestoreService } from 'src/app/shared/database/firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  noticias: Observable<any> = new Observable<any>();

  constructor(private firestoreService: FirestoreService) { }

  ngOnInit(): void {
    this.noticias = this.firestoreService.getNoticiasLimit(3);
  }

}
