import { Injectable } from '@angular/core';
import { QrLog } from '../models/qr-log.model';
import {
  InAppBrowser,
  DefaultSystemBrowserOptions,
} from '@capacitor/inappbrowser';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class OpenScanFormat {
  constructor(private router: Router) {}

  async openScan(qrLog: QrLog) {
    this.router.navigate(['/tabs/tab2']);

    switch (qrLog.valueType) {
      case 'http':
        await InAppBrowser.openInSystemBrowser({
          url: qrLog.rawValue,
          options: DefaultSystemBrowserOptions,
        });
        break;
      default:
        break;
    }
  }
}
