import { Component } from '@angular/core';

import { AquariumPage } from '../aquarium/aquarium';
import { TodoListPage } from '../todo-list/todo-list';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  aquariumPage = AquariumPage;
  todoListPage = TodoListPage;
  constructor() {

  }
}
