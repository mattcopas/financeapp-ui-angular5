import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatButtonModule } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { LoginComponent } from './login.component';
import { UserService } from '../services/user.service';
import { FlashMessageService } from '../services/flash-message.service';
import { MockFlashMessageService } from '../mocks/MockFlashMessageService';
import { MockUserService } from '../mocks/MockUserService';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let injector: TestBed;
    let flashMessageService: FlashMessageService;
    let userService: UserService;
    let router: Router;
    let userServiceLoginSpy;

    const accessToken = 'token12345';
    const email = 'test@test.com';
    const password = 'password';

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ LoginComponent ],
            imports: [
                BrowserAnimationsModule,
                FormsModule,
                MatButtonModule,
                MatInputModule,
                ReactiveFormsModule,
                RouterTestingModule
            ],
            providers: [
                { provide: FlashMessageService, useClass: MockFlashMessageService },
                { provide: UserService, useClass: MockUserService }
            ]

        })
        .compileComponents();
    }));

    beforeEach(() => {

        injector = getTestBed();
        flashMessageService = injector.get(FlashMessageService);
        userService = injector.get(UserService);
        router = injector.get(Router);

        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call UserService login(email, password) to log a user in', () => {
        spyOn(userService, 'login').and.returnValue(Observable.of());
        component.email = this.email;
        component.password = this.password;
        component.login(new Event(""));
        fixture.detectChanges();
        expect(userService.login).toHaveBeenCalledWith(this.email, this.password);
    });

    it('should call UserService processSuccessfulLogin(username, accessToken) to log a user in', () => {
        const loginSpy = spyOn(userService, 'login').and.returnValue(Observable.of({access_token: accessToken}));
        spyOn(userService, 'processSuccessfulLogin').and.callThrough();
        component.email = this.email;
        component.login(new Event(""));
        fixture.detectChanges();
        loginSpy.calls.mostRecent().returnValue.subscribe((response) => {
            expect(userService.processSuccessfulLogin).toHaveBeenCalledWith(this.email, accessToken);
        })
    });

    it('should call FlashMessageService flashMessageGood() after successfully logging a user in', () => {
        const loginSpy = spyOn(userService, 'login').and.returnValue(Observable.of({access_token: accessToken}));
        spyOn(flashMessageService, 'flashMessageGood').and.callThrough();
        component.email = this.email;
        component.login(new Event(""));
        fixture.detectChanges();
        loginSpy.calls.mostRecent().returnValue.subscribe((response) => {
            expect(flashMessageService.flashMessageGood).toHaveBeenCalled();
        })
    });

    it('should call Router navigate after successfully logging a user in', () => {
        const loginSpy = spyOn(userService, 'login').and.returnValue(Observable.of({access_token: accessToken}));
        spyOn(router, 'navigate').and.callThrough();
        component.email = this.email;
        component.login(new Event(""));
        fixture.detectChanges();
        loginSpy.calls.mostRecent().returnValue.subscribe((response) => {
            expect(router.navigate).toHaveBeenCalled();
        })
    });
});
