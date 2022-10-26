import { Component, OnInit } from '@angular/core';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill'
import { FirestoreService } from 'src/app/shared/database/firestore.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/shared/storage/storage.service';

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
    imagem: ''
  }

  constructor(private firestoreService: FirestoreService, private router: Router, private storageService: StorageService ) { }

  ngOnInit(): void {
    this.noticia.data = new Date().toLocaleDateString();
  }

  changeEditor(event: EditorChangeContent | EditorChangeSelection) {
    this.noticia.corpo = event['editor']['root']['innerHTML'];
  }

  onSubmit(event: any){
    const path = `noticias/${this.noticia.titulo}`;
    const ref = this.storageService.uploadImage(event.target.form[3].files[0], path);
    ref.then((uploadTask) => {
      uploadTask.ref.getDownloadURL().then((downloadURL) => {
        this.noticia.imagem = downloadURL;
        this.firestoreService.addNoticia(this.noticia).then(() => {
          this.router.navigate(['/admin/dashboard']);
        });
      });
    });
  }

}
