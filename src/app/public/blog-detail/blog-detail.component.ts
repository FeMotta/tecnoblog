import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from 'src/app/shared/database/firestore.service';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {

  newNoticia = {
    id: <any>null,
    autor: '',
    corpo: '',
    data: '',
    imagem: '',
    titulo: '',
    descricao: '',
  }

  comentario = {
    autor: '',
    corpo: '',
    foto: '',
    data: '',
    uid: ''
  }

  curtida = {
    uid: ''
  }

  mobileNav = false;
  numeroComentarios: number = 0;
  numeroCurtidas: any;
  show = false;
  showExcluirComentario = false;
  botaoCurtida: any;
  newComentario: Observable<any> = new Observable<any>();
  comentarioLabel: string = 'Comentários';
  noticias: Observable<any> = new Observable<any>();

  constructor(private firestoreService: FirestoreService, private route: ActivatedRoute, private auth: AuthService, private toastr: ToastrService, router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.getNoticia(id);
    this.noticias = this.firestoreService.getNoticiasLimit(4)
    this.getComentario(id);
    this.isLogged();
    this.verificarExcluirComentario();
    this.verificarCurtida(id);
    this.numeroCurtidas = this.firestoreService.getCurtidas(id).subscribe(data => {
      this.numeroCurtidas = data.length;
    });
    this.auth.isLogged().subscribe(data => {
      if (data) {
        this.comentario.autor = data.displayName || '';
        this.comentario.foto = data.photoURL || '';
      }
    })
  }

  toggleNavbar(): void {
    this.mobileNav = !this.mobileNav;
  }

  getNoticia(id: any) {
    this.firestoreService.getNoticia(id).subscribe(data => {
      console.log(data);
      this.newNoticia = data;
      this.newNoticia.id = id;
    });
  }

  getComentario(id: any) {
    this.newComentario = this.firestoreService.getComentarios(id);
    this.newComentario.subscribe(data => {
      this.numeroComentarios = data.length;
      if (this.numeroComentarios == 1) {
        this.comentarioLabel = 'Comentário';
      } else {
        this.comentarioLabel = 'Comentários';
      }
    });
  }

  addComentario(id: any) {
    this.comentario.data = new Date().toLocaleString();
    this.auth.isLogged().subscribe(data => {
      if (data) {
        this.comentario.uid = data.uid;
        this.firestoreService.addComentario( id, this.comentario).then(() => {
          this.toastr.success('Comentário adicionado com sucesso!');
          this.comentario.corpo = '';
        });
      }
    })
  }

  removerComentario( idComentario: any) {
    const id = this.route.snapshot.paramMap.get('id');
    this.firestoreService.deleteComentario(id, idComentario);
  }

  loginGoogle() {
    this.auth.loginWithGoogle();
  }

  loginGithub() {
    this.auth.loginWithGithub();
  }

  isLogged() {
    this.auth.isLogged().subscribe(data => {
      if (data) {
        this.show = true;
      }
    })
  }

  curtir(id: any) {
    this.auth.isLogged().subscribe(data => {
      if (data) {
        const uid = data.uid;
        this.firestoreService.addCurtida(id, uid).then(() => {
          this.botaoCurtida = false;
        });
      }
    })
  }

  descurtir(id: any) {
    this.auth.isLogged().subscribe(data => {
      if (data) {
        const uid = data.uid;
        this.firestoreService.deleteCurtida(id, uid).then(() => {
          this.botaoCurtida = true;
        });
      }
    })
  }

  verificarExcluirComentario() {
    this.auth.isLogged().subscribe(data => {
      if (data) {
        if (data.email == 'fernandosantosmotta@gmail.com') {
          this.showExcluirComentario = true;
        } else {
          this.showExcluirComentario = false;
        }
      }
    })
  }

  verificarCurtida(id: any) {
    this.auth.isLogged().subscribe(data => {
      if (data) {
        const uid = data.uid;
        this.firestoreService.getUserCurtida(id, uid).subscribe(data => {
          if (data.length > 0) {
            return this.botaoCurtida = false;
          } else {
            return this.botaoCurtida = true;
          }
        });
      }
    })
  }

  pegaCurtidas(id: any) {
    this.firestoreService.getCurtidas(id).subscribe(data => {
      this.numeroCurtidas = data.length;
    });
  }

  refresh(): void {
    setTimeout(() => {
      this.spinner.show();
      console.log('reload 1');
      const id = this.route.snapshot.paramMap.get('id');
      this.getNoticia(id);
      this.getComentario(id);
      this.isLogged();
      this.verificarExcluirComentario();
      this.verificarCurtida(id);
      this.pegaCurtidas(id);
      setTimeout(() => {
        console.log('reload 2');
        this.spinner.hide();
      }, 500);
    }, 500);
  }

}
