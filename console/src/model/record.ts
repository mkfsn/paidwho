import { Person } from './person';


class DetailRecord {
    who: Person;
    expected: number;
    paid: number;
}

export class Record {
    date: Date;
    timestamp: Date;
    payer: Person;
    amount: number;
    title: string;

    people: Array<Person>;
    details: Array<DetailRecord>;

    constructor(title: string, date: Date, amount: number, payer: Person) {
        this.title = title;
        this.date = date;
        this.amount = amount;
        this.payer = payer;
        this.timestamp = new Date();
    }
}
