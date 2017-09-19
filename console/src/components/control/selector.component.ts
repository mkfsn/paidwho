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
    private membersLength: number;

    constructor() {
        this.selected = [];
        this.unselected = [];
        this.equally = true;
        this.membersLength = 0;
    }

    ngOnChanges(changes) {
        if (this.total !== undefined && changes.total) {
            this.splitPaymentEqually();
        }
    }

    ngDoCheck() {
        if (this.members && this.membersLength !== this.members.length) {
            // check old selected and unselected
            if (this.selected.length === 0 && this.unselected.length === 0) {
                this.selected = this.members.map((p: Person) => {
                    return <IPerson>{person: p, expected: undefined};
                });
                this.unselected = [];
            } else {
                let selected = [], unselected = [];

                this.members.forEach((p: Person) => {
                    let existed: IPerson;

                    // if in selected
                    existed = this.selected.find((i: IPerson) => i.person.id === p.id);
                    if (existed !== undefined) {
                        selected.push(existed);
                        return true;
                    }

                    // if in unselected
                    existed = this.unselected.find((i: IPerson) => i.person.id === p.id);
                    if (existed !== undefined) {
                        unselected.push(existed);
                        return true;
                    }

                    // default to selected
                    selected.push(<IPerson>{person: p, expected: undefined});
                });

                this.selected = selected;
                this.unselected = unselected;
            }
            this.membersLength = this.members.length;
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
        let index = this.unselected.findIndex((v) => v.person.id === person.id);
        if (index !== -1) {
            this.unselected.splice(index, 1);
            this.selected.push({expected: undefined, person: person});
        }
        this.splitPaymentEqually();
    }

    private deselect(person: Person) {
        let index = this.selected.findIndex((v) => v.person.id === person.id);
        if (index !== -1) {
            this.selected.splice(index, 1);
            this.unselected.push({expected: undefined, person: person});
        }
        this.splitPaymentEqually();
    }

    private updateTotal() {
        this.equally = false;

        let people = this.selected.filter((p: IPerson) => p.expected !== undefined);
        if (people.length === 0) {
            this.onTotalChanged.emit({'total': undefined});
        } else {
            let total = people.reduce((sum: number, p: IPerson) => sum + p.expected, 0);
            this.onTotalChanged.emit({'total': total});
        }
    }

    public report(): Array<DetailRecord> {
        let people = this.selected.filter((p: IPerson) => p.expected !== undefined);
        return people.map((p: IPerson) => {
            let record = new DetailRecord();
            record.who = p.person;
            record.expected = p.expected;
            return record;
        });
    }

}
