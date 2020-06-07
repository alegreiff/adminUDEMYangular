import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import Swal from 'sweetalert2'
import { Medico } from 'src/app/models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  totalMedicos: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarMedicos(){
    let url = `${URL_SERVICIOS}/medico`;
    return this.http.get( url )
    .pipe(
      map((res: any) => {
        console.log( res )
        this.totalMedicos = res.total;
        return res.medicos;
      })
    )
  }

  buscarMedico(termino: string){
    let url = `${URL_SERVICIOS}/busqueda/coleccion/medicos/${termino}`;
    return this.http.get(url).pipe(
      map((res: any) => res.medicos)
    )
  }
  borrarMedico(id: string){
    let url = `${URL_SERVICIOS}/medico/${id}?token=${this._usuarioService.token}`;
    return this.http.delete( url ).pipe(
      map( res => {
        Swal.fire('Médico BORRADO?','El médico se marchó','success');
        return res
      } )
    )

  }
  guardarMedico(medico: Medico){
    if(medico._id){
      let url = `${URL_SERVICIOS}/medico/${medico._id}?token=${this._usuarioService.token}`
      return this.http.put(url, medico  ).pipe(
        map( (res: any) => {
          Swal.fire('Médico ACTUALIZADO', medico.nombre, 'success');
          return res.medico;
        } )
      )
    }else{
      let url = `${URL_SERVICIOS}/medico?token=${this._usuarioService.token}`
      return this.http.post(url, medico  ).pipe(
        map( (res: any) => {
          Swal.fire('Médico CREADO', medico.nombre, 'success');
          return res.medico;
        } )
      )
    }

  }

  cargarMedico(id: string){
    let url = `${URL_SERVICIOS}/medico/${id}`
    return this.http.get( url ).pipe(
      map((res: any) => res.medico)
    );
  }
}
