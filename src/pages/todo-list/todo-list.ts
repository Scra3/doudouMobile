import {
  NavController,
  NavParams,
  AlertController,
  ModalController
} from 'ionic-angular';
import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { TodoList } from '../../models/todo-list';
import { TasksPage } from '../tasks/tasks';

@Component({
  selector: 'page-todo-list',
  templateUrl: 'todo-list.html',
})
export class TodoListPage {
  todoListPath: string = "todoList";
  private todoLists: TodoList[];
  private todoListRef: AngularFireList<TodoList>;

  constructor(
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    public db: AngularFireDatabase,
    public navParams: NavParams,
    public modalCtrl: ModalController
  ) {
    // Init this.todoLists because is Async
    this.todoLists = [{}];
    this.todoListRef = this.db.list(this.todoListPath);

    this.todoListRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    }).subscribe(todoLists => {
      this.todoLists = todoLists;
    });
  }

  addTodoList(newTitle: string) {
    this.todoListRef.push(this.newTodoList(newTitle));
  }

  deleteTodoList(key: string) {
    this.todoListRef.remove(key);
  }

  updateTodoList(key: string, priority: number) {
    this.todoListRef.update(key, { priority: priority });
  }

  private newTodoList(newTitle: string) {
    const todoList: TodoList = {
      title: newTitle,
      list: null,
      color: "blue",
      priority: null
    }
    return todoList;
  }

  presentPromptNewTitle() {
    let alert = this.alertCtrl.create({
      title: 'Nouvelle todoList',
      inputs: [
        {
          name: 'title',
          placeholder: 'Titre',
          type: 'text'
        }
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Valider',
          handler: data => {
            this.addTodoList(data.title);
          }
        }
      ]
    });
    alert.present();
  }

  showConfirmDeleteTodoList(event, title: string, key: string) {
    event.stopPropagation();
    let confirm = this.alertCtrl.create({
      title: 'Supprimer todoList',
      message: `Confimer la suppresion de ${title} ?`,
      buttons: [
        {
          text: 'Annuler',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Supprimer',
          handler: () => {
            this.deleteTodoList(key);
          }
        }
      ]
    });
    confirm.present();
  }

  reorderTodoLists(indexes) {
    let element = this.todoLists[indexes.from];
    this.todoLists.splice(indexes.from, 1);
    this.todoLists.splice(indexes.to, 0, element);

    for (let i = 0; i < this.todoLists.length; i++) {
      this.updateTodoList(this.todoLists[i].key.toString(), i);
    }
  }

  showTasks(key: string) {
    let tasks = this.modalCtrl.create(
      TasksPage, {
        todoList: this.todoLists.find(
          todo => todo.key.toString() === key
        )
      });

    tasks.present();
  }

  todoListsOrderedByPriority() {
    return this.todoLists.sort(function(a, b) {
      return a.priority - b.priority;
    });
  }
}
