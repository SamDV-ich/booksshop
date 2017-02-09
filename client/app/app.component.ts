import {Component} from '@angular/core';

@Component({
    selector: 'application',
    templateUrl: './templates/application.html'
})
export class AppComponent {
    name: string;

    constructor() {
        this.name = 'test';
    }
}
