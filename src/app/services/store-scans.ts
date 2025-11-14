import { Injectable } from '@angular/core';
import { QrLog } from '../models/qr-log.model';

@Injectable({
  providedIn: 'root',
})
export class StoreScans {
  storedScans: QrLog[] = [];

  storeScanLog(format: string, text: string) {
    const newLog = new QrLog(format, text);

    // moving new scans at the array beginning
    this.storedScans.unshift(newLog);
    console.log(this.storedScans);
  }
}
