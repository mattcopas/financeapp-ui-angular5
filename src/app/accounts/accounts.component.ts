import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

import { Account } from '../models/Account';
import { AccountsService } from '../services/accounts.service';

@Component({
    selector: 'app-accounts',
    templateUrl: './accounts.component.html',
    styleUrls: ['./accounts.component.less']
})
export class AccountsComponent implements OnInit {

    constructor(private accountsService: AccountsService) { }

    displayedColumns = ['name', 'type', 'balance', 'currency', 'repeating'];
    dataSource = new MatTableDataSource<Account>();

    ngOnInit() {
        this.getAccountsData();
    }

    private getAccountsData(): void {
        this.accountsService.getRawAccountsData()
            .subscribe(response => {
                let accounts = this.accountsService.parseAccountsData(response._embedded.accounts);
                this.dataSource = new MatTableDataSource<Account>(accounts);
            });
    }

}
