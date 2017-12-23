import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Account } from '../models/Account';
import { environment } from '../../environments/environment';

@Injectable()
export class AccountsService {

    constructor(private httpClient: HttpClient) { }

    getRawAccountsData(): Observable<any> {
        let headers: HttpHeaders = new HttpHeaders({
            Authorization: 'Bearer ' + sessionStorage.getItem('access_token')
        });
        return this.httpClient.get<any>(environment.apiUrl + 'accounts', {headers});
    };

    parseAccountsData(rawAccountsData): Account[] {
        let accounts: Account[] = [];
        rawAccountsData.forEach(rawAccount => {
            let account: Account = {
                name: rawAccount.name,
                type: rawAccount.type,
                balance: rawAccount.balance,
                currency: rawAccount.currency,
                repeating: false
            }
            accounts.push(account);
        });
        return accounts;
    };

}
