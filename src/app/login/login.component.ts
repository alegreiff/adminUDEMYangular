import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
recuerdame: boolean = false
email: string;
auth2: any;

  constructor(
    public router: Router,
    public _serviceUsuario: UsuarioService) { }

  ngOnInit(): void {
    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';
    if(this.email.length >1){
      this.recuerdame = true
    }
  }

  googleInit(){
    console.log(this.auth2)
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '433727984873-4gc18mpsbs6qlf8p20a46vrk4unc4i9r.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin( document.getElementById('btnGoogle') )
    });


  }

  attachSignin (element) {
    this.auth2.attachClickHandler( element, {}, (googleUser) => {
      //let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;
      console.log( "PROFILE GOOGLE ", token );
      this._serviceUsuario.loginGoogle( token )
      /* .subscribe(res => this.router.navigate(['/dashboard'])) */
      .subscribe(res => window.location.href = '#/dashboard')
    } )
  }

  ingresar(forma: NgForm){
    if( forma.invalid ){
      return;
    }
    console.log(forma.valid)
    console.log(forma.value)
    let usuario = new Usuario( null, forma.value.email, forma.value.password )
    this._serviceUsuario.login( usuario, forma.value.recuerdame)
    .subscribe( res => this.router.navigate(['/dashboard']))
  /* console.log('ingressAndDo')
  this.router.navigate([ '/dashboard' ]); */
  //433727984873-4gc18mpsbs6qlf8p20a46vrk4unc4i9r.apps.googleusercontent.com
  }
}
