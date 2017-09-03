import './welcome.scss';
import { Component } from '@angular/core';

declare var require: any;

@Component({
    selector: 'welcome',
    template: require('./welcome.html')
})
export class WelcomeComponent {

    private uuid: string;

    constructor() {
        this.uuid = this.guid()
    }

    private guid(): string {
        let s4 = function(): string {
            return Math.floor((1 + Math.random()) * 0x10000)
                       .toString(16)
                       .substring(1);
        }
        return s4() + s4() + '-' +
            s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + s4() + s4();
    }

}
