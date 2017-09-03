import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { SheetComponent } from './components/sheet/sheet.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

export const RouteModule = RouterModule.forRoot([
    {
        path: '',
        component: WelcomeComponent,
    },
    {
        path: 'sheet/:id',
        component: SheetComponent,
    },
    {
        path: '**',
        redirectTo: '/',
        pathMatch: 'full'
    },
]);
