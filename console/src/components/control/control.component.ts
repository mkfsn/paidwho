import './control.scss';
import { Component, Input } from '@angular/core';
declare var require: any;

import { Person } from '../../model/person';

@Component({
    selector: 'control',
    template: require('./control.html')
})
export class ControlComponent {

    @Input() private member: Array<Person>;

}
