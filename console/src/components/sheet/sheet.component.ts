import './sheet.scss';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { ModalDirective } from 'ngx-bootstrap/modal';

import { SheetData } from '../../services/sheet-data';
import { Sheet } from '../../model/sheet';
import { Record } from '../../model/record';
import { Person } from '../../model/person';

declare var require: any;

interface ISection {
    date: Date;
    records: Array<Record>;
};

@Component({
    selector: 'sheet',
    template: require('./sheet.html')
})
export class SheetComponent {

    private sheet: Sheet;
    private sections: Array<ISection> = [];

    @ViewChild('memberModal') public memberModal: ModalDirective;

    constructor(private route: ActivatedRoute, private sheetData: SheetData) {
        this.sheet = sheetData.get(this.route.snapshot.url[1].path);
        console.log('sheet', this.sheet);

        let records = this.sheet.getRecords();
        records.forEach((r: Record) => {
            let date = new Date(r.date.getFullYear(), r.date.getMonth(), r.date.getDay());
            let index = this.sections.findIndex((v) => v.date === date);
            if (index === -1) {
                this.sections.push({
                    date: date,
                    records: []
                });
                index = this.sections.length - 1;
            }
            this.sections[index].records.push(r);
        });

        console.log(this.sections);
    }

    private addMember(name: string): void {
        if (name.trim() === '') {
            return;
        }
        let member = new Person(name);
        this.sheet.addMember(member);
    }

    private removeMember(person: Person): void {
        this.sheet.removeMember(person);
    }

}
