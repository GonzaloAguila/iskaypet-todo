# To-Do Iskaypet

Aplicación web de gestión de tareas construida con Next.js 16, React 19 y TypeScript. La aplicación permite crear, visualizar y eliminar tareas, con un sistema completo de validación de formularios y manejo de errores.

## Requisitos Previos

Tener instalado:

- Node.js 18.0 o superior
- npm, yarn o algun gestor de paquetes.

## Instalación

1. Clonar el repositorio:
```bash
git clone <repository-url>
cd to-do-iskaypet
```

2. Instalar las dependencias:
```bash
npm install
```

## Scripts Disponibles

### Desarrollo

Iniciar el servidor de desarrollo:

```bash
npm run dev
```

La aplicación va a estar disponible en [http://localhost:3000](http://localhost:3000)

### Testing

Ejecutar los tests:

```bash
npm test
```
Ejecutar los tests en modo watch:

```bash
npm run test:watch
```

### Linting

Ejecutar el linter:

```bash
npm run lint
```

## Estructura del Proyecto

```
src/
├── app/                   # Rutas y páginas de Next.js App Router
│   ├── [tab]/             # Rutas dinámicas para tabs
│   ├── error.tsx          # Error boundary client side.
│   ├── global-error.tsx   # Error boundary global
│   ├── not-found.tsx      # Página 404
│   └── globals.css        # Variables CSS globales
├── components/            # Componentes reutilizables y en su mayoria, atomicos.
│   ├── Button/
│   ├── Card/
│   ├── ErrorMessage/
│   ├── inputs/
│   ├── Modal/
│   ├── Nav/
│   └── TabBar/
├── hooks/                 # Custom hooks
│   ├── useBodyScrollLock/
│   ├── useEscapeKey/
│   ├── useModal/
│   └── useTasks/
├── layouts/               # Layouts
│   └── TabsLayout/
├── modules/               # Módulos (componentes mas complejos)
│   ├── forms/
│   ├── modals/
│   └── Task/
├── services/              # Servicios que intearctuan con la API
│   └── taskService/
└── utils/                 # Utilidades, de todo un poco.
    ├── errors/
    ├── applyFilters.ts
    └── paginate.ts
```

## Tecnologías Utilizadas

- **Next.js 16**: Framework React con App Router
- **React 19**: Biblioteca de UI
- **TypeScript**: Tipado estático
- **React Hook Form**: Manejo de formularios
- **Joi**: Validación de esquemas
- **SWR**: Data fetching y caching
- **Jest**: Framework de testing
- **React Testing Library**: Testing de componentes
- **CSS Modules**: Estilos modulares

### Agregar una Nueva Tab

1. Agregar el nombre de la tab en `src/layouts/TabsLayout/tabRoutes.ts`
2. Crear el componente en `src/layouts/TabsLayout/tabs/`
3. Importar el componente en `TabsContainer.tsx`

### Agregar un Nuevo Componente

1. Crear la carpeta del componente en `src/components/`
2. Crear los archivos: `ComponentName.tsx`, `ComponentName.module.css`, `index.ts`
3. Agregar las variables CSS necesarias en `globals.css` si aplica

