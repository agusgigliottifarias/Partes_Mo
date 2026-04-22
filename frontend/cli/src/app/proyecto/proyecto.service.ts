import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proyecto } from './proyecto';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  
  private url = 'rest/proyectos';

  constructor(private http: HttpClient) { }

  findAll(): Observable<any> {
    return this.http.get(this.url);
  }

  findById(id: number): Observable<any> {
    return this.http.get(`${this.url}/id/${id}`);
  }

  save(proyecto: Proyecto): Observable<any> {
    return this.http.post(this.url, proyecto);
  }

  search(term: string): Observable<any> {
    return this.http.get(`${this.url}/search/${term}`);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}