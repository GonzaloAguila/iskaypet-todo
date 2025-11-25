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

