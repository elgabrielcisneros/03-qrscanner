import { Injectable } from '@angular/core';
import { QrLog } from '../models/qr-log.model';
import { Storage } from '@ionic/storage-angular';
@Injectable({
  providedIn: 'root',
})
export class StoreScans {
  // this is a public property
  storedScans: QrLog[] = [];
  // this is a private property
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
    this.getStoredScans();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }

  async getStoredScans() {
    const storedScans = await this.storage.get('scans');
    this.storedScans = storedScans || [];
  }

  async storeScanLog(format: string, rawValue: string) {
    const newLog = new QrLog(format, rawValue);

    // moving new scans at the array beginning
    this.storedScans.unshift(newLog);
    console.info('stored', this.storedScans);
    await this.storage.set('scans', this.storedScans);
  }
}
