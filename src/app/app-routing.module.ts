import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { KeycloakAuthGuardService } from "./services/keycloak-auth-guard.service";

const routes: Routes = [
    {
        path: "",
        // canActivate: [KeycloakAuthGuardService],
        children: [
            {
                path: "",
                pathMatch: "full",
                redirectTo: "child-micro-frontend-1-v1",
            },
            {
                path: "child-micro-frontend-1-v1",
                loadChildren: () => import("./components/child-micro-frontend-1-v1/child-micro-frontend-1-v1.module").then((m) => m.ChildMicroFrontend1V1Module),
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
