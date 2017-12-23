import { async, TestBed, inject, getTestBed } from '@angular/core/testing';
import { HttpHeaders, HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from '../../environments/environment';

import { UserService } from './user.service';
import { User } from '../models/User';

describe('UserService', () => {

    let injector: TestBed;
    let userService: UserService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [UserService],
            imports: [ HttpClientTestingModule ],
        });

        injector = getTestBed();
        userService = injector.get(UserService);
        httpMock = injector.get(HttpTestingController);

    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', inject([UserService], (service: UserService) => {
        expect(service).toBeTruthy();
    }));


    describe('Logging in', () => {

        it('should send a POST request to the API when logging in', async(() => {
            userService.login('test@test.com', 'password').subscribe((response) => {});

            const loginUrl: string = environment.apiUrl + 'oauth/token?grant_type=password&username=test@test.com&password=password';

            const request = httpMock.expectOne({
                url: loginUrl,
                method: 'POST',
            });

            request.flush({});
        }));

        it('should send a POST request with a basic authorization header to the API when logging in', async(() => {
            userService.login('test@test.com', 'password').subscribe((response) => {});

            const loginUrl: string = environment.apiUrl + 'oauth/token?grant_type=password&username=test@test.com&password=password';

            const request = httpMock.expectOne((request: HttpRequest<any>) => {

                return request.headers.get('Authorization') === environment.apiAuthorizationHeader;

            });

            request.flush({});
        }));

        it('should update sessionStorage with the logged in user when processing a successful login', () => {

            const email: string = 'test@test.com';
            const accessToken: string = 'token12345';

            userService.processSuccessfulLogin(email, accessToken);

            expect(sessionStorage.getItem('username')).toBe(email);
            expect(sessionStorage.getItem('access_token')).toBe(accessToken);
            expect(sessionStorage.getItem('isLoggedIn')).toBe(true.toString());
        });

    });

    describe('Logging out', () => {

        it('should clear user data from sessionStorage when processing logging out', () => {
            userService.processLogout();
            expect(sessionStorage.getItem('username')).toBeNull();
            expect(sessionStorage.getItem('access_token')).toBeNull();
            expect(sessionStorage.getItem('isLoggedIn')).toBeNull();
        })
    });

});
