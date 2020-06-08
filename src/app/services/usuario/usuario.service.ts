import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient  } from "@angular/common/http";
import { URL_SERVICIOS } from 'src/app/config/config';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { Observable, throwError } from 'rxjs';


@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any[] = [];
  constructor(
    public http: HttpClient,
    public _subirArchivo: SubirArchivoService,
    private router: Router) {
    this.cargarStorage();
  }

  renuevaToken(){
    let url = `${URL_SERVICIOS}/login/renuevatoken?token=${this.token}`
    return this.http.get( url ).pipe(
      map((res:any) => {
        this.token = res.token;
        localStorage.setItem('token', this.token);
        console.log('TOKKEN RENOVATED')
        return true;
      }),
      catchError( err => {
        Swal.fire('No se pudo renovar el token', 'ERROR','error')
        this.router.navigate(['/login'])
        return throwError(err)
      })
    )
  }

  estaLogueado() {
    return (this.token.length > 5) ? true : false
  }

  cargarStorage(){
    if( localStorage.getItem('token') ){
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.token = localStorage.getItem('token');
      this.menu = JSON.parse(localStorage.getItem('menu'));
    }else{
      this.token = '';
      this.usuario = null;
      this.menu = null;
    }
  }

  guardarStorage( id: string, token: string, usuario: Usuario, menu: any ){
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu))

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  loginGoogle( token: string ){
    let url = URL_SERVICIOS + '/login/google';
    return this.http.post( url, { token } ).pipe(
      map( (res: any) => {
        this.guardarStorage( res.id, res.token, res.usuario, res.menu )
        return true
      } )
    )

  }
  logout(){
    this.usuario = null;
    this.token = '';
    this.menu = [];
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');
    this.router.navigate(['/login']);
  }

  login( usuario: Usuario, recordar: boolean = false ){
    if( recordar ){
      localStorage.setItem('email', usuario.email)
    }else{
      localStorage.removeItem('email')
    }
    let url = URL_SERVICIOS + '/login';
    return this.http.post( url, usuario)
    .pipe(
      map((res:any) => {

        this.guardarStorage( res.id, res.token, res.usuario, res.menu )
        return true
      }),
      catchError( err => {
        Swal.fire('Error en el login', err.status + ' -- ' +err.error.mensaje,'error')
        return throwError(err)
      })
    )
}
  crearUsuario( usuario: Usuario ){
    let url = URL_SERVICIOS + '/usuario';
    console.log("USER", url)
    return this.http.post(url, usuario).pipe(
      map((res:any) => {
        Swal.fire(
          'The Internet?',
          usuario.email,
          'success'
        )
        return res.usuario;
      }),
      catchError( err => {
        Swal.fire(err.error.mensaje, err.error.errors.message,'error')
        return throwError(err)
      })
    )
  }

  actualizarUsuario( usuario: Usuario ){
    let url = URL_SERVICIOS + '/usuario/' + usuario._id + '?token=' + this.token ;
    console.log("URL", url);
    return this.http.put( url, usuario ).pipe(
      map( (res: any) => {
        if (usuario._id === this.usuario._id){
          this.guardarStorage( res.usuario._id, this.token, res.usuario, this.menu );
        }
        Swal.fire(
          'Usuario actualizado',
          usuario.nombre,
          'success'
        )



        return true

      })
    )
  }

  cambiarImagen( archivo: File, id: string ){
    this._subirArchivo.subirArchivo(archivo, 'usuarios', id)
    .then((res:any) => {
      this.usuario.img = res.usuario.img;
      Swal.fire(
        'Imagen actualizada',
        this.usuario.nombre,
        'success'
      )
      this.guardarStorage( id, this.token, this.usuario, this.menu );
    })
    .catch( err => {
      console.log(err)
    } )
  }

  cargarUsuarios(desde: number = 0){
    let url = `${URL_SERVICIOS}/usuario?desde=${desde}`;
    return this.http.get(url);
  }
  buscarUsuarios(termino: string){
    let url = `${URL_SERVICIOS}/busqueda/coleccion/usuarios/${termino}`;
    return this.http.get(url).pipe(
      map((res: any) => res.usuarios)
    )
  }

  borrarUsuario(id: string){
    let url = `${URL_SERVICIOS}/usuario/${id}/?token=${this.token}`;
    return this.http.delete(url)
  }

}
