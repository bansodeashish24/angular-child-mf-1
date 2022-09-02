import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ChildMicroFrontend1V1Component } from "./child-micro-frontend-1-v1.component";
import { ModelSnackbarService } from "src/app/services/model-snackbar.service";
import { CHILD_MFE_ROUTES } from "./child-micro-frontend-1-v1.routes";
import { RouterModule } from "@angular/router";
import { MatDialogModule } from "@angular/material/dialog";
import { DataProviderService } from "src/app/services/data-provider.service";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { AuthInterceptor } from "src/app/utils/auth.interceptor";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NetworkInterceptor } from "src/app/utils/network.interceptor";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { TranslationService } from "src/app/services/translation.service";
import { ApiService } from "src/app/services/api.service";

@NgModule({
    declarations: [ChildMicroFrontend1V1Component],
    imports: [CommonModule, RouterModule.forChild(CHILD_MFE_ROUTES), MatDialogModule, MatProgressSpinnerModule, MatSnackBarModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        DataProviderService,
        TranslationService,
        ModelSnackbarService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NetworkInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
    ],
})
export class ChildMicroFrontend1V1Module {}
