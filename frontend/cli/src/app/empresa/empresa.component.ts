import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Empresa } from './empresa'; 
import { EmpresaService } from './empresa.service';

@Component({
  selector: 'app-empresa',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './empresa.component.html',
})
export class EmpresaComponent implements OnInit {
  
  vista: string = 'listar'; 
  empresas: Empresa[] = [];         
  allEmpresas: Empresa[] = [];      
  searchTerm: string = '';            
  
  nuevaEmpresa: Empresa = { nombre: '', cuit: '', observaciones: '' } as Empresa; 
  mensajeRespuesta: string = ''; 

  constructor(private empresaService: EmpresaService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.vista = params['modo'] || 'listar';
      if (this.vista === 'listar') {
        this.list();
      } else {
        this.resetForm();
        this.mensajeRespuesta = '';
      }
    });
  }

  list(): void {
    this.empresaService.all().subscribe((res) => {
      this.allEmpresas = <Empresa[]>res.data;
      this.empresas = [...this.allEmpresas]; 
    });
  }

  search(): void {
    const term = this.searchTerm.toLowerCase().trim();
    this.empresas = !term ? [...this.allEmpresas] : 
      this.allEmpresas.filter(e => e.nombre.toLowerCase().includes(term) || e.cuit.includes(term));
  }

  save(): void {
    if (!this.nuevaEmpresa.nombre.trim() || !this.nuevaEmpresa.cuit.trim()) return;

    this.empresaService.save(this.nuevaEmpresa).subscribe({
      next: (res: any) => {
        this.mensajeRespuesta = res.message; 
        this.list();
        // Esto limpia los campos después de mostrar el cartel de éxito
        this.resetForm();
      },
      error: (err) => this.mensajeRespuesta = "Error al conectar con el servidor"
    });
  }

  edit(e: Empresa): void {
    this.nuevaEmpresa = { ...e };
    this.vista = 'nuevo';
    this.mensajeRespuesta = '';
  }

  delete(id: number): void {
    if (confirm('¿Borrar este cliente?')) {
      this.empresaService.remove(id).subscribe(() => this.list());
    }
  }

  private resetForm(): void {
    this.nuevaEmpresa = { nombre: '', cuit: '', observaciones: '' } as Empresa;
  }
}