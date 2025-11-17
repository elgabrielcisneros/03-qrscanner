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
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  arrowRedoOutline,
  globeOutline,
  trashOutline,
  globe,
  pin,
  call,
  create,
} from 'ionicons/icons';
import { StoreScans } from 'src/app/services/store-scans';
import { DatePipe } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [
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
  constructor(public storeScans: StoreScans) {
    addIcons({
      arrowRedoOutline,
      trashOutline,
      globeOutline,
      globe,
      pin,
      call,
      create,
    });
  }

  onShare() {}

  onClearScan() {}

  onOpenScanHistory(scan: any) {
    console.info('scan', scan);
  }
}
