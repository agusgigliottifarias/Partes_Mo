import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bordero } from './bordero';
import { DataPackage } from '../data-package';

@Injectable({
  providedIn: 'root'
})
export class BorderoService {
  private url = "rest/borderos"; //

  constructor(private httpClient: HttpClient) { }

  
  list(): Observable<DataPackage> {
    return this.httpClient.get<DataPackage>(this.url);
  }

  
  get(id: number): Observable<DataPackage> {
    return this.httpClient.get<DataPackage>(`${this.url}/id/${id}`);
  }

  
  save(bordero: Bordero): Observable<DataPackage> {
    // Si el ID es 0 o null, Java lo interpreta como uno nuevo
    return this.httpClient.post<DataPackage>(this.url, bordero);
  }

  delete(id: number): Observable<DataPackage> {
    return this.httpClient.delete<DataPackage>(`${this.url}/id/${id}`);
  }
}