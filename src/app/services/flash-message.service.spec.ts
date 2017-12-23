import { TestBed, inject } from '@angular/core/testing';

import {FlashMessagesService } from 'angular2-flash-messages';

import { FlashMessageService } from './flash-message.service';
import { MockFlashMessagesService } from '../mocks/MockFlashMessagesService';

describe('FlashMessageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
          FlashMessageService,
          { provide: FlashMessagesService, useClass: MockFlashMessagesService }
      ]
    });
  });

  it('should be created', inject([FlashMessageService], (service: FlashMessageService) => {
    expect(service).toBeTruthy();
  }));

  it('should call the external FlashMessagesService.show when flashMessageGood is called', () => {
      // TODO;
  });
});
