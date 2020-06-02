import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SettingsService } from 'src/app/services/service.index';


@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {

  constructor(

    public _ajustes: SettingsService
     ) { }

  ngOnInit(): void {
    this.marcarCargadoLocalStorage();
  }

  cambiarColorTheme(tema: string, link: any){
    this.marcarSeleccionado(link)
    this._ajustes.aplicarTema( tema )

  }

  marcarSeleccionado(link: any){
    let selectores: any = document.getElementsByClassName('selector')
    for(let ref of selectores){
      ref.classList.remove('working')
    }
    link.classList.add('working')
  }

  marcarCargadoLocalStorage(){
    let selectores: any = document.getElementsByClassName('selector')
    let tema = this._ajustes.ajustes.tema
    for(let ref of selectores){
      if( ref.getAttribute('data-theme') === tema ){
        ref.classList.add('working')
        break;
      }
    }

  }
}
