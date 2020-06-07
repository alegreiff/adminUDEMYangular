import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from 'src/app/services/medico/medico.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit {
medicos: Medico[] = [];
totalMedicos: number;
  constructor(
    private ms: MedicoService
  ) { }

  ngOnInit(){
    this.cargarMedicos();
  }
  buscarMedico(termino: string){
    if(termino.length <= 0){
      this.cargarMedicos();
      return;
    }
    this.ms.buscarMedico( termino )
    .subscribe(medicos => this.medicos = medicos)}
  crearMedico(){

  }
  cargarMedicos(){
    this.ms.cargarMedicos()
    .subscribe((res: Medico[]) => {
      this.medicos = res,
      this.totalMedicos = this.ms.totalMedicos;
    })
  }
  borraMedico( medico: Medico ){
    this.ms.borrarMedico(medico._id)
    .subscribe(res => this.cargarMedicos())

  }
}
