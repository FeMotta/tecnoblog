import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorChangeContent, EditorChangeSelection, QuillViewComponent } from 'ngx-quill';
import { FirestoreService } from 'src/app/shared/database/firestore.service';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from 'src/app/shared/storage/storage.service';

@Component({
  selector: 'app-noticia-edit',
  templateUrl: './noticia-edit.component.html',
  styleUrls: ['./noticia-edit.component.css']
})
export class NoticiaEditComponent implements OnInit {

  noticia = {
    autor: '',
    corpo: '',
    data: '',
    imagem: '',
    titulo: '',
    descricao: ''
  }


  constructor(private firestoreService: FirestoreService, private route: ActivatedRoute, private toastr: ToastrService, private storageService: StorageService, private router: Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.firestoreService.getNoticia(id).subscribe(data => {
      delete data.id;
      this.noticia = data;
      this.noticia.corpo = data.corpo
    });
  }

  imagemSelecionada(event: any) {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.noticia.imagem = event.target.result;
    }
    reader.readAsDataURL(event.target.files[0]);
  }

  changeEditor(event: EditorChangeContent | EditorChangeSelection) {
    if (event.editor.getLength() <= 1) {
      event['editor']['root']['innerHTML'] = this.noticia.corpo;
    }
    this.noticia.corpo = event['editor']['root']['innerHTML'];
  }


  onSubmit(event: any) {
    event.preventDefault();
    const id = this.route.snapshot.paramMap.get('id');
    const path = `noticias/${this.noticia.titulo}`;
    const ref = this.storageService.uploadImage(event.target.form[3].files[0], path);
    ref.then((uploadTask) => {
      uploadTask.ref.getDownloadURL().then((downloadURL) => {
        this.noticia.imagem = downloadURL;
        this.firestoreService.updateNoticia(id, this.noticia).then(() => {
          setTimeout(() => {
            this.router.navigate(['/admin/dashboard']);
          }, 2000);
        });
      });
    });
  }

  showSuccess() {
    this.toastr.success('Notícia atualizada com sucesso!', 'Sucesso!');
  }

}
