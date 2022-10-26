import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { FirestoreService } from 'src/app/shared/database/firestore.service';

@Component({
  selector: 'app-noticia-edit',
  templateUrl: './noticia-edit.component.html',
  styleUrls: ['./noticia-edit.component.css']
})
export class NoticiaEditComponent implements OnInit {

  noticia: Observable<any> = new Observable<any>();
  newNoticia = {
    autor: '',
    corpo: '',
    data: '',
    imagem: '',
    titulo: '',
    descricao: ''
  }

  constructor(private firestoreService: FirestoreService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.firestoreService.getNoticia(id).subscribe(data => {
      console.log(data);
      this.newNoticia = data;
    });
  }

}
