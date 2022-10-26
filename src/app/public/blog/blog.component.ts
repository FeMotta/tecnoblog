import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FirestoreService } from 'src/app/shared/database/firestore.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  noticias: Observable<any> = new Observable<any>();

  constructor(private firestoreService: FirestoreService) { }

  ngOnInit(): void {
    this.noticias = this.firestoreService.getNoticias();
  }

}
