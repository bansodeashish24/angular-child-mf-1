import { Injectable } from "@angular/core";
import { KeycloakAuthGuard, KeycloakService } from "keycloak-angular";
import { LocalStorageService } from "./localstorage.service";
import { from } from "rxjs";
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, UrlTree } from "@angular/router";
import { DataProviderService } from "./data-provider.service";
@Injectable({
    providedIn: "root",
})
export class KeycloakAuthGuardService extends KeycloakAuthGuard implements CanActivate {
    constructor(protected override readonly router: Router, protected override readonly keycloakAngular: KeycloakService, private localStorageService: LocalStorageService, private dataProviderService: DataProviderService) {
        super(router, keycloakAngular);
    }

    refreshToken: any = "";
    cliendId: any = "";

    isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
        return new Promise((resolve, reject) => {
            if (!this.authenticated) {
                this.keycloakAngular.login().catch((e) => console.error(e));
                return reject(false);
            } else {
                from(this.keycloakAngular.getToken()).subscribe((token: any) => {
                    this.refreshToken = this.keycloakAngular.getKeycloakInstance().refreshToken;
                    from(this.keycloakAngular.loadUserProfile()).subscribe((userProfile: any) => {
                        return resolve(true);
                    });
                });
            }
        });
    }
}
