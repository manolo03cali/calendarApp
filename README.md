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

Manuel Quintero

Basado en el curso React de cero a experto de Fernando Herrera
