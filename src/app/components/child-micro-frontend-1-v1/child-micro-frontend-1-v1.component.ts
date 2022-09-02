import { Component, OnInit, ViewChild } from "@angular/core";
import { SharedService } from "src/app/services/shared.service";
import { TranslationService } from "src/app/services/translation.service";

@Component({
    selector: "app-child-micro-frontend-1-v1",
    templateUrl: "./child-micro-frontend-1-v1.component.html",
    styleUrls: ["./child-micro-frontend-1-v1.component.scss"],
})
export class ChildMicroFrontend1V1Component implements OnInit {
    isSpinnerVisible = false;
    spinnerSubscription: any;
    constructor(private sharedService: SharedService, public _t: TranslationService) {}

    ngOnInit(): void {
        this.setupWindowEventListeners();
        this.spinnerSubscription = this.sharedService.spinnerSubject.subscribe((value: boolean) => {
            setTimeout(() => {
                this.isSpinnerVisible = value;
            });
        });
    }

    sendRouteRequestToContainer() {
        this.sharedService.sendRouteRequestToContainer("container-v1/child-micro-frontend-2-v1");
    }

    setupWindowEventListeners() {
        // listens to language change event from parent micro-frontend
        window.addEventListener("change-language-event", this.changeCurrentLanguage.bind(this), true);
        window.addEventListener("pop-up-event", this.receivePopUpData.bind(this), true);
        window.addEventListener("drawer-data-event", this.receiveGlobalDrawerData.bind(this), true);
    }

    changeCurrentLanguage(event: any) {
        this._t.setCurrentLanguage(event.detail.languageCode);
    }

    /**
     * Receives data sent from popups present in the container.
     * @param event
     */
    receivePopUpData(event: any) {
        this.sharedService.popupSubject.next(event.detail);
    }

    /**
     * Receives data sent from drawer sidenavs present in the container.
     * @param event
     */
    receiveGlobalDrawerData(event: any) {
        this.sharedService.drawerDataSubject.next(event.detail);
    }

    // call this with appropriate data wherever you want to open a global drawer
    sendDrawerOpenRequestToParent() {
        const drawerData = {
            drawerNumber: 1,
            drawerData: {},
        };
        this.sharedService.sendDrawerOpenRequestToParent(drawerData);
    }

    // call this with appropriate data wherever you want to open a global popup
    sendOpenPopUpRequestToParent() {
        const popupData = { popupId: 1 };
        this.sharedService.sendOpenPopUpRequestToParent(popupData);
    }

    ngOnDestroy() {
        window.removeEventListener("change-language-event", this.changeCurrentLanguage, true);
        window.removeEventListener("pop-up-event", this.receivePopUpData.bind(this), true);
        window.removeEventListener("drawer-data-event", this.receiveGlobalDrawerData, true);
        this.spinnerSubscription.unsubscribe();
    }
}
