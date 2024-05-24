import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BaseComponent } from '@app/base/base.component';
import { UserService } from '@app/services/user.service';
import {MatMenuTrigger} from '@angular/material/menu';
import { ConfigService } from '@app/services/config.service';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent extends BaseComponent implements OnInit {
  
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;
  isLogged: boolean;

  constructor(
    protected router: Router,
    private authService: AuthService,
    public dialog: MatDialog, ) {
    super(router);
  }
  ngOnInit() {
    this.config =  ConfigService.config;
  }

  openDialog() {
    // #docregion focus-restoration
    const dialogRef = this.dialog.open(DialogFromMenuExampleDialog, {restoreFocus: false});

    // Manually restore focus to the menu trigger since the element that
    // opens the dialog won't be in the DOM any more when the dialog closes.
    dialogRef.afterClosed().subscribe(() => this.menuTrigger.focus());
    // #enddocregion focus-restoration
  }
  isLoggedIn(): void {
    this.isLogged = this.authService.isLoggedIn();
  }
  public logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}


@Component({
  selector: 'dialog-from-menu-dialog',
  templateUrl: 'dialog-from-menu-example-dialog.html',
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
})
export class DialogFromMenuExampleDialog {}

