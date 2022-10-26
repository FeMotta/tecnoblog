import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = '';
  senha: string = '';

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  login() {
    this.auth.loginEmail(this.email, this.senha)
  }

}
