import React from 'react';

export const Navbar: React.FC = () => {
  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        {/* Title & Institutional Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center font-bold text-lg shadow-xs border border-slate-700">
            AE
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                Inventario de Laboratorio Informático
              </h1>
              <span className="hidden sm:inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                BTI - 2.º Año
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Colegio Nacional E.M.D. Asunción Escalada
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Sistema Operativo</span>
          </div>
        </div>
      </div>
    </header>
  );
};

