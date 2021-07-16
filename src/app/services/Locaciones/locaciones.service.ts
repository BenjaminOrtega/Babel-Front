
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Locaciones } from 'src/app/models/locaciones/locaciones.model';
import {map}from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LocacionesService {

  private API_SERVER = "http://localhost:8888/locaciones/";

  constructor(
    private httpClient: HttpClient
  ) { }

  public saveLocacion(locaciones: Locaciones):  Observable<any>{
    return this.httpClient.post(this.API_SERVER, locaciones);
  }

  public deleteLocacion(locaciones: Locaciones):  Observable<any>{
    return this.httpClient.delete(this.API_SERVER + "delete/" + locaciones.idLocacion);
  }

  public getAllLocaciones() : Observable<Locaciones[]>{
    return this.httpClient.get<Locaciones[]>(this.API_SERVER).pipe(
      map(data => data.map(data => new Locaciones().deserialize(data)))
    );
  }
}
