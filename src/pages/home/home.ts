import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import { Aquarium } from '../../models/aquarium';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private aquarium: Aquarium;

  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController
  ) {
    this.subscribeToAquarium();
  }

  subscribeToAquarium() {
    const initAquarium: Aquarium = {
      lastMealAt: "18",
      remainingQuantity: 3,
      waterChangedAt: "7",
      todo: "Acheter du pousses",
      feedEveryDay: true,
    };

    this.aquarium = initAquarium;
  }

  feed() {
    this.aquarium.remainingQuantity = this.aquarium.remainingQuantity - 1;
    this.aquarium.lastMealAt = "0";
  }
  waterIsChanged() { this.aquarium.waterChangedAt = "0"; }
  addMeal() { this.aquarium.remainingQuantity = this.aquarium.remainingQuantity + 1; }
  removeMeal() { this.aquarium.remainingQuantity = this.aquarium.remainingQuantity - 1; }

  getTimeSinceLastMeal(): number { return parseInt(this.aquarium.lastMealAt); }
  getRemainingQuantity(): number { return this.aquarium.remainingQuantity; }
  watterChangedFrom(): number { return parseInt(this.aquarium.waterChangedAt); }
  getTodo(): string { return this.aquarium.todo; }

  alertUserForWatter() {
    let alert = this.alertCtrl.create({
      title: "Netoyage",
      message: "As tu vraiment changé l'eau ?",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Accept',
          handler: () => {
            this.waterIsChanged();
          }
        }
      ]
    });
    alert.present();
  }

  alertUserForFeed() {
    let alert = this.alertCtrl.create({
      title: "Nourriture",
      message: "Veux tu vraiment nourrir les bébés ?",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Accept',
          handler: () => {
            this.feed();
          }
        }
      ]
    });
    alert.present();
  }
}
