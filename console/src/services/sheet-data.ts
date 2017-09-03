import { Sheet } from '../model/sheet';

export class SheetData {

    private defaultSheet: Sheet;

    constructor() {
        this.defaultSheet = new Sheet('test'); 
    }

    public get(id: string): Sheet {
        return this.defaultSheet;
    }

}
