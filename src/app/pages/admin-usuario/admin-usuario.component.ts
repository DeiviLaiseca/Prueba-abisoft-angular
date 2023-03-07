import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Tipo } from 'src/app/interfaces/usuario';
import { AlertService } from 'src/app/services/alert.service';
import { TipoDocumentoService } from 'src/app/services/tipoDocumento.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-admin-usuario',
  templateUrl: './admin-usuario.component.html',
  styleUrls: ['./admin-usuario.component.css']
})
export class AdminUsuarioComponent implements OnInit {
  public usuarioForm: FormGroup;
  public btnText: string = '';
  private id: string = '';
  public tiposDocumento: Tipo[] = [];
  private estado;
  
  constructor(private form: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private usuarioServices: UsuarioService,
              private tipoService: TipoDocumentoService,
              private alert: AlertService) {

    this.usuarioForm = this.form.group({
      _id: [],
      firstName: ['', Validators.required],
      secondName: [''],
      lastFirstName: ['', Validators.required],      
      lastSecondName: [''],
      document: ['', Validators.required],
      bornDate: ['', Validators.required],
      inscriptionDate: ['', Validators.required ],
      age: [{value: '', disabled: true}],
      cost: [{value: '', disabled: true}]
    });

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({id}) => {
      if(id !== 'crear') {
        this.id = id;
        this.obtenerUsuario();
      } else {
        this.btnText = 'Guardar';
      }
    });
  }

  public obtenerUsuario() {
    this.usuarioServices.ObtenerUsuarioById(this.id).subscribe((resp: any) => {
      console.log(resp);
      if(resp) {
        
        this.usuarioForm.setValue({
          _id: resp.result._id,
          firstName: resp.result.firstName,
          secondName: resp.result.secondName || '',
          lastFirstName: resp.result.lastFirstName,
          lastSecondName: resp.result.lastSecondName || '',
          document: resp.result.document,
          bornDate: resp.result.bornDate,
          inscriptionDate: resp.result.inscriptionDate,
          age: resp.result.age,
          cost: resp.result.cost,
        });
        this.btnText = 'Actualizar';
      } else {
        this.alert.showAlert('Usuario','No existe el usuario', 'error');
        this.btnText = 'Guardar';
      }
    }, error => {
      this.btnText = 'Guardar';
      if(error.status === 400) {
        this.alert.showAlert('Usuario',error.error.result, 'error');
      } else {
        this.alert.showAlert('usuario',error.error.error.message, 'error');
      }
    });
  }

  public accionUsuario() {
    if(this.btnText === 'Guardar') {
      this.guardarUsuario();
    } else {
      this.actualizarUsuario();
    }
  }

  public guardarUsuario() {
    this.usuarioServices.GuardarUsuario(this.usuarioForm.value).subscribe((resp: any) => {
      if(resp.Ok) {
        this.alert.showAlert('Crear Usuario', 'Registro creado', 'success');
        this.router.navigate(['/usuarios']);
      }
    }, error => {
      console.log(error);
      this.alert.showAlert('Crear Usuario', error.error.error, 'error');
    });
  }

  public actualizarUsuario() {
    this.usuarioServices.actualizarUsuario(this.usuarioForm.value).subscribe((resp: any) => {
      if(resp.Ok) {debugger
        this.alert.showAlert('Actualizar usuario', 'Registro Actualizado', 'success');
        this.usuarioForm.get('age').setValue(resp.result.age);
        this.usuarioForm.get('cost').setValue(resp.result.cost);
      }
    }, error => {
      this.alert.showAlert('Actualizar usuario', error.error.error, 'error');
    });
  }


  public cancelar() {
    this.router.navigate(['/usuarios']);
  }

}
