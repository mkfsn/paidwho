import { Injectable } from '@angular/core';

import { AsyncLocalStorage } from 'angular-async-local-storage';
import { Observable } from 'rxjs'

import { Sheet } from '../model/sheet';
import { Person } from '../model/person';
import { Record } from '../model/record';

interface ISheet {
    id: string;
    name: string;
}

@Injectable()
export class SheetData {

    private sheetsDBName = 'sheet-list';
    private sheets: Array<ISheet>;

    constructor(private storage: AsyncLocalStorage) {
        this.sheets = [];
        this.load();
    }

    private load() {
        this.storage.getItem(this.sheetsDBName).map((data) => {
            return Array(data).map((v) => {
                if (v === null) {
                    return v;
                }
                return {id: v['id'], name: v['name']};
            }).filter(v => v);
        }).subscribe((sheets: Array<ISheet>) => {
            this.sheets = sheets;
        });
    }

    private save() {
        this.storage.setItem(this.sheetsDBName, this.sheets).subscribe(
            () => {},
            () => {}
        );
    }

    public get(id: string): Observable<Sheet> {
        return this.storage.getItem(id).map((data) => {
            return Sheet.fromObject(data);
        });
    }

    public set(sheet: Sheet): Observable<any> {
        let index = this.sheets.findIndex((v) => {
            return v.id === sheet.id;
        });
        if (index === -1) {
            this.sheets.push({id: sheet.id, name: sheet.name});
            this.save();
        }
        return this.storage.setItem(sheet.id, sheet);
    }

    public all(): Array<ISheet> {
        return this.sheets;
    }

}
