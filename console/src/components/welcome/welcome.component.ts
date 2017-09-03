import './welcome.scss';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SheetData } from '../../services/sheet-data';

import { UUID } from '../../model/misc';
import { Sheet } from '../../model/sheet';

declare var require: any;

@Component({
    selector: 'welcome',
    template: require('./welcome.html')
})
export class WelcomeComponent {

    private sheetId: string;
    private sheet: Sheet;

    constructor(private router: Router, private sheetData: SheetData) {
        this.sheet = this.sheetData.get('test');
    }

    private gotoSheet() {
        this.router.navigate([
            '/sheet/' + this.sheet.id
        ]);
    }

}
