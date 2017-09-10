import { Component, Input } from '@angular/core';

import { Record } from '../../model/record';

declare var require: any;

interface IRecordGroup {
    date: Date;
    records: Array<Record>;
};

@Component({
    selector: 'record-list',
    template: require('./record-list.html')
})
export class RecordListComponent {

    @Input() records: Array<Record>;
    private recordGroup: Array<IRecordGroup>;

    constructor() {
        this.records = [];
        this.recordGroup = [];
    }

    ngOnChanges(changesObj) {
        if (changesObj.records) {
            this.updateRecordGroup();
        }
    }

    private updateRecordGroup() {
        this.recordGroup = [];

        let dict = {};
        this.records.forEach((r: Record) => {
            let dateString = r.date.getFullYear() + '/' + r.date.getMonth() + '/' + r.date.getDay();
            let date = new Date(dateString);

            let index: number;
            if (dateString in dict) {
                index = dict[dateString];
            } else {
                index = this.recordGroup.length;
                this.recordGroup.push({
                    date: date,
                    records: []
                });
            }
            this.recordGroup[index].records.push(r);
        });
    }

}
