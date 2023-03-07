export interface UsuarioB {
    id: string;
    tipo: number;
}

export interface Usuario {
  id: number;
  primerNombre: string;
  segundoNombre?: any;
  primerApellido: string;
  segundoApellido: string;
  telefono: string;
  direccion: string;
  ciudad: string;
  tipo: Tipo;
}

export interface Tipo {
  id: number;
  nombre?: string;
}
