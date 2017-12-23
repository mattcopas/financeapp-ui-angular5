import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { FlashMessageService } from '../services/flash-message.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.less']
})
export class NavigationComponent implements OnInit {

  constructor(
      public userService: UserService,
      private flashMessageService: FlashMessageService,
      private router: Router
  ) { }

  ngOnInit() {
  }

  logout(): void {
      this.userService.processLogout();
      this.flashMessageService.flashMessageGood('You have been logged out');
      this.router.navigate(['login']).then(() => {}, () => {console.error("Logout redirect failed")});
  }

}
