import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BorderoService } from './bordero.service';
import { Bordero } from './bordero';
import { DataPackage } from '../data-package';
import { NgbDatepicker } from "@ng-bootstrap/ng-bootstrap";
import { ModalService } from '../modal/modal.service';

@Component({
  selector: 'app-bordero-list',
  standalone: true,
  imports: [CommonModule, RouterModule, NgbDatepicker],
  templateUrl: 'bordero.component.html',
  styles: ``
})
export class BorderoComponent implements OnInit {
  borderos: Bordero[] = [];
  borderoDate: any;

  constructor(
    private borderoService: BorderoService,
    private modalService: ModalService,
    private cdr : ChangeDetectorRef
) { }

  ngOnInit(): void {
    this.list();
  }

  list(): void {
    this.borderoService.list().subscribe({
      next: (dp: DataPackage) => {
        this.borderos = <Bordero[]>dp.data;
        console.log("Lista de borderos cargada", this.borderos);
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error("Error al cargar la lista de borderos", err);
      }
    });
  }

  delete(id: number): void {
    this.modalService.confirm(
      "Eliminar Bordero", 
      `¿Estás seguro de que querés borrar el bordero Nº ${id}?`, 
      "Esta acción no se puede deshacer."
    ).then(() => {
      this.borderoService.delete(id).subscribe({
        next: () => {
          setTimeout(() => {
            this.borderos = this.borderos.filter(b => b.id !== id);
            this.cdr.detectChanges();
            console.log("Bordero eliminado con éxito:", id);
          });
        },
        error: (err) => {
          console.error("Error al intentar borrar", err);
        }
      });
    }).catch(() => {
      console.log("Borrado cancelado");
    });
  }
}