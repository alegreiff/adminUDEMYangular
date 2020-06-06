import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginguardGuard implements CanActivate {

  constructor(
    private _usuarioService: UsuarioService,
    private router: Router

    ){}
  canActivate(): boolean {
    /* console.log("PASANDO POR EL LOGIN GUARD --  WOF") */
    if( this._usuarioService.estaLogueado() ) {
      /* console.log('USUARIO TOKENNED') */
      return true
    }else{
      console.log('PAILAS MI PERRO')
      this.router.navigate(['/login'])
      return false
    }

  }

}
