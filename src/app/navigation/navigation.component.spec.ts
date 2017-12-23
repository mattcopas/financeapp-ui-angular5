import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { MatMenuModule, MatIconModule, MatToolbarModule } from '@angular/material';

import { FlashMessageService } from '../services/flash-message.service';
import { UserService } from '../services/user.service';
import { MockFlashMessageService } from '../mocks/MockFlashMessageService';
import { MockUserService } from '../mocks/MockUserService';
import { NavigationComponent } from './navigation.component';

describe('NavigationComponent', () => {
    let component: NavigationComponent;
    let fixture: ComponentFixture<NavigationComponent>;
    let injector: TestBed;
    let flashMessageService: FlashMessageService;
    let userService: UserService;
    let router: Router;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ NavigationComponent ],
            imports: [ MatMenuModule, MatIconModule, MatToolbarModule, RouterTestingModule ],
            providers: [
                { provide: UserService, useClass: MockUserService },
                { provide: FlashMessageService, useClass: MockFlashMessageService }
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {

        injector = getTestBed();
        flashMessageService = injector.get(FlashMessageService);
        userService = injector.get(UserService);
        router = injector.get(Router);

        fixture = TestBed.createComponent(NavigationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('The Log Out button', async () => {

        it('should call the user service to log a user out when the logout function is called', () => {
            spyOn(userService, 'processLogout');
            component.logout();
            fixture.detectChanges();
            expect(userService.processLogout).toHaveBeenCalledWith();
        });

        it('should call the flash message service when the logout button is clicked', () => {
            spyOn(flashMessageService, 'flashMessageGood');
            component.logout();
            fixture.detectChanges();
            expect(flashMessageService.flashMessageGood).toHaveBeenCalled();
        });

        it('should call the router navigation when the logout button is clicked', () => {
            spyOn(router, 'navigate').and.callThrough();
            component.logout();
            fixture.detectChanges();
            expect(router.navigate).toHaveBeenCalled();
        });

    });

});
