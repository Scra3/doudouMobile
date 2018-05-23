import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AquariumPage } from '../pages/aquarium/aquarium';
import { TodoListPage } from '../pages/todo-list/todo-list';
import { TasksPage } from '../pages/tasks/tasks';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { firebaseConfig } from '../config';
import { AuthService } from '../services/auth.service';
import { NgxErrorsModule } from '@ultimate/ngxerrors';
import {
  AngularFireDatabaseModule,
  AngularFireDatabase
} from 'angularfire2/database';

@NgModule({
  declarations: [
    MyApp,
    AquariumPage,
    TodoListPage,
    TasksPage,
    TabsPage,
    LoginPage
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig.fire),
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    NgxErrorsModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AquariumPage,
    TodoListPage,
    TasksPage,
    TabsPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AngularFireAuth,
    AuthService,
    AngularFireDatabase
  ]
})
export class AppModule { }
