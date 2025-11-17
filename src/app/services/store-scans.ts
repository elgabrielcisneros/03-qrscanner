import { Injectable } from '@angular/core';
import { QrLog } from '../models/qr-log.model';

@Injectable({
  providedIn: 'root',
})
export class StoreScans {
  // this is a public property
  storedScans: QrLog[] = [];

  storeScanLog(format: string, text: string) {
    const newLog = new QrLog(format, text);

    // moving new scans at the array beginning
    this.storedScans.push(newLog);
    console.info('stored', this.storedScans);
  }
}
