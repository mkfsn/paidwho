import './sheet.scss';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ModalDirective } from 'ngx-bootstrap/modal';

import { SheetData } from '../../services/sheet-data';
import { Sheet } from '../../model/sheet';
import { Person } from '../../model/person';

declare var require: any;

@Component({
    selector: 'sheet',
    template: require('./sheet.html')
})
export class SheetComponent {

    private sheet: Sheet;
    private today: Date;

    @ViewChild('memberModal') public memberModal: ModalDirective;

    constructor(private router: Router, private route: ActivatedRoute, private sheetData: SheetData) {
        this.today = new Date();
        this.getSheet();
    }

    private getSheet() {
        this.sheetData.get(this.route.snapshot.url[1].path).subscribe(
            (sheet: Sheet) => {
                if (sheet === null) {
                    this.router.navigate([
                        '/'
                    ]);
                    return;
                }
                this.updateSheet(sheet);
            },
            () => { /* Won't called */ }
        );
    }

    private updateSheet(sheet: Sheet) {
        this.sheet = sheet;
        console.log('sheet', this.sheet);
    }

    private addMember(name: string): void {
        if (name.trim() === '') {
            return;
        }
        let member = new Person(name);
        this.sheet.addMember(member);
        this.sheetData.set(this.sheet).subscribe(
            () => {
                console.log('success', this.sheet);
            },
            () => {
                console.log('error');
            }
        );
    }

    private removeMember(person: Person): void {
        this.sheet.removeMember(person);
        this.sheetData.set(this.sheet);
    }

}
