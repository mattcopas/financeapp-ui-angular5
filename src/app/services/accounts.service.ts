import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Account } from '../models/Account';

@Injectable()
export class AccountsService {

    constructor(private httpClient: HttpClient) { }

    getRawAccountsData(): Observable<any> {
        let token = 'b0a67e98-53fe-4338-9144-74bd9ac87661';
        let headers: HttpHeaders = new HttpHeaders({
            Authorization: 'Bearer ' + token
        });
        return this.httpClient.get<any>('http://localhost:8081/accounts', {headers: headers});
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
