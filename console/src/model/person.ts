import { UUID } from './misc';

export class Person {
    id: string;
    name: string;

    constructor(name: string) {
        this.id = UUID();
        this.name = name;
    }
}
