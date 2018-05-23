import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Aquarium } from '../../models/aquarium';
import * as moment from 'moment';

@Component({
  selector: 'page-aquarium',
  templateUrl: 'aquarium.html'
})
export class AquariumPage {
  aquariumPath: string = "aquarium";
  private aquarium: Aquarium;
  private aquariumRef: AngularFireObject<Aquarium>;

  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public db: AngularFireDatabase
  ) {
    this.aquarium = {};
    this.aquariumRef = this.db.object(this.aquariumPath);
    this.aquariumRef.valueChanges().subscribe(aqr => {
      this.aquarium = aqr;
    });
  }

  feed() {
    this.aquariumRef
      .update({
        remainingQuantity: this.aquarium.remainingQuantity - 1,
        lastMealAt: new Date()
      });
  }

  waterIsChanged() {
    this.aquariumRef.update({ waterChangedAt: new Date() });
  }

  addMeal() {
    this.aquariumRef.update({
      remainingQuantity: this.aquarium.remainingQuantity + 1
    });
  }

  removeMeal() {
    this.aquariumRef.update({
      remainingQuantity: this.aquarium.remainingQuantity - 1
    });
  }

  handleAutomatisedFood() {
    this.aquariumRef.update({
      feedEveryDay: this.aquarium.feedEveryDay
    });
  }

  handlefeedRemotly() {
    this.aquariumRef.update({ feedRemotly: this.aquarium.feedRemotly });
  }

  setTodo(text: string) {
    this.aquariumRef.update({ todo: text });
  }

  getTimeSinceLastMeal(): number {
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
