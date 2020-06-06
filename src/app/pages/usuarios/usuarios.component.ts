import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
import Swal from 'sweetalert2'
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {
usuarios: Usuario[] = [];
desde: number = 0;
totalRegistros: number = 0;
cargando: boolean = true;
  constructor(
    private _usuarioService: UsuarioService,
    private _mup: ModalUploadService
    ) { }

  ngOnInit(){
    this.cargarUsuarios();
    this._mup.notificacion.subscribe(res => this.cargarUsuarios())
  }

  cargarUsuarios(){
    this.cargando= true;
    this._usuarioService.cargarUsuarios(this.desde)
    .subscribe((res: any) => {
      this.totalRegistros = res.total;
      this.usuarios = res.usuarios;
      this.cargando= false;

    })
  }
  cambiarDesde(valor: number){
    let desde = this.desde + valor;
    console.log("DESDE",desde)
    if(desde >= this.totalRegistros){
      return;
    }

    if(desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();
  }
  buscarUsuario(termino: string){

    if(termino.length <= 0){
      this.cargarUsuarios();
      this.cargando= false;
      return;
    }
    console.log(termino);
    this.cargando= true
    this._usuarioService.buscarUsuarios(termino)
    .subscribe((usuarios: Usuario[]) => {

      this.usuarios = usuarios;
      this.cargando= false;

    })
  }
  borrarUsuario(usuario: Usuario){
    if( usuario._id === this._usuarioService.usuario._id ){
      Swal.fire(
        'NO te puedes borrar',
        usuario.nombre,
        'error'
      )
      return;
    }
    Swal.fire({
      title: '¿Está seguro?',
      text: `No podrá arrepentirse de borrar a ${usuario.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#d33',
      confirmButtonText: 'SI. Bórrelo'
    }).then((result) => {
      if (result.value) {
        this._usuarioService.borrarUsuario( usuario._id )
        .subscribe(res => {
          console.log(res);
          Swal.fire(
            'Borrado',
            `Hasta nunca ${usuario.nombre} -- ${res}`,
            'success'
          )
          this.cargarUsuarios();
        })

      }
    })


  }
  guardarUsuario(usuario: Usuario){
    console.log(usuario.role)
    this._usuarioService.actualizarUsuario(usuario).subscribe()

  }
  mostrarModal(id: string){
    this._mup.mostrarModal('usuarios', id);
  }

}
