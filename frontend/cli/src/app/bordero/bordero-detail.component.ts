import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Bordero } from './bordero';
import { NgbCalendar, NgbDateStruct, NgbDatepickerModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { BorderoService } from './bordero.service';
import { CustomerService } from '../customer/customer.service';
import { PlayService } from '../plays/play.services';
import { ModalService } from '../modal/modal.service';
import { Customer } from '../customer/customer';
import { catchError, debounceTime, distinctUntilChanged, map, Observable, of, switchMap, tap } from 'rxjs';
import { Play } from '../plays/play';
import { CommonModule, Location } from "@angular/common";
import { Performance } from "./performance";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bordero-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbTypeaheadModule, NgbDatepickerModule],
  templateUrl: 'bordero-detail.component.html',
  styles: ``
})
export class BorderoDetailComponent implements OnInit {
  bordero!: Bordero;
  borderoDate!: NgbDateStruct;
  searching: boolean = false;
  searchFailed: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private borderoService: BorderoService,
    private customerService: CustomerService,
    private playService: PlayService,
    private location: Location,
    private calendar: NgbCalendar,
    private modalService: ModalService,
    private cdr: ChangeDetectorRef 
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.load(params['id']);
    });
  }

  load(id: string | null) {
    if (id === 'new') {
      this.bordero = {
        id: 0,
        date: new Date(),
        customer: {} as Customer,
        performances: []
      };
      this.borderoDate = this.calendar.getToday(); 
      this.cdr.detectChanges(); 
    } else {
      this.borderoService.get(parseInt(id!)).subscribe((dp) => {
        this.bordero = <Bordero>dp.data;
        if (this.bordero.date) {
          const d = new Date(this.bordero.date);
          this.borderoDate = {
            year: d.getFullYear(),
            month: d.getMonth() + 1,
            day: d.getDate()
          };
        }
        this.cdr.detectChanges(); 
      });
    }
  }

  goBack() {
    this.location.back();
  }

  save() {
    this.bordero.date = new Date(
      this.borderoDate.year,
      this.borderoDate.month - 1,
      this.borderoDate.day
    );

    this.borderoService.save(this.bordero).subscribe((response) => {
      this.bordero = <Bordero>response.data; 

      console.log("¡Bordero guardado! Nuevo ID: " + this.bordero.id);
      this.cdr.detectChanges(); 

      this.router.navigate(['/borderos', this.bordero.id]); 
    });
  }

  
  searchCustomer = (text$: Observable<string>): Observable<any[]> =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => (this.searching = true)),
      switchMap((term) =>
        this.customerService
          .search(term)
          .pipe(
            map((response) => <Customer[]>response.data),
            tap(() => (this.searchFailed = false)),
            catchError(() => {
              this.searchFailed = true;
              return of([]);
            })
          )
      ),
      tap(() => (this.searching = false))
    );

  searchPlay = (text$: Observable<string>): Observable<any[]> =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => (this.searching = true)),
      switchMap((term) =>
        this.playService
          .search(term)
          .pipe(
            map((response) => <Play[]>response.data),
            tap(() => (this.searchFailed = false)),
            catchError(() => {
              this.searchFailed = true;
              return of([]);
            })
          )
      ),
      tap(() => (this.searching = false))
    );

  resultFormat(value: any) {
    return value.name || value.title || ''; 
  }

  inputFormat(value: any) {
    return value ? (value.name || value.title) : null;
  }

  addPerformance() {
    this.bordero.performances.push({ play: <Play>{}, audience: 0 });
  }

  removePerformance(performance: Performance) {
    this.modalService.confirm(
      "Eliminar Performance", 
      "¿Estás seguro de borrar esta performance?", 
      "El cambio no se confirmará hasta que no guarde el bordero"
    ).then(
      () => {
        let performances = this.bordero.performances;
        performances.splice(performances.indexOf(performance), 1);
        this.cdr.detectChanges(); 
      }
    );
  }

  
}