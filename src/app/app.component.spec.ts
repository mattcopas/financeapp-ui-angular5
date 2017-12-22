import { TestBed, async } from '@angular/core/testing';
import { MatTableModule, MatMenuModule, MatIconModule, MatToolbarModule } from '@angular/material';

import { AppComponent } from './app.component';
import { AccountsComponent } from './accounts/accounts.component';
import { NavigationComponent } from './navigation/navigation.component';

import { AccountsService } from './services/accounts.service';
import { MockAccountsService } from './mocks/MockAccountsService';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        AccountsComponent,
        NavigationComponent
      ],
      imports: [MatTableModule, MatMenuModule, MatIconModule, MatToolbarModule],
      providers: [ {provide: AccountsService, useClass: MockAccountsService} ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  // it(`should have as title 'app'`, async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('app');
  // }));
  // it('should render title in a h1 tag', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
  // }));
});
