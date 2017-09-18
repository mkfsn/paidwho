import { Person } from './person';

import { UUID } from './misc';

export class DetailRecord {
    who: Person;
    expected: number;
    paid: number;
}

export class Record {
    id: string;
    date: Date;
    timestamp: Date;
    payer: Person;
    amount: number;
    title: string;

    details: Array<DetailRecord>;

    constructor(title: string, date: Date, amount: number, payer: Person) {
        this.id = UUID();
        this.title = title;
        this.date = date;
        this.amount = amount;
        this.payer = payer;
        this.timestamp = new Date();

        this.details = [];
    }
}
