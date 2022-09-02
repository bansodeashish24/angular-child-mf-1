import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LocalStorageService } from "./localstorage.service";
import { Subject } from "rxjs";

@Injectable()
export class TranslationService {
    defaultLanguage = "en";
    currLangCode = "";
    currLang: any;
    languageChangeSubject = new Subject();

    constructor(private http: HttpClient, private _localstorageService: LocalStorageService) {
        const presetLangCode = this._localstorageService.getItem("current-language");
        this.currLangCode = presetLangCode ? presetLangCode : this.defaultLanguage;
        this.setCurrentLanguage(this.currLangCode);
    }

    setCurrentLanguage(languageCode: string) {
        this.currLangCode = languageCode;
        this._localstorageService.setItem("current-language", languageCode);
        this.http.get(`/assets/i18n/child-mf-1/${languageCode}.json`).subscribe({
            next: (languageJSON: any) => {
                this.currLang = languageJSON;
                this.languageChangeSubject.next(this.currLangCode);
            },
            error: () => {
                this.languageChangeSubject.next(this.currLangCode);
            },
        });
    }
}
