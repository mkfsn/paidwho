import { UUID } from './misc';

export class Person {
    id: string;
    name: string;
    deposit: number;

    constructor(name: string) {
        this.id = UUID();
        this.name = name;
        this.deposit = 0;
    }
}
