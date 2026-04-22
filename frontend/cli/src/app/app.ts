import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  template: `
    <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
      <h5 class="my-0 mr-md-auto font-weight-normal">Brifal S.A</h5>
      
      <nav class="my-2 my-md-0 mr-md-3 d-flex align-items-center">
        
        <div class="dropdown d-inline-block">
          <a class="p-2 text-dark dropdown-toggle" (click)="menuEmpresa = !menuEmpresa; menuProyecto = false" style="cursor: pointer; text-decoration: none;">
            Empresas (Clientes)
          </a>
          <div class="dropdown-menu" [class.show]="menuEmpresa">
             <a class="dropdown-item" 
                [routerLink]="['/empresa']" 
                [queryParams]="{ modo: 'nuevo' }" 
                (click)="menuEmpresa = false">Nuevo</a>
                
             <a class="dropdown-item" 
                [routerLink]="['/empresa']" 
                [queryParams]="{ modo: 'listar' }" 
                (click)="menuEmpresa = false">Listar</a>
          </div>
        </div>

        <div class="dropdown d-inline-block">
          <a class="p-2 text-dark dropdown-toggle" (click)="menuProyecto = !menuProyecto; menuEmpresa = false" style="cursor: pointer; text-decoration: none;">
            Proyectos
          </a>
          <div class="dropdown-menu" [class.show]="menuProyecto">
             <a class="dropdown-item" 
                [routerLink]="['/proyecto']" 
                [queryParams]="{ modo: 'nuevo' }" 
                (click)="menuProyecto = false">Nuevo</a>
                
             <a class="dropdown-item" 
                [routerLink]="['/proyecto']" 
                [queryParams]="{ modo: 'listar' }" 
                (click)="menuProyecto = false">Listar</a>
          </div>
        </div>

      </nav>
    </div>

    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .dropdown-menu.show {
      display: block;
      position: absolute;
    }
  `]
})
export class App {
  menuEmpresa = false;
  menuProyecto = false;
}