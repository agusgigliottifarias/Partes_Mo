import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProyectoService } from './proyecto.service';
import { EmpresaService } from '../empresa/empresa.service';
import { Empresa } from '../empresa/empresa';

@Component({
  selector: 'app-proyecto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './proyecto.component.html'
})
export class ProyectoComponent implements OnInit {
  
  proyecto: any = {
    codigo: '',
    descripcion: '',
    cliente: null,
    estado: null // Queda desactivado por ahora
  };

  clientesEncontrados: Empresa[] = [];
  nombreClienteBusqueda: string = '';

  constructor(
    private service: ProyectoService,
    private empresaService: EmpresaService
  ) { }

  ngOnInit(): void {
    // No cargamos estados por ahora
  }

  buscarClientes(term: string) {
  if (term.length >= 1) {
    this.empresaService.search(term).subscribe((res: any) => { // <--- Agregamos el :any acá
      this.clientesEncontrados = res.data;
    });
  } else {
    this.clientesEncontrados = [];
  }
}

  seleccionarCliente(c: Empresa) {
    this.proyecto.cliente = c;
    this.nombreClienteBusqueda = c.nombre;
    this.clientesEncontrados = [];
  }

  guardar() {
    // Verificamos solo lo básico
    if (this.proyecto.cliente && this.proyecto.codigo) {
      this.service.save(this.proyecto).subscribe(res => {
        alert(res.message);
      });
    }
  }

  cancelar() {
    this.proyecto = { codigo: '', descripcion: '', cliente: null, estado: null };
    this.nombreClienteBusqueda = '';
  }
}