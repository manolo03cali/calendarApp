## CalendarApp - React + Vite

Este proyecto es una aplicación de calendario desarrollada con React 18 y Vite, que permite gestionar eventos de manera visual e intuitiva. Utiliza Redux para el manejo del estado, react-big-calendar para la interfaz del calendario y otras herramientas modernas del ecosistema React.

## Características principales

Visualización de eventos por día, semana o mes.

Crear, editar y eliminar eventos en el calendario.

Modal emergente para edición rápida de eventos.

Validaciones de formulario con alertas amigables.

Soporte para múltiples vistas con localización en español.

## Tecnologías usadas

React 18.2.0 (Evita React 19 por incompatibilidades con react-big-calendar)

Vite como empaquetador y servidor de desarrollo

Redux Toolkit + React Redux

React Big Calendar (interfaz de calendario)

date-fns (manejo de fechas)

React Modal (modales de evento)

React Datepicker (selector de fechas)

SweetAlert2 (alertas personalizadas)

Bootstrap 5 + Font Awesome 6 (estilos e íconos)

## Instalación rápida

# Instala dependencias

yarn install # o npm install

# Dependencias necesarias

yarn add react-big-calendar
yarn add date-fns
yarn add react-modal
yarn add react-datepicker
yarn add sweetalert2
yarn add @reduxjs/toolkit react-redux

## Comandos útiles

# Servidor de desarrollo

yarn dev

# Compilar para producción

yarn build

## Recomendaciones

Usa Redux DevTools para depuración.

Asegúrate de importar correctamente los estilos de react-modal, react-datepicker y react-big-calendar.

Los eventos se almacenan en el estado global (events) y el evento seleccionado en activeEvent.

## Manejo avanzado de la nueva versión de rutas de React Router V7

## Autor

Jose Manuel Quintero Ferreira

# Development pasos

1. Renombrar el archivo .env.template por .env
2. Hacer los cambios respectivos.

VITE_API_URL=VITE_API_URL= HTTP://localhost:4000/api

# yarn add axios

# pruebas

Es necesario instalar
yarn add --dev jest babel-jest @babel/preset-env @babel/preset-react
yarn add --dev @testing-library/react @types/jest jest-environment-jsdom

yarn add -D dotenv

Actualizar los scripts del **package.json**

```
"scripts: {
  ...
  "test": "jest --watchAll"
```

# A partir de ciertas versiones, @testing-library/react no incluye automáticamente @testing-library/dom como dependencia directa (puede estar como peerDependency), por lo que se necesita instalarla manualmente, ademas puedo hacer matchers como toBeInTheDocument() etc

yarn add --dev @testing-library/dom

# Ojo tener en cuanta la configuración de polyfills e importar con require("@testing-library/jest-dom") en jest.setup para poder usar los matchers, cuidado con la secuencia, primero la importación luego todo lo demas.

# Para pruebas con el nuevo enrutamiento se debe instalar node-fetch

<!-- necesario para el manejo de errores en enrutamiento.

npm install --save-dev node-fetch -->

# Otra alternativa a fireEvent es usar userEvent que nos proporciona un comportamimento mas real de usuario.

Debemos instalar la libreria:
yarn add --dev @testing-library/user-event
La usamos en el test del CalendarModal.
