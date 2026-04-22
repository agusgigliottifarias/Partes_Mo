import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { ProyectoComponent } from './proyecto/proyecto.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'empresa', component: EmpresaComponent},
    {path: 'proyecto', component: ProyectoComponent},
];