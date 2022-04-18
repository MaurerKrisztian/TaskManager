import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  // @ts-ignore
  @ViewChild('toggleMenu') toggleMenu: ElementRef;
  constructor(readonly auth: AuthService, private readonly router: Router) {}

  // todo refactor
  ngOnInit(): void {
    // @ts-ignore
    const arrow = document.querySelectorAll('.arrow');
    for (let i = 0; i < arrow.length; i++) {
      arrow[i].addEventListener('click', (e) => {
        // @ts-ignore
        const arrowParent = e.target.parentElement.parentElement; //selecting main parent of arrow
        // @ts-ignore
        arrowParent.classList.toggle('showMenu');
      });
    }
    // @ts-ignore
    const sidebar = document.querySelector('.sidebar');
    // @ts-ignore
    const sidebarBtn = document.querySelector('.bx-menu');
    console.log(sidebarBtn);
    // @ts-ignore
    sidebarBtn.addEventListener('click', () => {
      // @ts-ignore
      sidebar.classList.toggle('close');
    });
  }

  toggle() {
    this.toggleMenu.nativeElement.click();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');

    this.router.navigate(['/login']);
  }
}
