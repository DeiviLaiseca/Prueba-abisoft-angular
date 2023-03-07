import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url = environment.url;

  constructor(private http: HttpClient) { }

  public getUsuarios() {
    return this.http.get(`${this.url}/usuario`);
  }

  public buscarUsuario(busqueda: string) {
    return this.http.get(`${this.url}/usuario/buscar?nombre=${busqueda}`);
  }

  public ObtenerUsuarioById(id: string) {
    return this.http.get(`${this.url}/usuario/obtener/${id}`);
  }

  public GuardarUsuario(usuario: any) {
    return this.http.post(`${this.url}/usuario/crear`, usuario);
  }

  public actualizarUsuario(usuario: any) {
    return this.http.put(`${this.url}/usuario/actualizar`, usuario);
  }
  

  public eliminarUsuario(id: number){
    return this.http.delete(`${this.url}/usuario/eliminar/${id}`);
  }
}
