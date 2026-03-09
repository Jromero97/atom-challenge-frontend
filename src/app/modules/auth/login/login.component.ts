import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { catchError, of, switchMap } from 'rxjs';
import { DialogService } from '../../../core/services/dialog.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private dialogService = inject(DialogService);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  isEmailSent = false;

  async ngOnInit() {
    try {
      const loggedIn = await this.authService.verifyAndLogin();

      if (loggedIn) {
        this.router.navigate(['/dashboard']);
      }
    } catch (error: any) {
      console.error(error);
      this.snackBar.open('Error verifying login link: ' + error.message, 'Close', { duration: 5000 });
    }
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email as string;

      try {
        this.authService.checkUser(email).pipe(
          catchError(error => {
            if (error.status === 404) {
              return this.dialogService.openConfirm({
                title: 'Create user',
                message: 'This user does not exist. Do you want to create it?',
                confirmText: 'Create'
              }).pipe(
                switchMap(confirm => {
                  if (confirm) {
                    return this.authService.createUser(email);
                  }
                  return of(null);
                })
              );
            }
            return of(null)
          })
        ).subscribe(async () => {
          await this.authService.sendLoginLink(email);
          this.isEmailSent = true;
          this.snackBar.open('Check your e-mail for the login link!', 'Close', { duration: 5000 });
        });
      } catch (error: any) {
        console.error('Error sending email link', error);
        this.snackBar.open('Error sending login link: ' + error.message, 'Close', { duration: 5000 });
      }
    }
  }

}
