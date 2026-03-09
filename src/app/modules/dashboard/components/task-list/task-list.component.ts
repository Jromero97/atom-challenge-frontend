import { Component, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Task } from '../../../../core/models/task.model';
import { TaskListItemComponent } from "../task-list-item/task-list-item.component";

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    MatIconModule,
    TaskListItemComponent
  ],
  host: {
    'class': 'list-section'
  },
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  tasks = input.required<Task[]>();
  onEditItem = output<Task>();
  onDeleteItem = output<string>();
  onToggleCompleteItem = output<Task>();

  onEditTask(task: Task) {
    this.onEditItem.emit(task);
  }

  onDeleteTask(id: string) {
    this.onDeleteItem.emit(id);
  }

  onToggleCompleteTask(task: Task) {
    this.onToggleCompleteItem.emit(task);
  }
}
