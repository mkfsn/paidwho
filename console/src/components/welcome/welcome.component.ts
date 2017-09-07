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

    private name: string;

    constructor(private router: Router, private sheetData: SheetData) {
    }

    private gotoSheet() {
        let sheet = new Sheet(this.name);
        this.sheetData.set(sheet).subscribe(
            () => {
                this.router.navigate([
                    '/sheet/' + sheet.id
                ]);
            },
            () => {
                // error
            }
        )
    }

}
