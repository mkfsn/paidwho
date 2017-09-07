import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Third party
import { ModalModule } from 'ngx-bootstrap/modal';
import { AsyncLocalStorageModule } from 'angular-async-local-storage';

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
        AsyncLocalStorageModule,
        BrowserModule,
        CommonModule,
        FormsModule,
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
