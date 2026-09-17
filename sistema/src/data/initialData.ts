import { ComponenteItem, CategoriaComponente, EstadoComponente } from '../types';

export const INITIAL_ITEMS: ComponenteItem[] = [
  {
    id: 'comp-001',
    codigo: 'ARD001',
    nombre: 'Arduino Uno R3',
    categoria: 'Arduino',
    marca: 'Genérico',
    cantidad: 5,
    estado: 'Disponible',
    descripcion: 'Microcontrolador ATmega328P con cable USB para prácticas de robótica.',
    fechaRegistro: '2026-03-01'
  },
  {
    id: 'comp-002',
    codigo: 'SEN001',
    nombre: 'Sensor Ultrasónico HC-SR04',
    categoria: 'Sensores',
    marca: 'Elecfreaks',
    cantidad: 12,
    estado: 'Disponible',
    descripcion: 'Módulo sensor de distancia ultrasónico de 2cm a 400cm.',
    fechaRegistro: '2026-03-02'
  },
  {
    id: 'comp-003',
    codigo: 'PC001',
    nombre: 'Computadora de Escritorio Core i5',
    categoria: 'Computadoras',
    marca: 'HP',
    cantidad: 15,
    estado: 'En uso',
    descripcion: 'Equipos del Laboratorio 1 con 16GB RAM y SSD 500GB para programación.',
    fechaRegistro: '2026-02-15'
  },
  {
    id: 'comp-004',
    codigo: 'MON001',
    nombre: 'Monitor LED 24 pulgadas Full HD',
    categoria: 'Monitores',
    marca: 'Samsung',
    cantidad: 14,
    estado: 'En uso',
    descripcion: 'Pantallas HDMI/VGA para puestos de trabajo de alumnos.',
    fechaRegistro: '2026-02-15'
  },
  {
    id: 'comp-005',
    codigo: 'PER001',
    nombre: 'Kit Teclado y Mouse USB',
    categoria: 'Periféricos',
    marca: 'Logitech',
    cantidad: 18,
    estado: 'Disponible',
    descripcion: 'Periféricos estándar para laboratorio de desarrollo.',
    fechaRegistro: '2026-02-20'
  },
  {
    id: 'comp-006',
    codigo: 'ELE001',
    nombre: 'Protoboard 830 Puntos',
    categoria: 'Componentes electrónicos',
    marca: 'Genérico',
    cantidad: 20,
    estado: 'Disponible',
    descripcion: 'Placa de pruebas sin soldadura con bus de alimentación dual.',
    fechaRegistro: '2026-03-05'
  },
  {
    id: 'comp-007',
    codigo: 'HER001',
    nombre: 'Cautín Soldador de Estaño 60W',
    categoria: 'Herramientas',
    marca: 'ProsKit',
    cantidad: 3,
    estado: 'Reparación',
    descripcion: 'En revisión de resistencia térmica y cambio de punta de cobre.',
    fechaRegistro: '2026-02-28'
  },
  {
    id: 'comp-008',
    codigo: 'RED001',
    nombre: 'Switch Gigabit 24 Puertos',
    categoria: 'Redes',
    marca: 'TP-Link',
    cantidad: 2,
    estado: 'En uso',
    descripcion: 'Conmutador de red de laboratorio con soporte VLAN.',
    fechaRegistro: '2026-01-15'
  },
  {
    id: 'comp-009',
    codigo: 'PC002',
    nombre: 'Fuente ATX 500W Descompuesta',
    categoria: 'Componentes electrónicos',
    marca: 'Genérico',
    cantidad: 1,
    estado: 'Baja',
    descripcion: 'Dañada por sobrevoltaje. Guardada para despiece de ventiladores.',
    fechaRegistro: '2026-01-10'
  }
];

export const CATEGORIAS: { label: string; value: CategoriaComponente }[] = [
  { label: 'Arduino', value: 'Arduino' },
  { label: 'Sensores', value: 'Sensores' },
  { label: 'Computadoras', value: 'Computadoras' },
  { label: 'Monitores', value: 'Monitores' },
  { label: 'Periféricos', value: 'Periféricos' },
  { label: 'Componentes electrónicos', value: 'Componentes electrónicos' },
  { label: 'Herramientas', value: 'Herramientas' },
  { label: 'Redes', value: 'Redes' },
  { label: 'Otros', value: 'Otros' }
];

export const ESTADOS: {
  label: string;
  value: EstadoComponente;
  badgeClass: string;
  dotColor: string;
}[] = [
  {
    label: 'Disponible',
    value: 'Disponible',
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    dotColor: 'bg-emerald-500'
  },
  {
    label: 'En uso',
    value: 'En uso',
    badgeClass: 'bg-blue-50 text-blue-700 border-blue-200',
    dotColor: 'bg-blue-500'
  },
  {
    label: 'Reparación',
    value: 'Reparación',
    badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
    dotColor: 'bg-amber-500'
  },
  {
    label: 'Baja',
    value: 'Baja',
    badgeClass: 'bg-rose-50 text-rose-700 border-rose-200',
    dotColor: 'bg-rose-500'
  }
];
