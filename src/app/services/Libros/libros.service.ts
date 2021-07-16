import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Locaciones } from 'src/app/models/locaciones/locaciones.model';
import {map}from 'rxjs/operators';
import { Libros } from 'src/app/models/libros/libros.model';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {

  private API_SERVER = "http://localhost:8888/libros/";

  constructor(
    private httpClient: HttpClient
  ) { }

  public saveLibro(libro: Libros):  Observable<any>{
    return this.httpClient.post(this.API_SERVER, libro);
  }

  public getAllLibros() : Observable<Libros[]>{
    return this.httpClient.get<Libros[]>(this.API_SERVER).pipe(
      map(data => data.map(data => new Libros().deserialize(data)))
    );
  }

  public deleteLibro(libro: Libros):  Observable<any>{
    return this.httpClient.delete(this.API_SERVER + "delete/" + libro.idLibro);
  }
}
