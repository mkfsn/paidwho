import { Person } from './person';
import { Record } from './record';

import { UUID } from './misc';

export class Sheet {
    id: string;
    name: string;
    currency: string;
    members: Array<Person>;
    records: Array<Record>;
    createdAt: Date;
    modifiedAt: Date;

    static fromObject(data: Object): Sheet {
        if (data === undefined) {
            return undefined;
        } else if (data === null) {
            return null;
        }

        let sheet = new Sheet(data['name']);
        sheet.id = data['id'];
        sheet.currency = data['currency'] || '';
        sheet.records = data['records'] || [];
        sheet.members = data['members'] || [];
        sheet.createdAt = data['createdAt'];
        sheet.modifiedAt = data['modifiedAt'];
        return sheet;
    }

    constructor(name: string) {
        this.id = UUID();
        this.name = name;
        this.currency = '';
        this.members = [];
        this.records = [];
        this.createdAt = new Date();
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
            'currency': this.currency,
            'createdAt': this.createdAt,
            'modifiedAt': this.modifiedAt
        });
    }
}
