import { Person } from './person';
import { Record } from './record';

import { UUID } from './misc';

export class Sheet {
    id: string;
    name: string;
    currency: string;

    private member: Array<Person>;
    private records: Array<Record>;

    constructor(name: string) {
        this.id = UUID();
        this.name = name;
    }

    public addMember(person: Person) {
        this.member.push(person);
    }

    public addRecord(record: Record) {
        this.records.push(record);
    }

    public toJSON(): string {
        return JSON.stringify({
            'id': this.id,
            'name': this.name,
            'member': this.member,
            'currency': this.currency
        });
    }

}
