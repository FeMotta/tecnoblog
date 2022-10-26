import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private db: AngularFirestore) {
  }

  addNoticia(noticia: any) {
    return this.db.collection('noticias').add(noticia);
  }

  deleteNoticia(id: string) {
    return this.db.collection('noticias').doc(id).delete();
  }

  getNoticias() {
    return this.db.collection('noticias').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getNoticiasLimit(limit: number) {
    return this.db.collection('noticias', ref => ref.orderBy('data', 'desc').limit(limit)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getNoticia(id: any) {
    return this.db.collection('noticias').doc(id).snapshotChanges().pipe(
      map(actions => {
        const data = actions.payload.data() as any;
        const id = actions.payload.id;
        return { id, ...data };
      })
    );
  }

}
