import './record-list.scss';
import { Component, Input, Output, EventEmitter } from '@angular/core';

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

    @Output() onRecordRemoved = new EventEmitter();

    private recordGroups: Array<IRecordGroup>;
    private recordsLength: number;

    constructor() {
        this.records = [];
        this.recordsLength = 0;
        this.recordGroups = [];
    }

    ngOnChanges(changes) {
        // Do checking update of records(Input) in ngDoCheck since
        // it's a array and is passing by reference
    }

    ngDoCheck() {
        if (this.records && this.recordsLength !== this.records.length) {
            // NOTE: I only check length of records since we only support
            // adding and removing items in records
            this.recordsLength = this.records.length;
            this.updateRecordGroup();
        }
    }

    private updateRecordGroup() {
        this.recordGroups = [];

        let dict = {};
        this.records.forEach((r: Record) => {
            let dateString = r.date.getFullYear() + '/' + (1 + r.date.getMonth()) + '/' + r.date.getDate();
            let date = new Date(dateString);

            let index: number;
            if (dateString in dict) {
                index = dict[dateString];
            } else {
                index = this.recordGroups.length;
                this.recordGroups.push({
                    date: date,
                    records: []
                });
                dict[dateString] = index;
            }
            this.recordGroups[index].records.push(r);
        });

        this.recordGroups.sort((x, y) => {
            if (y.date > x.date) {
                return 1;
            } else if (y.date < x.date) {
                return -1;
            }
            return 0;
        });
    }

    private removeRecord(record: Record) {
        let res = confirm('Confirm to delete record');
        if (!res) {
            return;
        }
        this.onRecordRemoved.emit({'record': record});
    }
}
