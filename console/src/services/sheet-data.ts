import { Sheet } from '../model/sheet';
import { Person } from '../model/person';
import { Record } from '../model/record';

export class SheetData {

    private sheet: Sheet;

    constructor() {
        this.sheet = new Sheet('Travel to Hokkaido!');

        let foo: Person = new Person('foo');
        let bar: Person = new Person('bar');

        this.sheet.addMember(foo);
        this.sheet.addMember(bar);

        let thatday: Date = new Date('2017-09-01');
        let lunch: Record = new Record('lunch', thatday, 1000, foo);

        this.sheet.addRecord(lunch);
    }

    public get(id: string): Sheet {
        return this.sheet;
    }

}
