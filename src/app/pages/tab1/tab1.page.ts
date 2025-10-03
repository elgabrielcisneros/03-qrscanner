import { Component, OnInit } from '@angular/core';
import {
  IonContent,
  IonLabel,
  IonButton,
  IonGrid,
  IonCol,
  IonRow
} from '@ionic/angular/standalone';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [
    IonContent,
    IonLabel,
    IonButton,
    IonGrid,
    IonCol,
    IonRow
  ],
})
export class Tab1Page implements OnInit {
  isSupported = false;
  barcodes: Barcode[] = [];

  constructor( private alertController: AlertController ) {}

  ngOnInit(): void {
    BarcodeScanner.isSupported().then((result) => {
          this.isSupported = result.supported;
        });  }

  scanQRCode(){
    // Implement QR code scanning logic here
  }

  async scanQrCode(): Promise<void> {
      const granted = await this.requestPermissions();
      if (!granted) {
        this.presentAlert();
        return;
      }
      const { barcodes } = await BarcodeScanner.scan();
      this.barcodes.push(...barcodes);
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
