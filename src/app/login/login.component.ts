import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../services/user.service';
import { FlashMessageService } from '../services/flash-message.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

    // TODO For validation see https://material.angular.io/components/input/examples

    email: string;
    password: string;

    emailFormControl: FormControl = new FormControl('', [
        Validators.required,
        Validators.email
    ])

    constructor(
        private userService: UserService,
        private flashMessageService: FlashMessageService,
        private router: Router
    ) { }

    ngOnInit() {
    }

    login(event: Event): void {
        this.userService.login(this.email, this.password).subscribe((response) => {
            this.userService.processSuccessfulLogin(this.email, response.access_token);
            this.flashMessageService.flashMessageGood("You have been logged in as " + this.email);
            this.router.navigate(['accounts']).then(() => {}, () => {console.error("Error redirecting after login")});
        }, (error) => {
            console.log(error);
        });
    };

}
