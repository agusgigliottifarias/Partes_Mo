import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import { PlayService } from './play.services';
import { ModalService } from '../modal/modal.service';
import { ResultsPage } from '../results.page';
import { PaginationComponent } from "../pagination/pagination.component";

@Component({
  selector: 'app-plays',
  standalone: true,
  imports: [CommonModule, RouterLink, PaginationComponent],
  template: `
    <h2>Obras</h2>&nbsp;<a routerLink="/plays/new" class="btn btn-success">Nueva Obra</a>
    <div class="table-responsive">
     <table class="table table-striped table-sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Código</th>
            <th>Nombre</th>
            <th>Tipo</th>
            <th></th>
          </tr>
        </thead>
        <tbody>  
          <tr *ngFor="let play of resultsPage.content; let i = index">
            <td>{{ i + 1 }}</td>
            <td>{{ play.code }}</td>
            <td>{{ play.name }}</td>
            <td>{{ play.type }}</td>
            <td>
              <a routerLink="/plays/{{play.code}}"><i class="fa fa-pencil"></i></a>
              <a (click)="remove(play.id)" [routerLink]=""><i class="fa fa-remove"></i></a>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <app-pagination
            [totalPages]="resultsPage.totalPages"
            [currentPage]="currentPage"
            (pageChangeRequested)="onPageChangeRequested($event)"
            [number]="resultsPage.number"
            [hidden]="resultsPage.numberOfElements < 1"
            >
          </app-pagination>
        </tfoot>
      </table>
    </div>
   `,
})
export class PlaysComponents  { 
  resultsPage : ResultsPage = <ResultsPage>{};
  pages!: number[];
  currentPage : number = 1;

  constructor(
    private playService : PlayService,
    private cdr: ChangeDetectorRef, 
    private modalService:ModalService
  ){}

  ngOnInit(): void {
    this.getPlays();
  }

  getPlays(): void {
    this.playService
      .byPage(this.currentPage, 4)
      .subscribe(
        (dataPackage) => {
          this.resultsPage = <ResultsPage>dataPackage.data;
          this.cdr.detectChanges(); 
        },
      );
  }

  remove (id:number):void {
    let that =this;
    this.modalService
    .confirm("Eliminar obra","¿Estas seguro de que queres eliminar esta obra?","Si elimna la obra no la va a poder utilizar de nuevo")
    .then(
      function (){
        that.playService.remove(id).subscribe(dataPackage => that.getPlays());
      }
    );
  }

  onPageChangeRequested(page: number) : void{
   this.currentPage = page;
   this.getPlays(); 
  }
}