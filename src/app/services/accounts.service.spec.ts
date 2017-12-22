import { async, TestBed, inject, getTestBed } from '@angular/core/testing';
import { HttpClientModule, HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AccountsService } from './accounts.service';
import { Account } from '../models/Account';

describe('AccountsService', () => {

    let injector: TestBed;
    let accountsService: AccountsService;
    let httpMock: HttpTestingController;
    let rawAccountsData;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            providers: [AccountsService]
        });

        injector = getTestBed();
        accountsService = injector.get(AccountsService);
        httpMock = injector.get(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    })

    it('should be created', inject([AccountsService], (service: AccountsService) => {
        expect(service).toBeTruthy();
    }));

    describe('Getting raw accounts data', () => {
        it('should send a GET request to get raw accounts data', async(() => {

            accountsService.getRawAccountsData().subscribe((response) => {});

            const request = httpMock.expectOne({
                url: "http://localhost:8081/accounts",
                method: 'GET'
            });

            request.flush({});
        }));

        it('should send a GET request with an Authorization header to get raw accounts data', async(() => {

            accountsService.getRawAccountsData().subscribe((response) => {});

            const request = httpMock.expectOne((request: HttpRequest<any>) => {
                let checkMethod: boolean = request.method === 'GET';
                let checkAuthorizationHeader: boolean = request.headers.has('Authorization');

                return checkMethod && checkAuthorizationHeader;
            });

            request.flush({});
        }));

    });

    describe('Parsing raw accounts data', () => {
        beforeEach(() => {
            rawAccountsData = [{
                id: 1,
                name: "Test Account 1",
                balance: 200.00,
                currency: 'GBP',
                type: 'Saving',
                createdAt: "21/12/2017",
                updatedAt: null
            }];
        });

        it('should parse raw accounts data to be an array of Accounts', () => {
            let parsedAccounts: Account[] = accountsService.parseAccountsData(rawAccountsData);
            expect(parsedAccounts.length).toBe(1);
        });

        it('should parse raw accounts to have Account properties', () => {
            let parsedAccounts: Account[] = accountsService.parseAccountsData(rawAccountsData);
            expect(parsedAccounts[0].name).toBe('Test Account 1');
            expect(parsedAccounts[0].type).toBe('Saving');
            expect(parsedAccounts[0].currency).toBe('GBP');
            expect(parsedAccounts[0].balance).toBe(200.00);
        });
    });
});
