import { Empresa } from '../empresa/empresa'; 
//import { Estado } from '../estado/estado'; 

export interface Proyecto {
  id: number;
  codigo: string;
  descripcion: string;
  cliente: Empresa;
  
}