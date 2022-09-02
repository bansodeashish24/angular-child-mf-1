import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { KeycloakAngularModule, KeycloakService } from "keycloak-angular";
import { keyCloakInitializer } from "./utils/keycloak-initializer";
import { SnackbarComponent } from "./components/child-micro-frontend-1-v1/shared/snackbar/snackbar.component";
import { MatSnackBarModule } from "@angular/material/snack-bar";

@NgModule({
    declarations: [AppComponent, SnackbarComponent],
    imports: [BrowserModule, AppRoutingModule, HttpClientModule, BrowserAnimationsModule, KeycloakAngularModule, MatSnackBarModule],
    providers: [
        // {
        //     provide: APP_INITIALIZER,
        //     useFactory: keyCloakInitializer,
        //     multi: true,
        //     deps: [KeycloakService],
        // },
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
