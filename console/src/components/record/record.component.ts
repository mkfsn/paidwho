import './record.scss';
import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Record } from '../../model/record';

declare var require: any;

@Component({
    selector: 'record',
    template: require('./record.html')
})
export class RecordComponent {

    @Input() record: Record;

    @Output() onRecordRemoved = new EventEmitter();

    constructor() {
    }

    private removeRecord(record: Record) {
        let res = confirm('Confirm to delete record');
        if (!res) {
            return;
        }
        this.onRecordRemoved.emit({'record': record});
    }
}
