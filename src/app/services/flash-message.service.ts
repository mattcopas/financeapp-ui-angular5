import { Injectable } from '@angular/core';

import {FlashMessagesService } from 'angular2-flash-messages';

@Injectable()
export class FlashMessageService {

  constructor(private _flashMessageService: FlashMessagesService) { }

  flashMessageGood(message: string) {
      this._flashMessageService.show(message, { cssClass: 'flash-message-good', timeout: 2000 })
  };

}
