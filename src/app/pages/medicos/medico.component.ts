import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';
import { NgForm } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital/hospital.service';
import { MedicoService } from 'src/app/services/medico/medico.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {
  hospitales: Hospital[] = [];
  medico: Medico = new Medico('','','','','');
  hospital: Hospital = new Hospital('');
  constructor(
    private hs: HospitalService,
    private ms: MedicoService,
    public router: Router,
    private ruta: ActivatedRoute,
    private _modalUploadService: ModalUploadService
  ) {
    ruta.params.subscribe( params => {
      let id = params['id'];
      if( id !=='nuevo' ){
        this.cargarmedico( id )
      }
    } )
   }

  ngOnInit(){
    this.hs.cargarHospitales().subscribe( (res: Hospital[]) => this.hospitales = res )
    this._modalUploadService.notificacion.subscribe( res => {
      this.medico.img = res.medico.img
    } )
  }
  cargarmedico(id: string){
    this.ms.cargarMedico(id)
    .subscribe( (medico: any) => {
      this.medico = medico,
      this.medico.hospital = medico.hospital._id;
      this.cambioHospital( this.medico.hospital )
    } )

  }
  guardarMedico(f: NgForm){
    if(f.invalid){
      return;
    }
    this.ms.guardarMedico(this.medico)
    .subscribe((medico: Medico) => {
      this.medico._id = medico._id;
      this.router.navigate(['/medico', medico._id]);
    } )

  }
  cambioHospital(id: string){
    this.hs.obtenerHospital(id)
    .subscribe( (hospital: Hospital) => this.hospital = hospital )
  }
  cambiarFoto(){
    this._modalUploadService.mostrarModal( 'medicos', this.medico._id )
  }
}
