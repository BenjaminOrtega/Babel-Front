import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Libros } from '../models/libros/libros.model';
import { Locaciones } from '../models/locaciones/locaciones.model';
import { LibrosService } from '../services/Libros/libros.service';
import { LocacionesService } from '../services/Locaciones/locaciones.service';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})
export class LibrosComponent implements OnInit {

  public librosForm!: FormGroup;

  public libros: any;

  public libroModel?: Libros;

  public locacionModel?: Locaciones;

  public  locaciones: Array<Locaciones> = new Array<Locaciones>();

  constructor(
    public fb: FormBuilder,
    public locacionesService: LocacionesService,
    public librosService: LibrosService
  ) { }

  ngOnInit(): void {

    this.obtenerLocaciones();
    this.obtenerLibros();

    this.librosForm = this.fb.group({
      idLibro:[''],
      titulo: ['', Validators.required],
      volumen: ['', Validators.required],
      locacion: ['', Validators.required]
    });
  }

  public obtenerLocaciones() : void{
    this.locacionesService.getAllLocaciones().subscribe(resp => {
      this.locaciones = resp.filter(el => {
        return el.uso == false;
      });
  });
}

  public obtenerLibros() : void{
    this.librosService.getAllLibros().subscribe(resp => {
      this.libros = resp;
    });
  }

  public guardar() : void{
    let locForm = this.librosForm.value
    let locationForm = this.librosForm.get("locacion")?.value

    this.locacionModel = new Locaciones();
    this.locacionModel.idLocacion = locationForm.idLocacion;
    this.locacionModel.sala = locationForm.sala;
    this.locacionModel.librero = locationForm.librero;
    this.locacionModel.estante = locationForm.estante;
    this.locacionModel.posicion = locationForm.posicion;
    this.locacionModel.uso = true;

    this.libroModel = new Libros();
    this.libroModel.titulo = locForm.titulo;
    this.libroModel.volumen = locForm.volumen;
    this.libroModel.locacion = this.locacionModel


    this.librosService.saveLibro(this.libroModel).subscribe(resp =>{
      this.obtenerLocaciones();
      this.obtenerLibros();
      this.librosForm.reset();
    },
    err => console.error(err));
  }

  public eliminar(libro: any): void{

    this.librosService.deleteLibro(libro).subscribe(resp => {
      this.obtenerLocaciones();
      this.obtenerLibros();
      this.librosForm.reset();
    });
  }

}
