# To-Do Iskaypet

Challenge enviado por el equipo Iskaypet donde debía realizar un todo-list basado en un [figma](https://www.figma.com/design/Z8hlp9KjNiRck368uZX89T/prueba-front?node-id=1-2&t=JVilHOQFGB450uiY-0).
Algunas cuestiones a tener en cuenta:

- El figma unicamente tiene desarollado el componente input, al menos no encontre otro o no entendi porque solamente esta el input.
- El layout que esta en figma unicamente tiene el apartado de vista mobile. Como no hubo especificaciones para la parte web, simplemente lo deje como estaba, no se si fue su intencion que yo me encargue de eso o si fue aproposito para que mantenga la total similaridad con figma.
- De la misma manera, hay muchas de las tabs que no tienen ningun contenido, por lo que para eso (segun figma) unicamente renderize el label de la tab.
- El formulario de datos personales yo entendi que no deberia hacer nada, simplemente validar los inputs.
- Lo mismo me sucedio con la Nav. El carrito en el figma tiene de 2 (items). Para este challenge, como estaba enfocado en el TODO, simplemente replique la nav de figma.

## Requisitos Previos

Tener instalado:

- Node.js 20.0 o superior
- npm como gestor de paquetes

## Instalacion

1. Clonar el repositorio:
```bash
git clone <repository-url>
cd to-do-iskaypet
```

2. Instalar las dependencias:
```bash
npm install
```

Esto tambien configura automaticamente los git hooks de Husky.

## Scripts Disponibles

### Desarrollo

Iniciar el servidor de desarrollo:

```bash
npm run dev
```

La aplicacion va a estar disponible en [http://localhost:3000](http://localhost:3000)

### Testing

Ejecutar los tests:

```bash
npm test
```

Ejecutar los tests en modo watch:

```bash
npm run test:watch
```

Ejecutar los tests con cobertura:

```bash
npm run test:coverage
```

### Linting

Ejecutar el linter:

```bash
npm run lint
```

### Build

Generar build de produccion:

```bash
npm run build
```

## Git Hooks (Husky)

El proyecto utiliza Husky para ejecutar validaciones automaticas antes de cada push (podria ser para cada commit tambien, pero como es un agregado propio me parecio correcto de esta manera):

1. **Linter**: Verifica que no haya errores ni warnings de ESLint
2. **Tests**: Ejecuta todos los tests y verifica que pasen
3. **Build**: Compila el proyecto para asegurar que no haya errores

Si alguna validacion falla, el push se cancela automaticamente.

Los hooks se instalan automaticamente al ejecutar `npm install`.

## Estructura del Proyecto

```
src/
├── app/                   # Rutas y paginas de Next.js App Router
│   ├── [tab]/             # Rutas dinamicas para tabs
│   ├── error.tsx          # Error boundary client side
│   ├── global-error.tsx   # Error boundary global
│   ├── not-found.tsx      # Pagina 404
│   └── globals.css        # Variables CSS globales
├── components/            # Componentes reutilizables y atomicos
│   ├── Button/
│   ├── Card/
│   ├── ErrorMessage/
│   ├── inputs/
│   │   ├── InputEmail/
│   │   ├── InputPhone/
│   │   ├── InputSelect/   
│   │   ├── InputText/
│   │   ├── InputTextArea/
│   │   └── InputWrapper/
│   ├── Modal/
│   └── TabBar/
├── hooks/                 # Custom hooks
│   ├── useBodyScrollLock/ # Bloquea scroll del body
│   ├── useEscapeKey/      # Detecta tecla Escape
│   ├── useModal/          # Manejo de estado de modales
│   ├── usePagination/     # Logica de paginacion
│   └── useTasks/          # CRUD de tareas con SWR
├── layouts/               # Layouts
│   └── TabsLayout/
├── modules/               # Modulos (componentes mas complejos)
│   ├── forms/
│   │   ├── MyDataForm/
│   │   └── TaskForm/
│   ├── modals/
│   │   └── CreateTaskModal/
│   ├── Nav/
│   ├── Paginator/         # Componente de paginacion
│   └── Task/
├── services/              # Servicios que interactuan con la API
│   └── taskService/
└── utils/                 # Utilidades
    ├── errors/
    ├── applyFilters.ts
    ├── paginate.ts
    └── regex.ts
```

## Tecnologias Utilizadas

- **Next.js 16**: Framework React con App Router
- **React 19**: Biblioteca de UI
- **TypeScript**: Tipado estatico
- **React Hook Form**: Manejo de formularios
- **Joi**: Validacion de esquemas
- **SWR**: Data fetching y caching
- **Jest**: Framework de testing
- **React Testing Library**: Testing de componentes
- **CSS Modules**: Estilos modulares
- **Husky**: Git hooks para validaciones pre-push

## Paginacion

El listado de tareas incluye paginacion configurable:

- **Limite inicial**: 3 tareas por pagina
- **Opciones disponibles**: 3, 5, 10 tareas por pagina
- **Navegacion**: Botones anterior/siguiente y numeros de pagina
- **Responsive**: Layout adaptado para movil y desktop

La logica de paginacion esta encapsulada en el hook `usePagination` y el componente `Paginator`.

## CI/CD

El proyecto incluye un workflow de GitHub Actions (`.github/workflows/ci.yml`) que ejecuta:

1. Linting con ESLint
2. Tests con Jest
3. Build de produccion

Se ejecuta en cada push y pull request a las ramas `main` y `develop`.

## Guias de Desarrollo

### Agregar una Nueva Tab

1. Agregar el nombre de la tab en `src/layouts/TabsLayout/tabRoutes.ts`
2. Crear el componente en `src/layouts/TabsLayout/tabs/`
3. Importar el componente en `TabsContainer.tsx`

### Agregar un Nuevo Componente

1. Crear la carpeta del componente en `src/components/`
2. Crear los archivos: `ComponentName.tsx`, `ComponentName.module.css`, `ComponentName.types.ts`, `index.ts`
3. Agregar las variables CSS necesarias en `globals.css` si aplica

### Agregar un Nuevo Hook

1. Crear la carpeta del hook en `src/hooks/`
2. Crear los archivos: `useHookName.ts`, `useHookName.test.ts`
3. Exportar el hook en `src/hooks/index.ts`
