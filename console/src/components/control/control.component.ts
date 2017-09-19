import './control.scss';
import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
declare var require: any;

import { Person } from '../../model/person';
import { Record } from '../../model/record';

@Component({
    selector: 'control',
    template: require('./control.html')
})
export class ControlComponent {

    private today: Date;
    private amount: number;
    private payer: Person;
    private title: string;

    @Input() private members: Array<Person>;

    @Output() onRecordCreated = new EventEmitter();

    @ViewChild('peopleSelector') selector;

    constructor() {
        // We don't assign 0 because we want the input box shows number only
        // when user has typed something.
        this.reset();
    }

    private updateTotal(event) {
        this.amount = event.total;
    }

    private submit() {
        let details = this.selector.report();
        console.log('submit:', details);
        console.log('today:', this.today);
        console.log('payer:', this.payer);
        console.log('amount:', this.amount);

        let record = new Record(this.title, this.today, this.amount, this.payer);
        record.details = details;

        this.onRecordCreated.emit({'record': record});

        // Clean up
        this.reset();
    }

    private reset() {
        this.today = new Date();
        this.amount = undefined;
        this.title = undefined;
        this.payer = undefined;
        if (this.selector) {
            this.selector.reset();
        }
    }

    private updateDate(date: Date) {
        this.today = new Date(date);
    }

}
