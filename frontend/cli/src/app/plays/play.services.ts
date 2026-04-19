import { Injectable, PLATFORM_ID } from '@angular/core';
import { Play } from './play';
import { Observable, of } from 'rxjs';
import { DataPackage } from '../data-package';
import { HttpClient } from '@angular/common/http';
import { Data } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PlayService {

  private playsUrl = 'rest/plays';

  constructor(
    private http: HttpClient
  ) { }

  all(): Observable<DataPackage> {
    return this.http.get<DataPackage>(this.playsUrl);
  }

  get(code: String): Observable<DataPackage>{
    return this.http.get<DataPackage>(`${this.playsUrl}/code/${code}`); 
  }

  save (play: Play) : Observable<DataPackage>{
    return play.id?  this.http.put<DataPackage>(this.playsUrl, play):
    this.http.post<DataPackage>(this.playsUrl, play);
  }

  remove(id: number): Observable<DataPackage>{
    return this.http.delete<DataPackage>(`${this.playsUrl}/${id}`);

  }

  byPage(page: number, size: number) : Observable<DataPackage>{
    return this.http.get<DataPackage>(`${this.playsUrl}/page?page=${page-1}&size=${size}`);
  }

  search(searchTerm: string): Observable<DataPackage>{
    return this.http.get<DataPackage>(`${this.playsUrl}/search/${searchTerm}`);
  }

  searchTypes(term: string): Observable<DataPackage> {
    return this.http.get<DataPackage>(`${this.playsUrl}/types/${term}`);
  }
}