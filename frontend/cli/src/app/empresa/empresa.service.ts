import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DataPackage } from "../data-package";
import { Empresa } from "./empresa"; 

@Injectable ({
    providedIn: 'root'
})
export class EmpresaService{

    private empresaUrl = "rest/empresas";

    constructor (private httpClient: HttpClient) { }

    
    all(): Observable<DataPackage> {
        return this.httpClient.get<DataPackage>(this.empresaUrl);
    }

    
    get(id: number): Observable<DataPackage> {
        return this.httpClient.get<DataPackage>(`${this.empresaUrl}/${id}`); 
    }

    
    save(empresa: Empresa): Observable<DataPackage> {
        return empresa.id ? 
            this.httpClient.put<DataPackage>(this.empresaUrl, empresa) : 
            this.httpClient.post<DataPackage>(this.empresaUrl, empresa);
    }

    
    remove(id: number): Observable<DataPackage> {
        return this.httpClient.delete<DataPackage>(`${this.empresaUrl}/${id}`);
    }

    
    search(searchTerm: string): Observable<DataPackage> {
        return this.httpClient.get<DataPackage>(`${this.empresaUrl}/search/${searchTerm}`);
    }

    
    byPage(page: number, size: number): Observable<DataPackage> {
        return this.httpClient.get<DataPackage>(`${this.empresaUrl}/page?page=${page - 1}&size=${size}`);
    }
}