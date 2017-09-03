import './sheet.scss';
import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SheetData } from '../../services/sheet-data';
import { Sheet } from '../../model/sheet';

declare var require: any;

@Component({
    selector: 'sheet',
    template: require('./sheet.html')
})
export class SheetComponent {

    private sheet: Sheet;

    constructor(private route: ActivatedRoute, private sheetData: SheetData) {
        this.sheet = sheetData.get(this.route.snapshot.url[1].path);
        console.log(this.sheet);
    }

}
