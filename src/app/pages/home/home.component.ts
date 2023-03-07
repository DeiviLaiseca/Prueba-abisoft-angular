import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Tipo, Usuario, UsuarioB } from 'src/app/interfaces/usuario';
import { AlertService } from 'src/app/services/alert.service';
import { TipoDocumentoService } from 'src/app/services/tipoDocumento.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public usuario = {tipo:'', id:''};
  public tiposDocumento: Tipo[] = [];

  constructor(private usuarioService: UsuarioService,
              private tipoService: TipoDocumentoService,
              private alert: AlertService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getTipoDocumentos();
  }

  public getTipoDocumentos() {
    this.tipoService.getTipoDocumentos().subscribe((documentos: any) => {
      this.tiposDocumento = documentos;
    });
  }

  public buscar(form: NgForm) {
    if(form.value.id !== '' && form.value.tipo !== '') {
      this.usuarioService.ObtenerUsuarioById(form.value.id).subscribe(usuario => {
        if(usuario) {
          this.router.navigate(['/usuario', JSON.stringify(usuario)]);
        } else {
          this.alert.showAlert('Buscar', 'El usuario no existe', 'error');
        }
      });
    } else {
      this.alert.showAlert('Buscar', 'Debe ingresar todos los campos', 'warning');
    }
  }

  public crearUsuario(){    
    this.router.navigate(['/usuario-admin', 'crear']);
  }

}
