import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { isSignInWithEmailLink } from "firebase/auth";
import { firebaseAuth } from "../firebase";

export const authGuard: CanActivateFn = async (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    await authService.isReady;

    const user = authService.currentUser();

    if (user) {
        return true;
    }

    if (isSignInWithEmailLink(firebaseAuth, window.location.href)) {
        return router.createUrlTree(['/login'], { queryParams: route.queryParams });
    }
    return router.createUrlTree(['/login']);
}