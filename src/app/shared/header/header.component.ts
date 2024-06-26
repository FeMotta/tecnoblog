import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  windowLocation = window.location.pathname;
  logado = false
  @Input() toggleNav = false;

  @Output() navBarClicked: EventEmitter<any> = new EventEmitter<any>();

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isLogged();
  }

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

  toggleNavbar(): void {
    this.toggleNav = !this.toggleNav;
    this.navBarClicked.emit(this.toggleNav);
  }

}
