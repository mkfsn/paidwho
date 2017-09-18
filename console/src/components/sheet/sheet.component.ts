import './sheet.scss';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ModalDirective } from 'ngx-bootstrap/modal';

import { SheetData } from '../../services/sheet-data';
import { Sheet } from '../../model/sheet';
import { Person } from '../../model/person';
import { Record } from '../../model/record';

declare var require: any;

@Component({
    selector: 'sheet',
    template: require('./sheet.html')
})
export class SheetComponent {

    private sheet: Sheet;

    private titleEditing: Boolean;

    @ViewChild('memberModal') private memberModal: ModalDirective;
    @ViewChild('titleInput') private titleInput: ElementRef;

    constructor(private router: Router, private route: ActivatedRoute, private sheetData: SheetData) {

        this.getSheet();
        this.titleEditing = false;
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

    private saveSheet() {
        this.sheetData.set(this.sheet).subscribe(
            () => {
                console.log('success', this.sheet);
            },
            () => {
                console.log('error');
            }
        );
    }

    private addMember(name: string): void {
        if (name.trim() === '') {
            return;
        }
        let member = new Person(name);
        this.sheet.addMember(member);
        this.saveSheet();
    }

    private removeMember(person: Person): void {
        this.sheet.removeMember(person);
        this.saveSheet();
    }

    private setTitleEditing(editing: Boolean) {
        if (editing === this.titleEditing) {
            // Not changed
            return;
        }
        this.titleEditing = editing;
        if (this.titleEditing) {
            setTimeout(() => {
                this.titleInput.nativeElement.focus();
            }, 0)
        } else {
            this.saveSheet();
        }
    }

    private addRecord(event) {
        let record: Record = event.record;
        console.log('new record:', record);
        this.sheet.addRecord(record);
        this.saveSheet();
    }

}
