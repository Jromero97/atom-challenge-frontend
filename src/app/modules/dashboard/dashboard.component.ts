import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../core/services/auth.service';
import { TaskService } from '../../core/services/task.service';
import { Router } from '@angular/router';
import { Task } from '../../core/models/task.model';
import { HttpClientModule } from '@angular/common/http';
import { COMMA } from '@angular/cdk/keycodes';
import { DialogService } from '../../core/services/dialog.service';
import { TaskListComponent } from "./components/task-list/task-list.component";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatChipsModule,
    HttpClientModule,
    TaskListComponent
  ],
  providers: [AuthService, TaskService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  private fb = inject(FormBuilder);
  public authService = inject(AuthService);
  private taskService = inject(TaskService);
  private router = inject(Router);
  private dialogService = inject(DialogService);

  currentUser = this.authService.currentUser;
  tasks: Task[] = [];

  taskForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    tag: ['']
  });

  separatorKeysCodes: number[] = [COMMA] as const;
  tags: string[] = [];

  editingTaskId: string | null = null;

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    const email = this.currentUser()?.email;

    if (email) {
      this.taskService.getTasks(email).subscribe(tasks => this.tasks = tasks);
    }
  }

  addTag() {
    const tag = this.taskForm.value.tag as string;
    if (tag) {
      this.tags.push(tag);
      this.taskForm.get('tag')?.setValue('');
    }
  }
  removeTag(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  onSubmit() {
    if (this.taskForm.valid && this.currentUser()) {
      const formValues = this.taskForm.value;

      if (this.editingTaskId) {
        this.taskService.updateTask(
          this.editingTaskId,
          {
            title: formValues.title as string,
            description: formValues.description as string,
            tags: this.tags,
          }
        ).subscribe(() => {
          this.loadTasks();
          this.resetForm();
        });
      } else {
        const task: Partial<Task> = {
          title: formValues.title as string,
          description: formValues.description as string,
          completed: false,
          tags: this.tags,
          userEmail: this.currentUser()!.email,
        };

        this.taskService.addTask(task).subscribe(() => {
          this.loadTasks();
          this.resetForm();
        });
      }
    }
  }

  editTask(task: Task) {
    this.editingTaskId = task.id!;
    this.taskForm.patchValue({
      title: task.title,
      description: task.description,
    });
    this.tags = task.tags;
  }

  deleteTask(id: string) {
    this.dialogService.openConfirm({
      title: 'Delete task',
      message: 'This action can\'t be undone.',
      confirmText: 'Delete'
    }).subscribe((confirm) => {
      if (confirm) {
        this.taskService.deleteTask(id).subscribe(() => this.loadTasks());
      }
    });
  }

  toggleComplete(task: Task) {
    this.taskService.updateTask(task.id!, { completed: !task.completed }).subscribe(() => {
      this.loadTasks();
    });
  }

  cancelEdit() {
    this.resetForm();
  }

  private resetForm() {
    this.taskForm.reset();
    this.tags = [];
    this.editingTaskId = null;
  }

  logout() {
    this.authService.logout();

    this.router.navigate(['/login']);
  }
}
