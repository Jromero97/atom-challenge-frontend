import { inject, Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmationDialogData } from "../models/confirmation-dialog.model";
import { Observable } from "rxjs";
import { ConfirmationDialogComponent } from "../components/confirmation-dialog/confirmation-dialog.component";

@Injectable({ providedIn: 'root' })
export class DialogService {
    private dialog = inject(MatDialog);

    openConfirm(data: ConfirmationDialogData): Observable<boolean> {
        const dialogRef = this.dialog.open(
            ConfirmationDialogComponent,
            {
                width: '400px',
                data,
                disableClose: true,
            }
        );

        return dialogRef.afterClosed();
    }

    openDialog<T, D = any, R = any>(component: any, config?: any): Observable<R | undefined> {
        return this.dialog.open<T, D, R>(component, config).afterClosed();
    }
}