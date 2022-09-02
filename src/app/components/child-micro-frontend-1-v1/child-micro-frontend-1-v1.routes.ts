import { loadRemoteModule } from "@angular-architects/module-federation";
import { Routes } from "@angular/router";
import { ChildMicroFrontend1V1Component } from "./child-micro-frontend-1-v1.component";

export const CHILD_MFE_ROUTES: Routes = [
    {
        path: "",
        component: ChildMicroFrontend1V1Component,
        data: { breadcrumb: "child_mfe_1_v1", breadcrumbPara: null, isDisabled: false },
        children: [
            /*
                {
                    path: "",
                    component: ChildMFE1LandingComponent,
                    data: { breadcrumb: null, breadcrumbPara: null, isDisabled: false },
                },
                {
                    path: ":title/:id",
                    component: ChildMFE1DetailComponent,
                    data: { breadcrumb: null, breadcrumbPara: 'title', isDisabled: false },
              },
            */
        ],
    },
];
