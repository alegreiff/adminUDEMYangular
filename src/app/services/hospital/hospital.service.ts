import { Injectable } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  totalHospitales: number;
  //hospital: Hospital;
  constructor(
    private http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }


    cargarHospitales(desde: number = 0){
        let url = `${URL_SERVICIOS}/hospital?desde=${desde}`;
        return this.http.get(url).pipe(
          map( (res:any) => {
            this.totalHospitales = res.total;
            return res.hospitales;
          } )
        )

    }

    obtenerHospital(id: string){
      let url = `${URL_SERVICIOS}/hospital/${id}`;
      return this.http.get( url )
      .pipe(
        map( (res:any) => res.hospital )
      )
    }

    borrarHospital( id: string ){
      let url = `${URL_SERVICIOS}/hospital/${id}?token=${this._usuarioService.token}`;
      return this.http.delete( url ).pipe(
        map( res => Swal.fire('Hospital BORRADO?','Se fueeeeeeee','success') )
      )
    }

    crearHospital(nombre: any){
      let url = `${URL_SERVICIOS}/hospital/?token=${this._usuarioService.token}`;
      return this.http.post(url, { nombre }).pipe(
        map( (res: any) => {
          Swal.fire('Hospital CREADO', nombre,'success')
          return res.hospital
        } )
      )
    }
    buscarHospital(termino: string){
      let url = `${URL_SERVICIOS}/busqueda/coleccion/hospitales/${termino}`;
    return this.http.get(url).pipe(
      map((res: any) => res.hospitales)
    )
    }
    actualizarHospital( hospital: Hospital ){

      let url = `${URL_SERVICIOS}/hospital/${hospital._id}?token=${this._usuarioService.token}`
      return this.http.put(url, hospital).pipe(
        map( (res:any) => {
          Swal.fire('Hospital Actualizado', hospital.nombre,'success')
          return  res.hospital
        } )
      )
    }

}
