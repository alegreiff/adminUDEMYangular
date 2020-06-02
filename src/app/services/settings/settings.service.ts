import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class SettingsService {
ajustes: Ajustes = {
  temaUrl: 'assets/css/default.css',
  tema: 'default'
}


  constructor(
    @Inject(DOCUMENT) private _document,
  ) {
    this.cargarAjustes()
   }

  guardarAjustes(){

    localStorage.setItem('ajustes', JSON.stringify(this.ajustes))
  }

  cargarAjustes() {
    if( localStorage.getItem('ajustes') ){
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'))

    }else{

    }
    this.aplicarTema(this.ajustes.tema)
  }

  aplicarTema(tema: string){
    let url = `assets/css/colors/${tema}.css`;
    this._document.getElementById('themeAdminJaime').setAttribute('href', url)
    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;
    this.guardarAjustes()
  }

}


interface Ajustes {
  temaUrl: string;
  tema: string
}
