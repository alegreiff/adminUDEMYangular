import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    public us: UsuarioService
  ){
  }
  canActivate() {
    if( this.us.usuario.role === 'ADMIN_ROLE'){
      return true;
    }else{
      console.log("BLOCKED by admin GUARD")
      this.us.logout();

      return false;
    }

  }

}
