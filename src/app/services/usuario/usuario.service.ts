import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient  } from "@angular/common/http";
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';


@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;
  constructor(
    public http: HttpClient,
    private router: Router) {
    this.cargarStorage();
  }

  estaLogueado() {
    return (this.token.length > 5) ? true : false
  }

  cargarStorage(){
    if( localStorage.getItem('token') ){
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.token = localStorage.getItem('token');
    }else{
      this.token = '';
      this.usuario = null;
    }
  }

  guardarStorage( id: string, token: string, usuario: Usuario ){
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  loginGoogle( token: string ){
    let url = URL_SERVICIOS + '/login/google';
    return this.http.post( url, { token } ).pipe(
      map( (res: any) => {
        this.guardarStorage( res.id, res.token, res.usuario )
        return true
      } )
    )

  }
  logout(){
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  login( usuario: Usuario, recordar: boolean = false ){
    if( recordar ){
      localStorage.setItem('email', usuario.email)
    }else{
      localStorage.removeItem('email')
    }
    let url = URL_SERVICIOS + '/login';
    return this.http.post( url, usuario )
    .pipe(
      map((res:any) => {
        this.guardarStorage( res.id, res.token, res.usuario )
        return true
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
      })
    )
  }

}
