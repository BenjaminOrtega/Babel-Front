import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibrosComponent } from './libros/libros.component';
import { LocacionesComponent } from './locaciones/locaciones.component';

const routes: Routes = [
  {path:'book', component:LibrosComponent},
  {path:'location', component:LocacionesComponent},
  {path:'**', pathMatch:'full', redirectTo:'book'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
