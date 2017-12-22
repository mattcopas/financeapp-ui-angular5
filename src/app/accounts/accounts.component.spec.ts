import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { AccountsComponent } from './accounts.component';
import { AccountsService } from '../services/accounts.service';
import { MockAccountsService } from '../mocks/MockAccountsService';

describe('AccountsComponent', () => {
    let component: AccountsComponent;
    let fixture: ComponentFixture<AccountsComponent>;
    let accountsService: AccountsService;
    let injector: TestBed;
    let getRawAccountsDataSpy;

    beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ AccountsComponent ],
      imports: [ MatTableModule ],
      providers: [{provide: AccountsService, useClass: MockAccountsService}]
      // providers: [AccountsService]
    })
    .compileComponents();
  }));

    beforeEach(() => {
        injector = getTestBed();

        accountsService = injector.get(AccountsService);
        getRawAccountsDataSpy = spyOn(accountsService, "getRawAccountsData").and.returnValue(Observable.of({
            _embedded: {
                accounts: []
            }
        }));
        spyOn(accountsService, 'parseAccountsData').and.callThrough();

        fixture = TestBed.createComponent(AccountsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call the AccountsService to get accounts data', async(() => {
        expect(accountsService.getRawAccountsData).toHaveBeenCalledWith();
    }));

    it('should call the AccountsService to parse accounts data', async(() => {

        getRawAccountsDataSpy.calls.mostRecent().returnValue.subscribe(() => {
            expect(accountsService.parseAccountsData).toHaveBeenCalledWith([]);
        });
    }));
});
