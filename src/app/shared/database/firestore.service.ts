import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private db: AngularFirestore) {
  }

  // <--- CRUD de Noticias --->

  addNoticia(noticia: any) {  // <--- Adiciona uma noticia
    return this.db.collection('noticias').add(noticia);
  }

  deleteNoticia(id: string) { // <--- Deleta uma noticia
    this.db.collection('noticias').doc(id).collection('comentarios').get().subscribe((querySnapshot) => {
      querySnapshot.docs.forEach((doc) => {
        doc.ref.delete();
      });
    });
    this.db.collection('noticias').doc(id).collection('curtidas').get().subscribe((querySnapshot) => {
      querySnapshot.docs.forEach((doc) => {
        doc.ref.delete();
      });
    });
    return this.db.collection('noticias').doc(id).delete();
  }

  getNoticias() { // <--- Retorna todas as noticias
    return this.db.collection('noticias', ref => ref.orderBy('timestamp', 'desc')).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getNoticiasLimit(limit: number) { // <--- Retorna um numero limitado de noticias
    return this.db.collection('noticias', ref => ref.orderBy('timestamp', 'desc').limit(limit)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getNoticiasHoje() { // <--- Retorna as noticias de hoje
    const hoje = new Date();
    const dataHoje = hoje.getDate() + '/' + (hoje.getMonth() + 1) + '/' + hoje.getFullYear();
    return this.db.collection('noticias', ref => ref.where('data', '==', dataHoje)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getNoticia(id: any) { // <--- Retorna uma noticia
    return this.db.collection('noticias').doc(id).snapshotChanges().pipe(
      map(actions => {
        const data = actions.payload.data() as any;
        const id = actions.payload.id;
        return { id, ...data };
      })
    );
  }

  updateNoticia(id: any, noticia: any) { // <--- Atualiza uma noticia
    return this.db.collection('noticias').doc(id).update(noticia);
  }

  // <--- CRUD de Comentarios --->

  addComentario(id: any, comentario: any) { // <--- Adiciona um comentario
    return this.db.collection('noticias').doc(id).collection('comentarios').add(comentario)
  }

  getComentarios(id: any) { // <--- Retorna todos os comentarios
    return this.db.collection('noticias').doc(id).collection('comentarios', ref => ref.orderBy('data', 'asc')).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }
      ))
    );
  }

  getComentarioUser(id: any, uid: any) {
    return this.db.collection('noticias').doc(id).collection('comentarios', ref => ref.where('uid', '==', uid)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }
      ))
    );
  }

  deleteComentario(id: any, idComentario: any) { // <--- Deleta um comentario
    return this.db.collection('noticias').doc(id).collection('comentarios').doc(idComentario).delete();
  }

  // <--- CRUD de Usuarios --->

  addUser(id: any, email: any, displayName: any, photoURL: any) { // <--- Adiciona um usuario
    return this.db.collection('users').doc(id).set({
      email: email,
      displayName: displayName,
      photoURL: photoURL
    });
  }

  getUser(id: any) {
    return this.db.collection('users', ref => ref.where('uid', '==', id)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }
      ))
    );
  }

  // <--- CRUD de Curtidas --->

  addCurtida(id: any, uid: any) {
    return this.db.collection('noticias').doc(id).collection('curtidas').doc(uid).set({
      uid: uid
    });
  }

  getCurtidas(id: any) {
    return this.db.collection('noticias').doc(id).collection('curtidas').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }
      ))
    );
  }

  getUserCurtida(id: any, uid: any) {
    return this.db.collection('noticias').doc(id).collection('curtidas', ref => ref.where('uid', '==', uid)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }
      ))
    );
  }

  deleteCurtida(id: any, uid: any) {
    return this.db.collection('noticias').doc(id).collection('curtidas').doc(uid).delete();
  }

}
