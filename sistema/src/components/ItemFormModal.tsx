import React, { useState, useEffect } from 'react';
import { ComponenteItem, CategoriaComponente, EstadoComponente } from '../types';
import { CATEGORIAS, ESTADOS } from '../data/initialData';
import { X, Save, PlusCircle, AlertCircle } from 'lucide-react';

interface ItemFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: Omit<ComponenteItem, 'id'> | ComponenteItem) => void;
  itemToEdit?: ComponenteItem | null;
}

export const ItemFormModal: React.FC<ItemFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  itemToEdit
}) => {
  const [formData, setFormData] = useState({
    codigo: '',
    nombre: '',
    categoria: 'Arduino' as CategoriaComponente,
    marca: '',
    cantidad: 1,
    estado: 'Disponible' as EstadoComponente,
    descripcion: '',
    fechaRegistro: new Date().toISOString().split('T')[0]
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (itemToEdit) {
      setFormData({
        codigo: itemToEdit.codigo,
        nombre: itemToEdit.nombre,
        categoria: itemToEdit.categoria,
        marca: itemToEdit.marca,
        cantidad: itemToEdit.cantidad,
        estado: itemToEdit.estado,
        descripcion: itemToEdit.descripcion || '',
        fechaRegistro: itemToEdit.fechaRegistro || new Date().toISOString().split('T')[0]
      });
    } else {
      setFormData({
        codigo: '',
        nombre: '',
        categoria: 'Arduino',
        marca: '',
        cantidad: 1,
        estado: 'Disponible',
        descripcion: '',
        fechaRegistro: new Date().toISOString().split('T')[0]
      });
    }
    setErrors({});
  }, [itemToEdit, isOpen]);

  if (!isOpen) return null;

  // 10. Validaciones mínimas obligatorias
  const validate = () => {
    const newErrors: Record<string, string> = {};

    // Código obligatorio
    if (!formData.codigo.trim()) {
      newErrors.codigo = 'El código interno es obligatorio.';
    }

    // Nombre obligatorio
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre del componente o equipo es obligatorio.';
    }

    // Categoría obligatoria
    if (!formData.categoria) {
      newErrors.categoria = 'La categoría es obligatoria.';
    }

    // Marca obligatoria
    if (!formData.marca.trim()) {
      newErrors.marca = 'La marca o fabricante es obligatoria.';
    }

    // Cantidad numérica e igual o mayor que cero
    if (
      formData.cantidad === undefined ||
      formData.cantidad === null ||
      isNaN(Number(formData.cantidad)) ||
      Number(formData.cantidad) < 0
    ) {
      newErrors.cantidad = 'La cantidad debe ser un número válido mayor o igual a 0.';
    }

    // Estado obligatorio
    if (!formData.estado) {
      newErrors.estado = 'El estado es obligatorio.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (itemToEdit) {
      onSave({
        ...formData,
        cantidad: Number(formData.cantidad),
        id: itemToEdit.id
      });
    } else {
      onSave({
        ...formData,
        cantidad: Number(formData.cantidad)
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-700">
              {itemToEdit ? <Save className="w-5 h-5" /> : <PlusCircle className="w-5 h-5" />}
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                {itemToEdit ? 'Modificar Componente' : 'Registrar Nuevo Componente'}
              </h2>
              <p className="text-xs text-slate-500">
                {itemToEdit
                  ? 'Operación C: Modificación / Actualizar (UPDATE)'
                  : 'Operación A: Alta / Crear (INSERT)'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-200/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {Object.keys(errors).length > 0 && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>Por favor completa todos los campos requeridos y revisa las validaciones.</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Código */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Código Interno *
              </label>
              <input
                id="input-codigo"
                type="text"
                value={formData.codigo}
                onChange={(e) => setFormData({ ...formData, codigo: e.target.value })}
                placeholder="Ej. ARD001, SEN002, PC005"
                className={`w-full text-sm px-3 py-2 rounded-lg border ${
                  errors.codigo ? 'border-rose-400 focus:ring-rose-200' : 'border-slate-300 focus:ring-indigo-200'
                } focus:outline-none focus:ring-2`}
              />
              {errors.codigo && <p className="text-[11px] text-rose-500 mt-1">{errors.codigo}</p>}
            </div>

            {/* Categoría */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Categoría *
              </label>
              <select
                id="select-categoria"
                value={formData.categoria}
                onChange={(e) => setFormData({ ...formData, categoria: e.target.value as CategoriaComponente })}
                className="w-full text-sm px-3 py-2 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200"
              >
                {CATEGORIAS.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
              {errors.categoria && <p className="text-[11px] text-rose-500 mt-1">{errors.categoria}</p>}
            </div>

            {/* Nombre del Componente */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nombre del Equipo o Componente *
              </label>
              <input
                id="input-nombre"
                type="text"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                placeholder="Ej. Arduino Uno, Sensor Ultrasónico, Monitor LED"
                className={`w-full text-sm px-3 py-2 rounded-lg border ${
                  errors.nombre ? 'border-rose-400 focus:ring-rose-200' : 'border-slate-300 focus:ring-indigo-200'
                } focus:outline-none focus:ring-2`}
              />
              {errors.nombre && <p className="text-[11px] text-rose-500 mt-1">{errors.nombre}</p>}
            </div>

            {/* Marca */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Marca o Fabricante *
              </label>
              <input
                id="input-marca"
                type="text"
                value={formData.marca}
                onChange={(e) => setFormData({ ...formData, marca: e.target.value })}
                placeholder="Ej. Genérico, HP, Logitech, Samsung"
                className={`w-full text-sm px-3 py-2 rounded-lg border ${
                  errors.marca ? 'border-rose-400 focus:ring-rose-200' : 'border-slate-300 focus:ring-indigo-200'
                } focus:outline-none focus:ring-2`}
              />
              {errors.marca && <p className="text-[11px] text-rose-500 mt-1">{errors.marca}</p>}
            </div>

            {/* Cantidad */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Cantidad (Stock Disponible) *
              </label>
              <input
                id="input-cantidad"
                type="number"
                min="0"
                value={formData.cantidad}
                onChange={(e) => setFormData({ ...formData, cantidad: parseInt(e.target.value) || 0 })}
                className={`w-full text-sm px-3 py-2 rounded-lg border ${
                  errors.cantidad ? 'border-rose-400 focus:ring-rose-200' : 'border-slate-300 focus:ring-indigo-200'
                } focus:outline-none focus:ring-2`}
              />
              {errors.cantidad && <p className="text-[11px] text-rose-500 mt-1">{errors.cantidad}</p>}
            </div>

            {/* Estado */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Estado *
              </label>
              <select
                id="select-estado"
                value={formData.estado}
                onChange={(e) => setFormData({ ...formData, estado: e.target.value as EstadoComponente })}
                className="w-full text-sm px-3 py-2 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200"
              >
                {ESTADOS.map((est) => (
                  <option key={est.value} value={est.value}>
                    {est.label}
                  </option>
                ))}
              </select>
              {errors.estado && <p className="text-[11px] text-rose-500 mt-1">{errors.estado}</p>}
            </div>

            {/* Fecha de Registro */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Fecha de Registro *
              </label>
              <input
                id="input-fecha"
                type="date"
                value={formData.fechaRegistro}
                onChange={(e) => setFormData({ ...formData, fechaRegistro: e.target.value })}
                className="w-full text-sm px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              />
            </div>

            {/* Descripción */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Descripción / Información Adicional
              </label>
              <textarea
                id="textarea-descripcion"
                rows={2}
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                placeholder="Detalles sobre uso, ubicación o especificaciones técnicas..."
                className="w-full text-sm px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              id="btn-guardar-componente"
              className="px-5 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>{itemToEdit ? 'Actualizar Registro' : 'Guardar Componente'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
