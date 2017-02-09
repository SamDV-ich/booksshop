import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent}  from './app.component';
import {RoutingModule} from './routing.module';

import {HomeComponent} from './home.component';

@NgModule({
    imports: [
        BrowserModule,
        RoutingModule
    ],
    declarations: [
        AppComponent,
        HomeComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}