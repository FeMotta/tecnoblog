import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FirestoreService } from 'src/app/shared/database/firestore.service';

import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/shared/storage/storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  noticias: Observable<any> = new Observable<any>();
  noticiasHoje: Observable<any> = new Observable<any>();

  constructor(private firestoreService: FirestoreService, private toastr: ToastrService, private auth: AuthService, private router: Router, private storageService: StorageService) { }

  ngOnInit(): void {
    this.checkUser()
    this.noticias = this.firestoreService.getNoticias();
    this.noticiasHoje = this.firestoreService.getNoticiasHoje();
    this.checkUser()
  }

  deleta(id: string) {
    if(confirm('Deseja realmente excluir?')) {
      this.firestoreService.getNoticia(id).subscribe(noticia => {
        if (noticia.titulo != undefined) {
          this.storageService.deleteImage(`noticias/${noticia.titulo}`)
          this.firestoreService.deleteNoticia(id).then(() => {
            this.toastr.success('Notícia deletada com sucesso!', 'Sucesso!');
          }).catch((error) => {
            this.toastr.error('Erro ao deletar notícia!', 'Erro!');
            console.error(error);
          })
        }
      })
    }



  }



  checkUser() {
    this.auth.isLogged().subscribe(user => {
      if (user) {
        user.email == 'fernandosantosmotta@gmail.com' || 'larabeca1215@gmail.com' ? this.router.navigate(['/admin/dashboard']) : this.router.navigate(['/'])
      }
    })
  }

}
