import { Component, inject, input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { Task } from '../../../../core/models/task.model';
import { MatIconModule } from '@angular/material/icon';
import { TaskService } from '../../../../core/services/task.service';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-task-list-item',
  standalone: true,
  imports: [
    MatCardModule,
    MatCheckboxModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    DatePipe
  ],
  host: {
    'class': 'task-card'
  },
  templateUrl: './task-list-item.component.html',
  styleUrl: './task-list-item.component.scss'
})
export class TaskListItemComponent {
  task = input.required<Task>();
  taskService = inject(TaskService);
  onEdit = output<Task>();
  onDelete = output<string>();
  onToggleComplete = output<Task>();

  onEditTask(task: Task) {
    this.onEdit.emit(task);
  }

  onDeleteTask(id: string) {
    this.onDelete.emit(id);
  }

  onToggleCompleteTask(task: Task) {
    this.onToggleComplete.emit(task);
  }

}
