import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FirestoreService } from 'src/app/shared/database/firestore.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  noticias: Observable<any> = new Observable<any>();

  constructor(private firestoreService: FirestoreService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.noticias = this.firestoreService.getNoticias();
    console.log(this.noticias);
  }

  deleta(id: string) {
    this.firestoreService.deleteNoticia(id);
    this.noticiaDeletada();
  }

  noticiaDeletada() {
    this.toastr.error('Notícia deletada com sucesso!', 'Removido!');
  }

}
