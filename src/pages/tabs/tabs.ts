import { Component } from '@angular/core';

import { AquariumPage } from '../aquarium/aquarium';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = AquariumPage;
  constructor() {

  }
}
