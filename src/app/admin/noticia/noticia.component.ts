import { Component, OnInit } from '@angular/core';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill'
import { FirestoreService } from 'src/app/shared/database/firestore.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/shared/storage/storage.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.css']
})
export class NoticiaComponent implements OnInit {

  noticia =  {
    titulo: '',
    data: '',
    autor: '',
    descricao: '',
    corpo: '',
    imagem: '',
    timestamp: ''
  }

  ableDelete = false;

  constructor(private firestoreService: FirestoreService, private router: Router, private storageService: StorageService, private toastr: ToastrService, private auth: AuthService ) { }

  ngOnInit(): void {
    this.noticia.data = new Date().toLocaleDateString();
    this.checkUser()
  }

  imagemSelecionada(event: any) {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.noticia.imagem = event.target.result;
    }
    reader.readAsDataURL(event.target.files[0]);
  }

  changeEditor(event: EditorChangeContent | EditorChangeSelection) {
    this.noticia.corpo = event['editor']['root']['innerHTML'];
  }

  onSubmit(event: any) {
    event.preventDefault();
    this.noticia.timestamp = new Date().getTime().toString();
    const path = `noticias/${this.noticia.titulo}`;
    const ref = this.storageService.uploadImage(event.target.form[3].files[0], path);
    ref.then((uploadTask) => {
      uploadTask.ref.getDownloadURL().then((downloadURL) => {
        this.noticia.imagem = downloadURL;
        this.firestoreService.addNoticia(this.noticia).then(() => {
          this.noticiaCriada();
          setTimeout(() => {
            this.router.navigate(['/admin/dashboard']);
          }, 500);
        });
      });
    });
  }

  noticiaCriada() {
    this.toastr.success('Notícia criada com sucesso!', 'Sucesso!');
  }

  checkUser() {
    this.auth.isLogged().subscribe(user => {
      if (user?.email == 'fernandosantosmotta@gmail.com' || 'larabeca1215@gmail.com') {
        this.ableDelete = true;
      } else {
        this.router.navigate(['/']);
      }
    })
  }

}
