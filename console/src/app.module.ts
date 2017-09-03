import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { ModalModule } from 'ngx-bootstrap/modal';

// Module
import { RouteModule } from './route.module';

// Component
import { AppComponent } from './components/app/app.component';
import { SheetComponent } from './components/sheet/sheet.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

// Service
import { SheetData } from './services/sheet-data';

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
    providers: [
        SheetData
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {}
