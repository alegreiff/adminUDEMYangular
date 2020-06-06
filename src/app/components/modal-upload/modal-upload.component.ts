import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { SubirArchivoService } from 'src/app/services/subir-archivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: [
  ]
})
export class ModalUploadComponent implements OnInit {

imagenSubir: File;
imagenTemp: string;

  constructor(
    public _subirArchivoService: SubirArchivoService,
    public _mup: ModalUploadService
    ) {}

  ngOnInit(): void {
  }
  seleccionImagen( archivo: File ){
    if( !archivo ){
      this.imagenSubir = null;
      return;
    }
    if( archivo.type.indexOf('image') < 0  ){
      Swal.fire(
        'Solo imágenes',
        'El archivo NO es uma imagen',
        'error'
      )
      this.imagenSubir = null;
      return;

    }

    let reader = new FileReader()
    let urlImagenTemp = reader.readAsDataURL( archivo );
        reader.onloadend = () => this.imagenTemp = reader.result.toString();

    this.imagenSubir = archivo;
  }

  subirImagen(){
    this._subirArchivoService.subirArchivo( this.imagenSubir, this._mup.tipo, this._mup.id)
    .then(res =>{
      this._mup.notificacion.emit( res );
      this.cerrarModal()
    })
    .catch(err => {
      console.log('error en la carga...')
    })
  }
  cerrarModal(){
    this.imagenSubir = null;
    this.imagenTemp = null;
    this._mup.ocultarModal()
  }
}
