import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { provideHttpClient } from "@angular/common/http";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { MatDialogModule } from "@angular/material/dialog";

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideAnimationsAsync(),
        provideHttpClient(),
        importProvidersFrom(MatDialogModule),
    ]
};
