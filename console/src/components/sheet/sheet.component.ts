import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

declare var require: any;

@Component({
    selector: 'sheet',
    template: require('./sheet.html')
})
export class SheetComponent {

    constructor(private route: ActivatedRoute) {
        let channelId: string;
        this.route.params.forEach((param: Params) => {
            // param.id;
            console.log('sheet id:', param.id);
        });
    }

}
