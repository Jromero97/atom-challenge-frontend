import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginPageComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['verifyAndLogin', 'sendLoginLink', 'checkUser', 'createUser']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    authServiceSpy.verifyAndLogin.and.returnValue(Promise.resolve(false));
    await TestBed.configureTestingModule({
      imports: [LoginComponent, HttpClientTestingModule, BrowserAnimationsModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: MatSnackBar, useValue: snackBarSpy }
      ]
    })
      .overrideComponent(LoginComponent, {
        remove: { imports: [MatSnackBarModule] }
      })
      .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Form Validation', () => {
    it('should initialize with empty and invalid form', () => {
      expect(component.loginForm.value).toEqual({ email: '' });
      expect(component.loginForm.valid).toBeFalse();
    });

    it('should have a required error when e-mail is empty', () => {
      const emailControl = component.loginForm.controls.email;
      emailControl.setValue('');
      expect(emailControl?.hasError('email')).toBeTrue();
    });

    it('should have e-mail error when format is invalid', () => {
      const emailControl = component.loginForm.controls.email;
      emailControl.setValue('test.com');
      expect(emailControl?.hasError('email')).toBeTrue();
    });

    it('should be valid when valid e-mail', () => {
      const emailControl = component.loginForm.controls.email;
      emailControl.setValue('test@example.com');
      expect(component.loginForm.valid).toBeTrue();
    });
  });
});
