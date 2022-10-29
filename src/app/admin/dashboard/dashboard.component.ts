import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FirestoreService } from 'src/app/shared/database/firestore.service';

import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  noticias: Observable<any> = new Observable<any>();
  noticiasHoje: Observable<any> = new Observable<any>();

  constructor(private firestoreService: FirestoreService, private toastr: ToastrService, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.noticias = this.firestoreService.getNoticias();
    this.noticiasHoje = this.firestoreService.getNoticiasHoje();
    this.auth.isAdmin().subscribe
  }

  deleta(id: string) {
    this.firestoreService.deleteNoticia(id);
    this.noticiaDeletada();
  }

  noticiaDeletada() {
    this.toastr.error('Notícia deletada com sucesso!', 'Removido!');
  }

}
