import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Empresa } from './empresa'; 
import { EmpresaService } from './empresa.service';
import { PaginationComponent } from '../pagination/pagination.component'; 

@Component({
  selector: 'app-empresa',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, PaginationComponent], 
  templateUrl: 'empresa.component.html',
})
export class EmpresaComponent  {
  
  vista: string = 'listar'; 
  empresas: Empresa[] = [];         
  allEmpresas: Empresa[] = [];      
  searchTerm: string = '';            
  
  nuevaEmpresa: Empresa = { nombre: '', cuit: '', observaciones: '' } as Empresa; 
  mensajeRespuesta: string = ''; 
  errorCuit: string = '';

  
  totalPages: number = 0;
  currentPage: number = 1;
  pageSize: number = 5; 
  isLastPage: boolean = false;

  constructor(private empresaService: EmpresaService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.vista = params['modo'] || 'listar';
      if (this.vista === 'listar') {
        this.loadPage(1); 
      } else {
        this.resetForm();
        this.mensajeRespuesta = '';
      }
    });
  }

  
  loadPage(page: number): void {
    this.currentPage = page;
    this.empresaService.byPage(page, this.pageSize).subscribe({
      next: (res: any) => {
        this.empresas = res.data.content; 
        this.totalPages = res.data.totalPages;
        this.isLastPage = res.data.last;
        this.allEmpresas = [...this.empresas]; 
      },
      error: (err) => console.error("Error al cargar página", err)
    });
  }

  
  onCuitInput(event: any): void {
    let val = event.target.value.replace(/\D/g, ''); 
    if (val.length > 11) val = val.slice(0, 11);

    if (val.length > 2 && val.length <= 10) {
      val = val.slice(0, 2) + '-' + val.slice(2);
    } else if (val.length > 10) {
      val = val.slice(0, 2) + '-' + val.slice(2, 10) + '-' + val.slice(10);
    }

    this.nuevaEmpresa.cuit = val;
    this.validarDuplicado(val);
  }

  
  validarDuplicado(cuit: string): void {
    const cuitLimpio = cuit.replace(/\D/g, '');
    const existe = this.allEmpresas.some(e => {
      const dbCuitLimpio = e.cuit.replace(/\D/g, '');
      return dbCuitLimpio === cuitLimpio && e.id !== this.nuevaEmpresa.id;
    });

    this.errorCuit = existe ? 'Este CUIT ya existe en la base de datos.' : '';
  }

  save(): void {
    if (this.errorCuit || !this.nuevaEmpresa.nombre.trim() || !this.nuevaEmpresa.cuit.trim()) return;

    this.empresaService.save(this.nuevaEmpresa).subscribe({
      next: (res: any) => {
        this.mensajeRespuesta = res.message; 
        this.loadPage(this.currentPage); 
        this.resetForm();
      },
      error: (err) => this.mensajeRespuesta = "Error al conectar con el servidor"
    });
  }

  edit(e: Empresa): void {
    this.nuevaEmpresa = { ...e };
    this.vista = 'nuevo';
    this.errorCuit = '';
    this.mensajeRespuesta = '';
  }

  delete(id: number): void {
    if (confirm('¿Borrar este cliente?')) {
      this.empresaService.remove(id).subscribe(() => this.loadPage(this.currentPage));
    }
  }

  search(): void {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) {
      this.loadPage(1);
      return;
    }
    this.empresas = this.allEmpresas.filter(e => 
      e.nombre.toLowerCase().includes(term) || e.cuit.includes(term)
    );
  }

  private resetForm(): void {
    this.nuevaEmpresa = { nombre: '', cuit: '', observaciones: '' } as Empresa;
    this.errorCuit = '';
  }
}