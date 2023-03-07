import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService {
  private url = environment.url;
  
  constructor(private http: HttpClient) { }

  public getTipoDocumentos() {
    return this.http.get(`${this.url}/tipo_documento`);
  }
}
