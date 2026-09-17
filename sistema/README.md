# Sistema de Inventario de Laboratorio Informático con Firebase y Supabase

**Colegio Nacional E.M.D. Asunción Escalada**  
**Bachillerato Técnico en Informática (BTI) – 2.º Año**  
**Materias:** Software y Laboratorio Informático  
**Modalidad:** Investigación + Desarrollo Práctico + Defensa  
**Puntaje Total:** 10 puntos  

---

## 1. Propósito del Proyecto
Este proyecto fue desarrollado como trabajo integrador para sustituir la arquitectura tradicional monolítica local (PHP + Apache + MariaDB en XAMPP) por una arquitectura moderna de **Base de Datos en la Nube** mediante **BaaS (Backend as a Service)**, utilizando **Firebase (Cloud Firestore)** y comparándolo con **Supabase (PostgreSQL)**.

El sistema permite gestionar de manera centralizada el inventario de componentes y equipamiento de los laboratorios de informática del colegio (procesadores, placas madre, memorias RAM, discos de almacenamiento, fuentes de poder, periféricos y equipos de red), clasificando su estado físico y facilitando el control técnico.

---

## 2. Tecnologías Utilizadas
- **Frontend:** React 19 + TypeScript + Vite.
- **Estilos:** Tailwind CSS con diseño adaptativo para móviles y computadoras.
- **Iconos:** Lucide React.
- **Backend as a Service (BaaS):**
  - **Firebase Firestore:** Base de datos NoSQL documental de Google Cloud.
  - **Supabase:** Alternativa Open Source basada en PostgreSQL relacional.
- **Control de Versiones:** Git y GitHub.
- **Despliegue / Hosting:** Render (Static Site).

---

## 3. Funcionalidades del Sistema (Operaciones CRUD)
1. **Alta (Create):** Formulario modal con validación de campos obligatorios (código de inventario, nombre, categoría, marca/modelo, número de serie, estado, cantidad, ubicación y docente responsable).
2. **Listado (Read):** Tabla dinámica que muestra todos los equipos registrados con tarjetas de métricas en tiempo real (Total modelos, stock físico, operativos, en reparación y de baja).
3. **Modificación (Update):** Edición inmediata de cualquier parámetro del componente (ej. cambio de estado de "Operativo" a "En Reparación").
4. **Baja (Delete):** Eliminación controlada con modal de confirmación para evitar borrados accidentales.
5. **Filtrado y Búsqueda:** Búsqueda en tiempo real por texto (código, nombre, marca o ubicación), filtrado por categoría de hardware y por estado operativo.
6. **Exportación:** Descarga del inventario completo en formato CSV para hojas de cálculo.

---

## 4. Cuadro Comparativo: Firebase vs. Supabase

| Característica | Firebase (Google) | Supabase |
| :--- | :--- | :--- |
| **Tipo de Base de Datos** | NoSQL (Cloud Firestore) | Relacional (PostgreSQL) |
| **Estructura** | Colecciones y Documentos (JSON-like) | Tablas con Filas, Columnas y Foreign Keys |
| **Lenguaje de Consulta** | SDK propietario de Firebase | SQL estándar + Supabase Client |
| **Seguridad** | Firestore Security Rules | PostgreSQL Row Level Security (RLS) |
| **Filosofía** | Propietario de Google Cloud | Código Abierto (Open Source) |
| **Tiempo Real** | Sincronización nativa con listeners | Supabase Realtime (CDC de Postgres) |
| **Escalabilidad** | Automática sin configuración | Vertical y horizontal en Postgres |

---

## 5. Instrucciones de Ejecución Local

Para probar el proyecto en tu computadora:

```bash
# 1. Clonar el repositorio
git clone https://github.com/Marcosszc/coutex.0.git

# 2. Entrar a la carpeta
cd coutex.0

# 3. Instalar las dependencias
npm install

# 4. Iniciar el servidor de desarrollo
npm run dev
```

La aplicación se abrirá en `http://localhost:3000` o `http://localhost:5173`.

---

## 6. Despliegue en Render (Static Site)

Para publicar la aplicación en Render:
1. Conecta tu repositorio de GitHub en [Render.com](https://render.com).
2. Selecciona **New +** > **Static Site**.
3. Configura los parámetros:
   - **Name:** `inventario-laboratorio-cnae`
   - **Branch:** `main`
   - **Root Directory:** `./` (o en blanco si los archivos están en la raíz)
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist`
4. Haz clic en **Create Static Site**.

---

## 7. Preguntas Clave para la Defensa Oral
1. **¿Qué es un BaaS?**  
   Es Backend as a Service. Permite a los desarrolladores contar con base de datos, autenticación y hosting sin tener que administrar servidores físicos ni configurar Apache/MySQL manualmente.
2. **¿Por qué este sistema es mejor que usar XAMPP?**  
   XAMPP solo corre en `localhost`. Si la máquina se apaga, nadie puede acceder. Con un BaaS y Render, la aplicación está activa 24/7 en Internet y los datos se guardan de forma persistente y segura en la nube.
3. **¿Cuál es la diferencia entre NoSQL y SQL?**  
   SQL (Supabase) organiza los datos en tablas con relaciones estrictas y usa sentencias SQL. NoSQL (Firebase Firestore) organiza los datos en documentos flexibles sin esquemas rígidos, ideal para sincronización rápida en tiempo real.
