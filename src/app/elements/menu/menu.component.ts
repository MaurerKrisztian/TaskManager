import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {TaskMangerClientApi} from "../../../services/task-manager-client/task-manger-client.api";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  // @ts-ignore
  @ViewChild('toggleMenu') toggleMenu: ElementRef;
  constructor(readonly auth: AuthService, private readonly router: Router) { }

  ngOnInit(): void {

  }

  toggle(){
    this.toggleMenu.nativeElement.click()
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');

    this.router.navigate(['/login'])
  }

}
