import { Injectable } from '@angular/core';

import { AsyncLocalStorage } from 'angular-async-local-storage';
import { Observable } from 'rxjs'

import { Sheet } from '../model/sheet';
import { Person } from '../model/person';
import { Record } from '../model/record';

@Injectable()
export class SheetData {

    constructor(private storage: AsyncLocalStorage) {
    }

    public get(id: string): Observable<Sheet> {
        return this.storage.getItem(id).map((data) => {
            return Sheet.fromObject(data);
        });
    }

    public set(sheet: Sheet): Observable<any> {
        return this.storage.setItem(sheet.id, sheet);
    }

}
