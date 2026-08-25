import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonLabel,
  IonList,
  IonItem,
  IonItemOptions,
  IonItemOption,
  IonItemSliding,
  IonIcon,
  IonButtons,
  IonButton,
  IonText,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  arrowRedoOutline,
  globeOutline,
  trashOutline,
  globe,
  pin,
  call,
  barcode,
} from 'ionicons/icons';
import { StoreScans } from 'src/app/services/store-scans';
import { DatePipe } from '@angular/common';
import { OpenScanFormat } from 'src/app/services/open-scan-format';

@Component({
  standalone: true,
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [
    IonText,
    IonButtons,
    IonButton,
    IonIcon,
    IonItemSliding,
    IonItemOption,
    IonItemOptions,
    IonItem,
    IonList,
    IonLabel,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    DatePipe,
  ],
})
export class Tab2Page {
  constructor(
    public storeScans: StoreScans,
    private openScanFormat: OpenScanFormat,
  ) {
    addIcons({
      arrowRedoOutline,
      trashOutline,
      globeOutline,
      globe,
      pin,
      call,
      barcode,
    });
  }

  onShare() {}

  onClearScan() {
    this.storeScans.clearScans();
  }

  onOpenScanHistory(scan: any) {
    this.openScanFormat.openScan(scan);
    console.info('scan', scan);
  }
}
