import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  windowLocation = window.location.pathname;
  logado = false

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isLogged();
  }

  // verifica se o usuario esta logado
  isLogged() {
    this.authService.isLogged().subscribe(data => {
      if (data) {
        this.logado = true;
      } else {
        this.logado = false;
      }
    });
  }

  deslogar() {
    this.authService.logout();
  }

}
