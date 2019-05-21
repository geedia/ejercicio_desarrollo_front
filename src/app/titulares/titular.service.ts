import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Titular } from './titular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TitularService {
     titular: Titular;
     private urlEndPoint = 'http://localhost:8080/api/titular/';

     private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    constructor(private http: HttpClient) { }
    getTitulares(): Observable<Titular[]> {
      return this.http.get<Titular[]>(this.urlEndPoint + 'listar');
    }

    getTitular(id): Observable<Titular>  {
      return this.http.get<Titular>(this.urlEndPoint + id);
    }

    create(titular: Titular): Observable<Titular> {
      return this.http.post<Titular>(this.urlEndPoint, titular, {headers: this.httpHeaders});
    }

    updateTitular(titular: Titular): Observable<Titular> {
      return this.http.put<Titular>(this.urlEndPoint, titular, {headers: this.httpHeaders});
    }

    deleteTitular(id): Observable<Titular> {
      return this.http.delete<Titular>(this.urlEndPoint + id, {headers: this.httpHeaders} );
    }
}
