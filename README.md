# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Requiere boostrap 5.3.6

font-awesome/6.7.2

## Instalación de bigCalendar:

yarn add react-big-calendar
usamos la versión date-fns v2 del sitio web https://www.npmjs.com/package/react-big-calendar
Instalamos las dependencias necesarias
yarn add date-fns
Instalamos el modal
yarn add react-modal
Cargamos los stilos del modal en el archivo styles.css
Cargamos el formulario predefinido para el modal
cargamos el React Date Picker y generar un calendario en cada campo de texto en las fechas por lo que es necesario instalar:
https://www.npmjs.com/package/react-datepicker
yarn add react-datepicker
Utilizamos sweetalert 2
para el manejo del store utilizamos redux tollkit
yarn add @reduxjs/toolkit
yarn add react-redux

## Notas

Es necesario usar la versión "react": "18.2.0", porque la versión 19 genera incompatibilidad con bigCalentar
