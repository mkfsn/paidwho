import './selector.scss';
import { Component, Input } from '@angular/core';
declare var require: any;

import { Person } from '../../model/person';

@Component({
    selector: 'selector',
    template: require('./selector.html')
})
export class SelectorComponent {

    @Input() private members: Array<Person>;

}
