import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

@Component({
    selector: 'my-app',
    template: `
        <div>
        <form>
            <input type="text" #test class="">
            Hello1 {{ name }}
            <button (click)="testMethod(test.value)">Clickk</button>
        </form>
        </div>
    `
})

class HelloAngular {
    name: string;

    constructor() {
        this.name = 'test';
    }

    testMethod(test: string) {
        return false;
    }

}

@NgModule({
    imports: [ BrowserModule ],
    declarations : [HelloAngular],
    bootstrap: [HelloAngular]
})
class HelloAngularModule {
}

platformBrowserDynamic().bootstrapModule(HelloAngularModule);










// import { AppModule } from './app.module';
//
// platformBrowserDynamic().bootstrapModule(AppModule);