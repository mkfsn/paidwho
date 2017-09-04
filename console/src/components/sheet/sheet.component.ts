import './sheet.scss';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

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

    @ViewChild('memberModal') public memberModal: ModalDirective;

    constructor(private route: ActivatedRoute, private sheetData: SheetData) {
        this.sheet = sheetData.get(this.route.snapshot.url[1].path);
        console.log('sheet', this.sheet);
    }

    private addMember(name: string): void {
        if (name.trim() === '') {
            return
        }
        let member = new Person(name);
        this.sheet.addMember(member);
    }

    private removeMember(person: Person): void {
        this.sheet.removeMember(person);
    }

}
