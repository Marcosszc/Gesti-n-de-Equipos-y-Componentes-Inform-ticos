import React from 'react';
import { ComponenteItem } from '../types';
import { Cpu, CheckCircle2, PlayCircle, Wrench, AlertTriangle, Layers } from 'lucide-react';

interface StatsCardsProps {
  items: ComponenteItem[];
}

export const StatsCards: React.FC<StatsCardsProps> = ({ items }) => {
  const totalModelos = items.length;
  const totalStock = items.reduce((acc, curr) => acc + (Number(curr.cantidad) || 0), 0);
  const disponibles = items.filter((i) => i.estado === 'Disponible').reduce((acc, curr) => acc + (Number(curr.cantidad) || 0), 0);
  const enUso = items.filter((i) => i.estado === 'En uso').reduce((acc, curr) => acc + (Number(curr.cantidad) || 0), 0);
  const reparacion = items.filter((i) => i.estado === 'Reparación').reduce((acc, curr) => acc + (Number(curr.cantidad) || 0), 0);
  const baja = items.filter((i) => i.estado === 'Baja').reduce((acc, curr) => acc + (Number(curr.cantidad) || 0), 0);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
      {/* Total Registros */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500">Registros</span>
          <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
            <Layers className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2 flex items-baseline gap-1.5">
          <span className="text-2xl font-bold text-slate-900">{totalModelos}</span>
          <span className="text-[11px] text-slate-500">ítems</span>
        </div>
      </div>

      {/* Total Unidades / Stock */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500">Stock Total</span>
          <div className="p-1.5 rounded-lg bg-slate-100 text-slate-700">
            <Cpu className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2 flex items-baseline gap-1.5">
          <span className="text-2xl font-bold text-slate-900">{totalStock}</span>
          <span className="text-[11px] text-slate-500">unidades</span>
        </div>
      </div>

      {/* Disponibles */}
      <div className="bg-white p-3.5 rounded-xl border border-emerald-200/70 bg-emerald-50/20 shadow-2xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-emerald-800">Disponible</span>
          <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2 flex items-baseline gap-1.5">
          <span className="text-2xl font-bold text-emerald-700">{disponibles}</span>
          <span className="text-[11px] text-emerald-600">libres</span>
        </div>
      </div>

      {/* En Uso */}
      <div className="bg-white p-3.5 rounded-xl border border-blue-200/70 bg-blue-50/20 shadow-2xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-blue-800">En uso</span>
          <div className="p-1.5 rounded-lg bg-blue-100 text-blue-700">
            <PlayCircle className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2 flex items-baseline gap-1.5">
          <span className="text-2xl font-bold text-blue-700">{enUso}</span>
          <span className="text-[11px] text-blue-600">en laboratorios</span>
        </div>
      </div>

      {/* En Reparación */}
      <div className="bg-white p-3.5 rounded-xl border border-amber-200/70 bg-amber-50/20 shadow-2xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-amber-800">Reparación</span>
          <div className="p-1.5 rounded-lg bg-amber-100 text-amber-700">
            <Wrench className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2 flex items-baseline gap-1.5">
          <span className="text-2xl font-bold text-amber-700">{reparacion}</span>
          <span className="text-[11px] text-amber-600">en taller</span>
        </div>
      </div>

      {/* Baja */}
      <div className="bg-white p-3.5 rounded-xl border border-rose-200/70 bg-rose-50/20 shadow-2xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-rose-800">Baja</span>
          <div className="p-1.5 rounded-lg bg-rose-100 text-rose-700">
            <AlertTriangle className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2 flex items-baseline gap-1.5">
          <span className="text-2xl font-bold text-rose-700">{baja}</span>
          <span className="text-[11px] text-rose-600">descarte</span>
        </div>
      </div>
    </div>
  );
};
