import { computed, inject, Injectable, signal } from "@angular/core";
import { User as AppUser } from "../models/user.model";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { ActionCodeSettings, isSignInWithEmailLink, onAuthStateChanged, sendSignInLinkToEmail, signInWithEmailLink, signOut, User } from "firebase/auth";
import { firebaseAuth } from "../firebase";
import { Observable } from "rxjs";
import { toSignal } from '@angular/core/rxjs-interop';


@Injectable({ providedIn: 'root' })
export class AuthService {
    private apiUrl = `${environment.apiUrl}/users`;
    private http = inject(HttpClient);
    public authState$ = new Observable<AppUser | null>((subscriber) => {
        return onAuthStateChanged(
            firebaseAuth,
            (user) => {
                if (user && user.email) {
                    subscriber.next({ email: user.email });
                } else {
                    subscriber.next(null);
                }

                if (!this.initialized) {
                    this.initialized = true;
                }
            },
            (error) => subscriber.error(error)
        );
    });

    public currentUserSignal = toSignal(this.authState$, { initialValue: null });
    public currentUser = computed(() => this.currentUserSignal());

    private initialized = false;
    public isReady: Promise<void> = new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, () => {
            resolve();
            unsubscribe();
        });
    });;

    checkUser(email: string): Observable<AppUser> {
        return this.http.get<AppUser>(`${this.apiUrl}/${email}`);
    }

    createUser(email: string): Observable<AppUser> {
        return this.http.post<AppUser>(this.apiUrl, { email });
    }

    async sendLoginLink(email: string): Promise<void> {
        const actionCodeSettings: ActionCodeSettings = {
            url: environment.redirectUrl,
            handleCodeInApp: true
        };
        await sendSignInLinkToEmail(firebaseAuth, email, actionCodeSettings);
        localStorage.setItem('emailForSignIn', email);
    }

    async verifyAndLogin(): Promise<boolean> {
        if (isSignInWithEmailLink(firebaseAuth, window.location.href)) {
            let email = localStorage.getItem('emailForSignIn');

            if (!email) {
                email = window.prompt('Please provide your e-mail for confirmation');
            }

            if (email) {
                await signInWithEmailLink(firebaseAuth, email, window.location.href);
                localStorage.removeItem('emailForSignIn');
                return true;
            }
        }
        return false;
    }

    async logout(): Promise<void> {
        await signOut(firebaseAuth);
    }
}

