import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DataPackage } from "../data-package";
import { Customer } from "./customer"; 

@Injectable ({
    providedIn: 'root'
})
export class CustomerService{

    private customersUrl = "rest/customers";

    constructor (private httpClient: HttpClient) { }

    // Traer todos los clientes
    all(): Observable<DataPackage> {
        return this.httpClient.get<DataPackage>(this.customersUrl);
    }

    // Traer un cliente específico por ID
    get(id: number): Observable<DataPackage> {
        return this.httpClient.get<DataPackage>(`${this.customersUrl}/${id}`); 
    }

    // Guardar: Crea si es nuevo, actualiza si ya existe
    save(customer: Customer): Observable<DataPackage> {
        return customer.id ? 
            this.httpClient.put<DataPackage>(this.customersUrl, customer) : 
            this.httpClient.post<DataPackage>(this.customersUrl, customer);
    }

    // Borrar un cliente
    remove(id: number): Observable<DataPackage> {
        return this.httpClient.delete<DataPackage>(`${this.customersUrl}/${id}`);
    }

    // Buscador por nombre (el que ya tenías)
    search(searchTerm: string): Observable<DataPackage> {
        return this.httpClient.get<DataPackage>(`${this.customersUrl}/search/${searchTerm}`);
    }

    // Paginación (útil si tenés muchos clientes)
    byPage(page: number, size: number): Observable<DataPackage> {
        return this.httpClient.get<DataPackage>(`${this.customersUrl}/page?page=${page - 1}&size=${size}`);
    }
}