export type CategoriaComponente =
  | 'Arduino'
  | 'Sensores'
  | 'Computadoras'
  | 'Monitores'
  | 'Periféricos'
  | 'Componentes electrónicos'
  | 'Herramientas'
  | 'Redes'
  | 'Otros';

export type EstadoComponente =
  | 'Disponible'
  | 'En uso'
  | 'Reparación'
  | 'Baja';

export interface ComponenteItem {
  id: string;             // Identificador único
  codigo: string;         // Código interno del equipo o componente
  nombre: string;         // Nombre del componente o equipo
  categoria: CategoriaComponente; // Categoría solicitada
  marca: string;          // Marca o fabricante
  cantidad: number;       // Stock o cantidad disponible (>= 0)
  estado: EstadoComponente; // Disponible / En uso / Reparación / Baja
  descripcion: string;    // Información adicional
  fechaRegistro: string;  // Fecha de ingreso al sistema
}
