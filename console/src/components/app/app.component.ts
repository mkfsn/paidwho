import './app.scss';
import { Component } from '@angular/core';

declare var require: any;

@Component({
    selector: 'app',
    template: require('./app.html')
})
export class AppComponent {

    constructor() {
    }

}
