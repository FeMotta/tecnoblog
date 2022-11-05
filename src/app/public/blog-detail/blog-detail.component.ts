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

  comentarios: Observable<any> = new Observable<any>();
  noticias: Observable<any> = new Observable<any>();

  mobileNav = false;
  numeroComentarios: number = 0;
  numeroCurtidas: any;
  show = false;
  showExcluirComentario = false;
  botaoCurtida: any;
  comentarioLabel: string = 'Comentários';

  constructor(private firestoreService: FirestoreService, private route: ActivatedRoute, private auth: AuthService, private toastr: ToastrService, router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.getNoticia(id);
    this.getInfoCommenter();
    this.getComentarios(id);
    this.isLogged();
    this.verificarExcluirComentario();
    this.verificarCurtida(id);
    this.getNumeroCurtidas(id);
    this.noticias = this.firestoreService.getNoticiasLimit(4)
  }

  getInfoCommenter() { // <--- Pega a foto e o nome do usuário que está logado
    this.auth.isLogged().subscribe(data => {
      if (data) {
        this.comentario.autor = data.displayName || '';
        this.comentario.foto = data.photoURL || '';
      }
    })
  }

  getNoticia(id: any) { // <--- Pega a notícia pelo id
    this.firestoreService.getNoticia(id).subscribe(data => {
      this.newNoticia = data;
      this.newNoticia.id = id;
    });
  }

  getComentarios(id: any) { // <--- Pega os comentários da notícia
    this.comentarios = this.firestoreService.getComentarios(id);
    this.comentarios.subscribe(data => {
      this.numeroComentarios = data.length;
      this.numeroComentarios == 1 ? this.comentarioLabel = 'Comentário' : this.comentarioLabel = 'Comentários';
    });
  }

  getNumeroCurtidas(id: any) {  // <--- Pega o número de curtidas da notícia
    this.firestoreService.getCurtidas(id).subscribe(data => {
      this.numeroCurtidas = data.length;
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

  toggleNavbar() {
    this.mobileNav = !this.mobileNav;
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

  loginTwiter() {
    this.auth.loginWithTwitter();
  }

  isLogged() {
    this.auth.isLogged().subscribe(data => {
      data ? this.show = true : this.show = false;
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
        data.email == 'fernandosantosmotta@gmail.com' ? this.showExcluirComentario = true : this.showExcluirComentario = false;
      }
    })
  }

  verificarCurtida(id: any) {
    this.auth.isLogged().subscribe(data => {
      if (data) {
        const uid = data.uid;
        this.firestoreService.getUserCurtida(id, uid).subscribe(data => {
          data.length > 0 ? this.botaoCurtida = false : this.botaoCurtida = true;
        });
      }
    })
  }


  refresh() {
    setTimeout(() => {
      this.spinner.show();
      const id = this.route.snapshot.paramMap.get('id');
      this.getNoticia(id);
      this.getComentarios(id);
      this.isLogged();
      this.verificarExcluirComentario();
      this.verificarCurtida(id);
      this.getNumeroCurtidas(id);
      setTimeout(() => {
        this.spinner.hide();
      }, 500);
    }, 500);
  }

}
