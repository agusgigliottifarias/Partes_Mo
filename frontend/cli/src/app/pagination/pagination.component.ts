import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: "pagination.component.html",
})
export class PaginationComponent implements OnChanges {
  @Input() totalPages: number = 0;
  @Input() last: boolean = false;
  @Input() currentPage: number = 1;
  @Input() number: number = 0; 

  @Output() pageChangeRequested = new EventEmitter<number>();
  
  pages: number[] = [];

  constructor(){}

  ngOnChanges(changes: SimpleChanges){
    if(changes['totalPages']){
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    }
  }

  onPageChange(page: number): void {
    if (page < 1 || page > this.totalPages || page === this.currentPage) {
      return;
    }
    
    this.currentPage = page;
    this.pageChangeRequested.emit(page);
  }
}