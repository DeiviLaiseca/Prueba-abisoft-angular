import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { AlertService } from 'src/app/services/alert.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  public usuarios: any = [];
  public cargando = false;

  constructor(private routerActivate: ActivatedRoute,
              private alert: AlertService,
              private usuarioService: UsuarioService,
              private router: Router) { }

  ngOnInit(): void {
    this.getusuarios();
  }

  
  private getusuarios() {
    this.usuarioService.getUsuarios().subscribe((resp: any) => {
      console.log(resp);
      this.usuarios = resp.result;
    }, error => {
    });
  }


  public actualizarUsuario(id: string) {
    this.router.navigate(['/usuario-admin', id]);
  }

  public eliminarUsuario(usuario){
    this.alert.showCuestion(`Desea eliminar a ${usuario.firstName}`).then((result: any) => {
      if (result.value) {
        this.usuarioService.eliminarUsuario(usuario._id).subscribe((resp: any) => {
          console.log(resp);
          if(resp.Ok) {
            this.alert.showAlert('Eliminar', resp.result, 'success');
            this.getusuarios();
          }
        }, error => {
          this.alert.showAlert('Eliminar', error.error.error, 'success');
        });
      }
    });
  }

}
