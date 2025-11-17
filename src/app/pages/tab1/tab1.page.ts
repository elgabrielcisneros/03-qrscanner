import { Component, OnInit } from '@angular/core';
import { IonContent, IonLabel, IonButton } from '@ionic/angular/standalone';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';

// Services
import { StoreScans } from 'src/app/services/store-scans';

@Component({
  standalone: true,
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonContent, IonLabel, IonButton],
})
export class Tab1Page implements OnInit {
  isSupported = false;
  barcodes: Barcode[] = [];

  constructor(
    private alertController: AlertController,
    private storeScansSrv: StoreScans,
  ) {}

  ngOnInit(): void {
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
  }

  async scanQrCode(): Promise<void> {
    try {
      const granted = await this.requestPermissions();
      if (!granted) {
        this.presentAlert();
        return;
      }
      const { barcodes } = await BarcodeScanner.scan();
      this.barcodes.push(...barcodes);
      console.log('Scanned QR code:', barcodes);

      if (!BarcodeScanner.stopScan) {
        this.storeScansSrv.storeScanLog(
          barcodes[0].format,
          barcodes[0].rawValue,
        );
      }
    } catch (error) {
      console.error('Error scanning QR code:', error);
      this.storeScansSrv.storeScanLog(
        'QRCode',
        'https://github.com/capawesome-team/capacitor-mlkit/tree/main/packages/barcode-scanning',
      );
    }
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission denied',
      message: 'Please grant camera permission to use the barcode scanner.',
      buttons: ['OK'],
    });
    await alert.present();
  }
}
