import React from 'react';
import { ComponenteItem } from '../types';
import { AlertTriangle, Trash2, X } from 'lucide-react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  item: ComponenteItem | null;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  item,
  onClose,
  onConfirm
}) => {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-6">
          <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-6 h-6" />
          </div>

          <div className="text-center">
            <h3 className="text-lg font-bold text-slate-900">
              ¿Eliminar componente del inventario?
            </h3>
            <p className="text-sm text-slate-500 mt-2">
              Estás a punto de dar de baja / eliminar el registro:
            </p>
            <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-left">
              <p className="text-xs font-mono text-indigo-600 font-semibold">{item.codigo}</p>
              <p className="text-sm font-bold text-slate-800">{item.nombre}</p>
              <p className="text-xs text-slate-500">
                Categoría: {item.categoria} • Marca: {item.marca} • Cantidad: {item.cantidad}
              </p>
            </div>
            <p className="text-xs text-rose-600 font-medium mt-3">
              Esta acción corresponde a la <strong>Operación D: Baja / Eliminar</strong> (DELETE).
            </p>
          </div>

          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              onClick={onClose}
              className="w-1/2 px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              id="btn-confirmar-eliminar"
              onClick={onConfirm}
              className="w-1/2 px-4 py-2 text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs"
            >
              <Trash2 className="w-4 h-4" />
              <span>Eliminar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
