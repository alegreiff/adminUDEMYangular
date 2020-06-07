import { Component, OnInit } from '@angular/core';
import { HospitalService } from 'src/app/services/hospital/hospital.service';
import { Hospital } from 'src/app/models/hospital.model';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {
cargando: boolean = true
totalRegistros: number;
desde: number = 0;
hospitales: Hospital[] = []
  constructor(
    private hs: HospitalService,
    private _mup: ModalUploadService
  ) { }

  ngOnInit() {
    this._mup.notificacion.subscribe(res => this.cargarHospitales())
    this.cargarHospitales()

  }
  cargarHospitales(){
    this.cargando= true;
    this.hs.cargarHospitales(this.desde).subscribe((res: any) => {
      console.log(res)
      this.totalRegistros = this.hs.totalHospitales;
      this.hospitales = res;
      this.cargando= false;
     })
  }
  actualizaHospital(hospital: Hospital){
    this.hs.actualizarHospital(hospital)
    .subscribe()
  }
  borraHospital(hospital: Hospital){
    this.hs.borrarHospital(hospital._id).subscribe(() => this.cargarHospitales());
  }

  mostrarModal(id: string){
    this._mup.mostrarModal('hospitales', id);
  }
  buscarHospital(termino:string){

    if(termino.length <= 0){
      this.cargarHospitales();
      this.cargando= false;
      return;
    }
    this.cargando= true
    this.hs.buscarHospital(termino).subscribe(
      hospitales => {
        this.hospitales = hospitales,
        this.cargando = false
      }

    )
  }
  crearHospital(){
    Swal
    .fire({
        title: "Nombre del Hospital",
        input: "text",
        showCancelButton: true,
        confirmButtonText: "Guardar",
        cancelButtonText: "Cancelar",
        inputValidator: (value) => {
          if (!value) {
            return 'Falta el nombre del Hospital nuevo'
          }
        }
    })
    .then((resultado) => {
        if (resultado.value) {
          this.hs.crearHospital(resultado.value)
          .subscribe(() => this.cargarHospitales())
        }
    });

  }

  cambiarDesde(valor: number){
    let desde = this.desde + valor;
    console.log("DESDE",desde)
    if(desde >= this.totalRegistros){
      return;
    }

    if(desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarHospitales();
  }

}
