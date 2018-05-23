export interface TodoList {
  title?: string,
  list?: Task[],
  color?: string,
  priority?: number,
  key?: number
}

export interface Task {
  title: string,
  completed: boolean,
  priority: number
}
