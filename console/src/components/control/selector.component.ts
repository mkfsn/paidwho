import './selector.scss';
import { Component, Input, Output, EventEmitter } from '@angular/core';
declare var require: any;

import { Person } from '../../model/person';
import { DetailRecord } from '../../model/record';

interface IPerson {
    person: Person;
    expected: number;
}

@Component({
    selector: 'selector',
    template: require('./selector.html')
})
export class SelectorComponent {

    @Input() private members: Array<Person>;
    @Input() private total: number;

    @Output() onTotalChanged = new EventEmitter();

    private unselected: Array<IPerson>;
    private selected: Array<IPerson>;
    private equally: boolean;

    constructor() {
        this.selected = [];
        this.unselected = [];
        this.equally = true;
    }

    ngOnChanges(changes) {
        if (this.members && changes.members) {
            this.selected = this.members.map((p: Person) => {
                return <IPerson>{person: p, expected: undefined};
            });
            this.unselected = [];
        }

        if (this.total !== undefined && changes.total) {
            this.splitPaymentEqually();
        }
    }

    private splitPaymentEqually() {
        if (!this.equally || !this.total) {
            return;
        }
        let n = this.selected.length;
        this.selected.forEach((p: IPerson) => {
            p.expected = this.total / n;
        });
    }

    private select(person: Person) {
        let index = this.unselected.findIndex((v) => v.person.id == person.id);
        if (index !== -1) {
            this.unselected.splice(index, 1);
            this.selected.push({expected: undefined, person: person});
        }
        this.splitPaymentEqually();
    }

    private deselect(person: Person) {
        let index = this.selected.findIndex((v) => v.person.id == person.id);
        if (index !== -1) {
            this.selected.splice(index, 1);
            this.unselected.push({expected: undefined, person: person});
        }
        this.splitPaymentEqually();
    }

    private updateTotal() {
        this.equally = false;

        let people = this.selected.filter((p: IPerson) => p.expected != undefined);
        if (people.length === 0) {
            this.onTotalChanged.emit({'total': undefined});
        } else {
            let total = people.reduce((total: number, p: IPerson) => total + p.expected, 0);
            this.onTotalChanged.emit({'total': total});
        }
    }

    public report(): Array<DetailRecord> {
        let people = this.selected.filter((p: IPerson) => p.expected != undefined);
        return people.map((p: IPerson) => {
            let record = new DetailRecord();
            record.who = p.person;
            record.expected = p.expected;
            return record;
        });
    }

}
