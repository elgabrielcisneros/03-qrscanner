import { Injectable } from '@angular/core';
import { QrLog } from '../models/qr-log.model';

@Injectable({
  providedIn: 'root',
})
export class StoreScans {
  // this is a public property
  storedScans: QrLog[] = [];

  storeScanLog(format: string, rawValue: string) {
    const newLog = new QrLog(format, rawValue);

    // moving new scans at the array beginning
    this.storedScans.unshift(newLog);
    console.info('stored', this.storedScans);
  }
}
