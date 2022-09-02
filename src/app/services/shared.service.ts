import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class SharedService {
    drawerDataSubject = new Subject();
    popupSubject = new Subject();
    spinnerSubject = new Subject<boolean>();

    sendRouteRequestToContainer(routePath: string) {
        const event = new CustomEvent("route-event", {
            detail: { routePath },
        });
        window.dispatchEvent(event);
    }

    sendDrawerOpenRequestToParent(drawerObject: any) {
        const event = new CustomEvent("open-drawer-event", {
            detail: drawerObject,
        });
        window.dispatchEvent(event);
    }

    sendOpenPopUpRequestToParent(popupData: any) {
        const event = new CustomEvent("open-popup-event", {
            detail: popupData,
        });
        window.dispatchEvent(event);
    }

    sendForceLogoutRequestToParent() {
        const event = new CustomEvent("force-logout-event");
        window.dispatchEvent(event);
    }
}
