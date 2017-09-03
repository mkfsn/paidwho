import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { ModalModule } from 'ngx-bootstrap/modal';

import { RouteModule } from './route.module';

import { AppComponent } from './components/app/app.component';
import { SheetComponent } from './components/sheet/sheet.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        ModalModule.forRoot(),
        RouteModule
    ],
    declarations: [
        AppComponent,
        SheetComponent,
        WelcomeComponent
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {}
