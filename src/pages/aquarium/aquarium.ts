import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import { Aquarium } from '../../models/aquarium';
import { AquariumProvider } from '../../providers/aquarium/aquarium';
import * as moment from 'moment';

@Component({
  selector: 'page-aquarium',
  templateUrl: 'aquarium.html'
})
export class AquariumPage {
  private aquarium: Aquarium;

  constructor(
    public alertCtrl: AlertController,
    public AqrProvider: AquariumProvider,
    public navCtrl: NavController
  ) {
    this.subscribeToAquarium();
  }

  subscribeToAquarium() {
    this.AqrProvider.getAquarium().subscribe(aqr => this.aquarium = aqr);
  }

  feed() {
    this.aquarium.remainingQuantity = this.aquarium.remainingQuantity - 1;
    this.aquarium.lastMealAt = new Date();
  }
  waterIsChanged() { this.aquarium.waterChangedAt = new Date(); }
  addMeal() { this.aquarium.remainingQuantity = this.aquarium.remainingQuantity + 1; }
  removeMeal() { this.aquarium.remainingQuantity = this.aquarium.remainingQuantity - 1; }
  handleAutomatisedFood() { this.aquarium.feedEveryDay = this.aquarium.feedEveryDay; }
  handlefeedRemotly() {
    this.aquarium.remainingQuantity = 0;
    this.aquarium.lastMealAt = new Date();
  }

  getTimeSinceLastMeal(): string {
    return moment(new Date()).diff(this.aquarium.lastMealAt, "hours");
  }
  getRemainingQuantity(): number { return this.aquarium.remainingQuantity; }
  watterChangedFrom(): number {
    return moment(new Date()).diff(this.aquarium.waterChangedAt, "days");
  }
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
