import { Component, OnInit } from "@angular/core";
import {
  IonContent,
  IonLabel,
  IonButton,
  AlertController,
  ToastController,
} from "@ionic/angular/standalone";
import { Barcode, BarcodeScanner } from "@capacitor-mlkit/barcode-scanning";

// Services
import { StoreScans } from "src/app/services/store-scans";

@Component({
  standalone: true,
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
  imports: [IonContent, IonLabel, IonButton],
})
export class Tab1Page implements OnInit {
  isSupported = false;
  barcodes: Barcode[] = [];

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
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

      // if (!BarcodeScanner.stopScan()) {} <-- 🙅 methods are not booleans
      barcodes.forEach((barcode) => {
        // in this case, store format
        // & text of the scan for every
        // element of the array
        console.log("Scanned QR code:", barcodes);
        this.storeScansSrv.storeScanLog(barcode.format, barcode.rawValue);
      });
    } catch (error) {
      this.presentAlert();
      this.storeScansSrv.storeScanLog(
        "QRCode",
        "https://github.com/capawesome-team/capacitor-mlkit/tree/main/packages/barcode-scanning",
      );
    }
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === "granted" || camera === "limited";
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: "Permission denied 🧐",
      message: "Please grant camera permission to use the barcode scanner.",
      buttons: ["OK"],
      cssClass: "custom-alert",
    });
    await alert.present();
  }

  async presentErrorToast() {
    const toast = await this.toastController.create({
      message: "An error occurred while scanning 🤔.",
      duration: 1500,
      position: "bottom",
      cssClass: "custom-toast",
    });

    await toast.present();
  }
}
