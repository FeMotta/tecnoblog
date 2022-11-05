import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorChangeContent, EditorChangeSelection, QuillViewComponent } from 'ngx-quill';
import { FirestoreService } from 'src/app/shared/database/firestore.service';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from 'src/app/shared/storage/storage.service';
import { AuthService } from 'src/app/shared/auth/auth.service';

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

  @ViewChild('imageFile', { static: false }) imageFile: File | null = null;

  constructor(private firestoreService: FirestoreService, private route: ActivatedRoute, private toastr: ToastrService, private storageService: StorageService, private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.getNoticia(id);
    this.getImagem();
    this.checkUser();
  }

  getNoticia(id: any) {
    this.firestoreService.getNoticia(id).subscribe(data => {
      delete data.id;
      this.noticia = data;
      this.noticia.corpo = data.corpo;
    });
  }

  getImagem() {
    this.storageService.getImage('noticias/' + this.noticia.titulo).subscribe(data => {
      this.noticia.imagem = data;
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
    if (event.target.form[3].files[0] != null) {
      console.log('Bloco 1');
      const ref = this.storageService.uploadImage(event.target.form[3].files[0], path);
      this.storageService.deleteImage('noticias/' + this.noticia.titulo);
      ref.then(() => {
        this.storageService.updateImage(event.target.form[3].files[0], path).then(() => {
          this.firestoreService.updateNoticia(id, this.noticia).then(() => {
            this.toastrSuccess();
          }).catch(error => {
            this.toastrError(error);
          });
          this.router.navigate(['/admin/dashboard']);
        });
      });
    } else {
      this.firestoreService.updateNoticia(id, this.noticia).then(() => {
        console.log('Bloco 2');
        this.toastr.success('Notícia atualizada com sucesso!', 'Sucesso!');
        this.router.navigate(['/admin/dashboard']);
      }).catch(error => {
        this.toastrError(error);
      });
    }
  }

  toastrError(error: any) {
    this.toastr.error('Erro ao atualizar notícia!' + error, 'Erro!');
  }

  toastrSuccess() {
    this.toastr.success('Notícia atualizada com sucesso!', 'Sucesso!');
  }

  checkUser() {
    this.auth.isLogged().subscribe(user => {
      if (user) {
        user.email == 'fernandosantosmotta@gmail.com' || 'larabeca1215@gmail.com' ? true : this.router.navigate(['/'])
      }
    })
  }

}
