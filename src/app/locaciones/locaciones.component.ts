import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Locaciones } from '../models/locaciones/locaciones.model';
import { LocacionesService } from '../services/Locaciones/locaciones.service';

@Component({
  selector: 'app-locaciones',
  templateUrl: './locaciones.component.html',
  styleUrls: ['./locaciones.component.css']
})
export class LocacionesComponent implements OnInit {

  locacionesForm!: FormGroup;

  public locaciones: any;

  public locacionModel?: Locaciones

  constructor(
    public fb: FormBuilder,
    public locacionesService: LocacionesService
  ) { }



  ngOnInit(): void {

    this.obtenerLocaciones();

    this.locacionesForm = this.fb.group({
      idLocacion:[''],
      sala: ['', Validators.required],
      librero: ['', Validators.required],
      estante: ['', Validators.required],
      posicion: ['', Validators.required],
      uso:['']
    });
  }

  public obtenerLocaciones() : void{
    this.locacionesService.getAllLocaciones().subscribe(resp => {
      this.locaciones = resp;
    });
  }

  public guardar() : void{
    let locForm = this.locacionesForm.value
    this.locacionModel = new Locaciones();

    this.locacionModel.sala =locForm.sala;
    this.locacionModel.librero =locForm.librero;
    this.locacionModel.estante =locForm.estante;
    this.locacionModel.posicion =locForm.posicion;
    this.locacionModel.uso = false;
    this.locacionesService.saveLocacion(this.locacionModel).subscribe(resp =>{
      console.log(resp);

      this.obtenerLocaciones();
      this.locacionesForm.reset();
    });
  }

  public eliminar(locacion: any): void{

    this.locacionesService.deleteLocacion(locacion).subscribe(resp => {
      console.log(resp);

      this.obtenerLocaciones();
    });

  }
}
