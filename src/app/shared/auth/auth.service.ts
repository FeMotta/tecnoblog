import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth, private router: Router) { }

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

}
