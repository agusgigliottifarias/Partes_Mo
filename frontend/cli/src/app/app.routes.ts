import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlaysComponents } from './plays/plays.components';
import { PlaysDetailComponent } from './plays/plays-detail.component';
import { BorderoDetailComponent } from './bordero/bordero-detail.component';
import { CustomerComponent } from './customer/customer.component';
import { BorderoComponent } from './bordero/bordero.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'plays', component: PlaysComponents},
    {path: 'plays/:code', component: PlaysDetailComponent},
    {path: 'borderos/:id', component: BorderoDetailComponent},
    {path: 'customers', component: CustomerComponent},
    {path: 'bordero', component: BorderoComponent}

];