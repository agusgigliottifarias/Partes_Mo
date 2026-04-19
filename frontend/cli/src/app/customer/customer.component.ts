import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Customer } from './customer';
import { CustomerService } from './customer.service';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './customer.component.html',
})
export class CustomerComponent implements OnInit {
  
  customers: Customer[] = [];         
  allCustomers: Customer[] = [];      
  searchTerm: string = '';            
  newCustomer: Customer = { name: '' } as Customer; 

  constructor(
    private customerService: CustomerService,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    this.list();
  }

  list(): void {
    this.customerService.all().subscribe((dataPackage) => {
      this.allCustomers = <Customer[]>dataPackage.data;
      this.customers = [...this.allCustomers]; 
      this.cdr.detectChanges();
    });
  }

  search(): void {
    const term = this.searchTerm.toLowerCase().trim();

    if (!term) {
      this.customers = [...this.allCustomers]; 
      return;
    }

    this.customers = this.allCustomers.filter(c => 
      c.name.toLowerCase().includes(term)
    );
  }


  delete(id: number): void {
    if (confirm('¿Estás seguro de que querés borrar este cliente?')) {
      this.customerService.remove(id).subscribe(() => {
        this.list();
      });
    }
  }

  
  save(): void {
  if (!this.newCustomer.name.trim()) return;

  this.customerService.save(this.newCustomer).subscribe(() => {
    this.newCustomer = { name: '' } as Customer; 
    this.list(); 
  });
}
  edit(c: Customer) {
  this.newCustomer = { ...c };
}
}