import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { FirestoreService } from 'src/app/shared/database/firestore.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  noticias: Observable<any> = new Observable<any>();

  constructor(private firestoreService: FirestoreService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.noticias = this.firestoreService.getNoticias();
    this.noticias.subscribe(() => {
      this.spinner.hide();
    })
  }

}
