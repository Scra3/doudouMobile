import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Task } from '../../models/todo-list';

@Component({
  selector: 'page-tasks',
  templateUrl: 'tasks.html',
})
export class TasksPage {

  taskPath: string = "todoList/list";
  private tasks: Task[];
  private tasksRef: AngularFireList<Task>;
  public todoListTitle: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: AngularFireDatabase
  ) {
    const todoList = this.navParams.get('todoList');
    this.todoListTitle = todoList.title;
    this.tasksRef = this.db.list(this.taskPath);

    this.tasksRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    }).subscribe(todoLists => {
      this.tasks = todoLists.find(todo => todoList.key === todo.key);
    });
  }

  goBack() {
    this.navCtrl.pop();
  }
}
