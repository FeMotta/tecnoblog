import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EditorChangeContent, EditorChangeSelection, QuillViewComponent } from 'ngx-quill';
import { FirestoreService } from 'src/app/shared/database/firestore.service';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private firestoreService: FirestoreService, private route: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.firestoreService.getNoticia(id).subscribe(data => {
      console.log(data);
      delete data.id;
      this.noticia = data;
    });
  }

  changeEditor(event: EditorChangeContent | EditorChangeSelection) {
    this.noticia.corpo = event['editor']['root']['innerHTML'];
  }

  updateNoticia() {
    const id = this.route.snapshot.paramMap.get('id');
    this.firestoreService.updateNoticia(id, this.noticia).then(() => {
      this.showSuccess();
    }).catch(error => {
      console.log(error);
    });
  }

  showSuccess() {
    this.toastr.success('Notícia atualizada com sucesso!', 'Sucesso!');
  }

}
