import { Person } from './person';
import { Record } from './record';

import { UUID } from './misc';

export class Sheet {
    id: string;
    name: string;
    currency: string;
    timestamp: Date;
    members: Array<Person>;
    records: Array<Record>;

    constructor(name: string) {
        this.id = UUID();
        this.name = name;
        this.currency = '';
        this.members = [];
        this.records = [];
        this.timestamp = new Date();
    }

    private findMember(name: string) {
        return this.members.find((p: Person) => p.name === name);
    }

    public addMember(person: Person) {
        if (this.findMember(person.name) !== undefined) {
            return;
        }
        this.members.push(person);
    }

    public getMembers(): Array<Person> {
        return this.members;
    }

    public removeMember(person: Person) {
        let index = this.members.indexOf(person);
        if (index !== -1) {
            this.members.splice(index, 1);
        }
    }

    public addRecord(record: Record) {
        this.records.push(record);
    }

    public getRecords(): Array<Record> {
        return this.records;
    }

    public toJSON(): string {
        return JSON.stringify({
            'id': this.id,
            'name': this.name,
            'member': this.members,
            'currency': this.currency
        });
    }

}
