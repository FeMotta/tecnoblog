import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { FirestoreService } from '../database/firestore.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth, private router: Router, private firestoreService: FirestoreService) { }

  loginEmail(email: string, password: string) {
    this.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log(user)
        this.router.navigate(['/admin/dashboard'])
      })
      .catch((error) => {
        console.log(error)
      })
  }

  loginWithGoogle() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((user) => {
        this.firestoreService.getUser(user.user?.uid).subscribe(data => {
          if (data.length == 0) {
            this.firestoreService.addUser(user.user?.uid, user.user?.email, user.user?.displayName, user.user?.photoURL).then(() => {
              console.log('User added')
            }).catch((error) => {
              console.log(error)
            })
          }
        })
      })
    }

  isLogged() {
    return this.auth.authState;
  }

  logout() {
    this.auth.signOut();
    this.router.navigate(['/'])
  }

}
