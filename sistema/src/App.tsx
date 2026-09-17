import React, { useState, useEffect, useMemo } from 'react';
import { ComponenteItem, CategoriaComponente, EstadoComponente } from './types';
import { INITIAL_ITEMS, CATEGORIAS, ESTADOS } from './data/initialData';
import { Navbar } from './components/Navbar';
import { StatsCards } from './components/StatsCards';
import { ItemFormModal } from './components/ItemFormModal';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Download,
  RotateCcw,
  SlidersHorizontal,
  Layers,
  GraduationCap,
  CheckCircle,
  AlertCircle,
  X
} from 'lucide-react';

const STORAGE_KEY = 'lab_inventario_hardware_v2';

export default function App() {
  // Items state with local storage persistence
  const [items, setItems] = useState<ComponenteItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return INITIAL_ITEMS;
  });

  // Toast feedback message (Éxito y Error)
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const showToast = (type: 'success' | 'error', text: string) => {
    setToastMessage({ type, text });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Filters state (E. Búsqueda y filtrado)
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoria, setSelectedCategoria] = useState<string>('ALL');
  const [selectedEstado, setSelectedEstado] = useState<string>('ALL');

  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<ComponenteItem | null>(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<ComponenteItem | null>(null);

  // Sync to localStorage (F. Persistencia)
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Error guardando en localStorage:', e);
    }
  }, [items]);

  // Filter items: búsqueda por código, nombre o marca, y filtrado por categoría y/o estado
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const q = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.codigo.toLowerCase().includes(q) ||
        item.nombre.toLowerCase().includes(q) ||
        item.marca.toLowerCase().includes(q) ||
        (item.descripcion && item.descripcion.toLowerCase().includes(q));

      const matchesCategory = selectedCategoria === 'ALL' || item.categoria === selectedCategoria;
      const matchesEstado = selectedEstado === 'ALL' || item.estado === selectedEstado;

      return matchesSearch && matchesCategory && matchesEstado;
    });
  }, [items, searchTerm, selectedCategoria, selectedEstado]);

  // Handlers for CRUD
  const handleSaveItem = (itemData: Omit<ComponenteItem, 'id'> | ComponenteItem) => {
    try {
      if ('id' in itemData && itemData.id) {
        // C. Modificación / Actualizar
        setItems((prev) =>
          prev.map((it) => (it.id === itemData.id ? (itemData as ComponenteItem) : it))
        );
        showToast('success', `Componente "${itemData.nombre}" (${itemData.codigo}) actualizado correctamente.`);
      } else {
        // A. Alta / Crear
        const newItem: ComponenteItem = {
          ...(itemData as Omit<ComponenteItem, 'id'>),
          id: `comp-${Date.now()}`
        };
        setItems((prev) => [newItem, ...prev]);
        showToast('success', `Nuevo componente "${newItem.nombre}" registrado con éxito.`);
      }
    } catch (error) {
      showToast('error', 'Ocurrió un error al guardar el registro en la base de datos.');
    }
  };

  const handleConfirmDelete = () => {
    if (!itemToDelete) return;
    const deletedName = itemToDelete.nombre;
    const deletedCode = itemToDelete.codigo;
    setItems((prev) => prev.filter((it) => it.id !== itemToDelete.id));
    setIsDeleteOpen(false);
    setItemToDelete(null);
    showToast('success', `Registro "${deletedName}" (${deletedCode}) eliminado correctamente.`);
  };

  const handleResetData = () => {
    if (window.confirm('¿Deseas restablecer el inventario a los datos iniciales de prueba?')) {
      setItems(INITIAL_ITEMS);
      showToast('success', 'Inventario restablecido con los componentes de prueba.');
    }
  };

  const handleExportCSV = () => {
    const headers = ['Codigo', 'Nombre', 'Categoria', 'Marca', 'Cantidad', 'Estado', 'Descripcion', 'FechaRegistro'];
    const rows = items.map((i) => [
      `"${i.codigo}"`,
      `"${i.nombre}"`,
      `"${i.categoria}"`,
      `"${i.marca}"`,
      i.cantidad,
      `"${i.estado}"`,
      `"${(i.descripcion || '').replace(/"/g, '""')}"`,
      `"${i.fechaRegistro}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `inventario_laboratorio_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('success', 'Archivo CSV exportado exitosamente.');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 animate-in slide-in-from-bottom-5 duration-200">
          <div
            className={`px-4 py-3 rounded-xl shadow-lg border flex items-center gap-2.5 text-sm font-medium ${
              toastMessage.type === 'success'
                ? 'bg-emerald-900 text-emerald-100 border-emerald-700'
                : 'bg-rose-900 text-rose-100 border-rose-700'
            }`}
          >
            {toastMessage.type === 'success' ? (
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
            )}
            <span>{toastMessage.text}</span>
            <button
              onClick={() => setToastMessage(null)}
              className="ml-2 text-white/60 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Navbar */}
      <Navbar />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Banner Institucional con Datos de Proyecto */}
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white shadow-sm border border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start sm:items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0 text-amber-400">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                  COLEGIO NACIONAL E.M.D. ASUNCIÓN ESCALADA
                </p>
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  BACHILLERATO TÉCNICO EN INFORMÁTICA (BTI) - 2.º AÑO
                </h2>
                <p className="text-xs text-slate-300">
                  Sistema Web de Gestión de Equipos y Componentes Informáticos
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Header Summary */}
        <div className="mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Panel de Control de Equipos y Componentes
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Administración de existencias, estados operativos y registro de materiales del laboratorio
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <StatsCards items={items} />

        {/* Controls Bar: E. Búsqueda y filtrado visible */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs mb-6 space-y-3">
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            {/* Search Box: Búsqueda por código, nombre o marca */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="input-buscador"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por código (ej. ARD001), nombre o marca (ej. HP)..."
                className="w-full text-xs sm:text-sm pl-9 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 bg-slate-50/50"
              />
            </div>

            {/* Actions: A. Alta / Crear + Exportar + Reset */}
            <div className="flex items-center gap-2">
              <button
                id="btn-alta-componente"
                onClick={() => {
                  setItemToEdit(null);
                  setIsFormOpen(true);
                }}
                className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors flex items-center gap-1.5 whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                <span>Nuevo Componente</span>
              </button>

              <button
                id="btn-exportar-csv"
                onClick={handleExportCSV}
                title="Exportar inventario a formato CSV"
                className="px-3 py-2 text-xs sm:text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Exportar CSV</span>
              </button>

              <button
                id="btn-reiniciar-datos"
                onClick={handleResetData}
                title="Restablecer datos de prueba"
                className="p-2 text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
            {/* Filter by Category */}
            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-semibold flex items-center gap-1">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Categoría:</span>
              </span>
              <select
                id="filter-categoria"
                value={selectedCategoria}
                onChange={(e) => setSelectedCategoria(e.target.value)}
                className="bg-slate-100 border border-slate-200 rounded-md px-2.5 py-1 text-slate-700 font-medium focus:outline-none"
              >
                <option value="ALL">Todas las Categorías</option>
                {CATEGORIAS.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter by Status */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-slate-500 font-semibold mr-1">Estado:</span>
              <button
                onClick={() => setSelectedEstado('ALL')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  selectedEstado === 'ALL'
                    ? 'bg-slate-900 text-white font-semibold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Todos ({items.length})
              </button>
              {ESTADOS.map((st) => {
                const count = items.filter((i) => i.estado === st.value).length;
                const isSelected = selectedEstado === st.value;
                return (
                  <button
                    key={st.value}
                    onClick={() => setSelectedEstado(st.value)}
                    className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 ${
                      isSelected
                        ? 'bg-slate-900 text-white font-semibold'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <span>{st.label}</span>
                    <span className="text-[10px] opacity-75">({count})</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* B. Listado / Consultar (Tabla con columnas solicitadas) */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="px-6 py-3.5 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-slate-500" />
              <h3 className="font-bold text-slate-900 text-sm">
                Equipos y Componentes Registrados ({filteredItems.length})
              </h3>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              Control de Existencias en Tiempo Real
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 text-slate-600 uppercase tracking-wider text-[11px] font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3">Código</th>
                  <th className="px-4 py-3">Nombre</th>
                  <th className="px-4 py-3">Categoría</th>
                  <th className="px-4 py-3">Marca</th>
                  <th className="px-4 py-3 text-center">Cantidad</th>
                  <th className="px-4 py-3 text-center">Estado</th>
                  <th className="px-4 py-3">Descripción</th>
                  <th className="px-4 py-3 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredItems.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-12 text-center text-slate-500">
                      <p className="text-base font-semibold text-slate-700">
                        No se encontraron componentes con los filtros aplicados
                      </p>
                      <p className="text-xs mt-1">
                        Prueba modificando el buscador o la categoría seleccionada
                      </p>
                      <button
                        onClick={() => {
                          setSearchTerm('');
                          setSelectedCategoria('ALL');
                          setSelectedEstado('ALL');
                        }}
                        className="mt-3 px-3 py-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 rounded-lg"
                      >
                        Limpiar todos los filtros
                      </button>
                    </td>
                  </tr>
                ) : (
                  filteredItems.map((item) => {
                    const estadoObj = ESTADOS.find((e) => e.value === item.estado);
                    return (
                      <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                        {/* Código */}
                        <td className="px-4 py-3 font-mono font-bold text-xs text-indigo-600 whitespace-nowrap">
                          {item.codigo}
                        </td>

                        {/* Nombre */}
                        <td className="px-4 py-3 font-semibold text-slate-900">
                          {item.nombre}
                        </td>

                        {/* Categoría */}
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                            {item.categoria}
                          </span>
                        </td>

                        {/* Marca */}
                        <td className="px-4 py-3 text-slate-700 font-medium">
                          {item.marca}
                        </td>

                        {/* Cantidad */}
                        <td className="px-4 py-3 text-center font-bold text-slate-900">
                          {item.cantidad}
                        </td>

                        {/* Estado */}
                        <td className="px-4 py-3 text-center whitespace-nowrap">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                              estadoObj ? estadoObj.badgeClass : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {item.estado}
                          </span>
                        </td>

                        {/* Descripción */}
                        <td className="px-4 py-3 text-xs text-slate-500 max-w-xs truncate" title={item.descripcion}>
                          {item.descripcion || '—'}
                        </td>

                        {/* Acciones: C. Modificación & D. Baja */}
                        <td className="px-4 py-3 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              id={`btn-editar-${item.codigo}`}
                              onClick={() => {
                                setItemToEdit(item);
                                setIsFormOpen(true);
                              }}
                              title="Editar / Modificar registro (UPDATE)"
                              className="p-1.5 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              id={`btn-eliminar-${item.codigo}`}
                              onClick={() => {
                                setItemToDelete(item);
                                setIsDeleteOpen(true);
                              }}
                              title="Eliminar registro (DELETE con confirmación)"
                              className="p-1.5 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <p>
            <strong>Colegio Nacional E.M.D. Asunción Escalada</strong> • Bachillerato Técnico en Informática (BTI) - 2.º Año
          </p>
          <div className="flex items-center gap-3">
            <span>Sistema Web de Gestión de Equipos y Componentes</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {/* Form Modal (A. Alta y C. Modificación) */}
      <ItemFormModal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setItemToEdit(null);
        }}
        onSave={handleSaveItem}
        itemToEdit={itemToEdit}
      />

      {/* Delete Confirmation Modal (D. Baja con confirmación previa) */}
      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        item={itemToDelete}
        onClose={() => {
          setIsDeleteOpen(false);
          setItemToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
