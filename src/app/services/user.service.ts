import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';

import { User } from '../models/User';

@Injectable()
export class UserService {

    constructor(private httpClient: HttpClient) { }

    login(username, password): Observable<any> {

        const headers: HttpHeaders = new HttpHeaders({
            Authorization: environment.apiAuthorizationHeader
        });

        const loginUrl: string = environment.apiUrl + 'oauth/token?grant_type=password&username=' + username + '&password=' + password;

        return this.httpClient.post(loginUrl, null, {headers});
    }

    processSuccessfulLogin(username, accessToken) {
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('access_token', accessToken);
        sessionStorage.setItem('isLoggedIn', 'true');
    }

    checkUserIsAuthenticated(): boolean {
        return sessionStorage.getItem('username') !== undefined &&
            sessionStorage.getItem('access_token') !== undefined &&
            sessionStorage.getItem('isLoggedIn') === 'true';
    }

    processLogout(): void {
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('access_token');
        sessionStorage.removeItem('isLoggedIn');
    }

}
