import { Component, OnInit } from '@angular/core';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill'
import { FirestoreService } from 'src/app/shared/database/firestore.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/shared/storage/storage.service';
import { ToastrService } from 'ngx-toastr';

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
    timestamp: new Date().getTime()
  }

  constructor(private firestoreService: FirestoreService, private router: Router, private storageService: StorageService, private toastr: ToastrService ) { }

  ngOnInit(): void {
    this.noticia.data = new Date().toLocaleDateString();
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

  onSubmit(event: any){
    event.preventDefault();
    const path = `noticias/${this.noticia.titulo}`;
    const ref = this.storageService.uploadImage(event.target.form[3].files[0], path);
    ref.then((uploadTask) => {
      uploadTask.ref.getDownloadURL().then((downloadURL) => {
        this.noticia.imagem = downloadURL;
        this.firestoreService.addNoticia(this.noticia).then(() => {
          this.noticiaCriada();
          setTimeout(() => {
            this.router.navigate(['/admin/dashboard']);
          }, 2000);
        });
      });
    });
  }

  noticiaCriada() {
    this.toastr.success('Notícia criada com sucesso!', 'Sucesso!');
  }

}
