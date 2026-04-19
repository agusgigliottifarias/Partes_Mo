import { CommonModule, Location, UpperCasePipe } from '@angular/common';
import { Component, ChangeDetectorRef, OnInit } from '@angular/core'; 
import { FormsModule } from '@angular/forms';
import { Play } from './play';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { PlayService } from './play.services';
import { Observable, of, OperatorFunction } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-plays-detail',
  standalone: true,
  imports: [UpperCasePipe, FormsModule, CommonModule, NgbTypeaheadModule],
  templateUrl : 'plays-detail.component.html',
})
export class PlaysDetailComponent {
  play!: Play;

  TYPES = [
    "Tragedia",
    "Comedia",
    "Futurista",
    "Drama",
  ]

  constructor(
    private route: ActivatedRoute,
    private playservice: PlayService,
    private location: Location,
    private cdr: ChangeDetectorRef // para que cargun las obras
  ){}

  ngOnInit(): void { 
    this.get(); 
  }
  
  save(): void { 
    this.playservice.save(this.play).subscribe((dataPackage) => {
        this.play = <Play>dataPackage.data; 
        this.goBack(); 
    }); 
  }

  get(): void {
    const code = this.route.snapshot.paramMap.get('code')!;
    if(code === 'new'){
      this.play = <Play>{type:''};
    }else{
      this.playservice.get(code).subscribe(dataPackage => {
        this.play = <Play>dataPackage.data; 
        this.cdr.detectChanges(); 
      });
    }
  }


  goBack(): void { 
    this.location.back(); 
  }

  searchType: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    map(term => term.length < 2 ? [] 
      : this.TYPES.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
  );
}