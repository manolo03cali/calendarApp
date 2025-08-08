/*
 * =============================================
 * ARCHIVO DE CONFIGURACIÓN PARA PRUEBAS CON JEST
 * =============================================
 * Este archivo se ejecuta antes de cada suite de pruebas
 * y sirve para preparar el entorno de pruebas:
 * - Añade polyfills necesarios
 * - Crea nodos del DOM requeridos
 * - Configura variables de entorno
 * - Aplica mocks globales
 */
require("@testing-library/jest-dom");
// =============================================
// SECCIÓN 1: POLYFILLS Y CONFIGURACIÓN DEL DOM
// =============================================

(() => {
  const existingRoot = document.getElementById("root");
  if (!existingRoot) {
    const root = document.createElement("div");
    root.setAttribute("id", "root");
    document.body.appendChild(root);
  }
})();

if (typeof global.TextEncoder === "undefined") {
  const { TextEncoder, TextDecoder } = require("node:util");
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;
}

// =============================================
// SECCIÓN 2: VARIABLES DE ENTORNO PARA TESTING
// =============================================

require("dotenv").config({
  path: ".env.test",
});

// =============================================
// SECCIÓN 3: MOCKS GLOBALES
// =============================================

jest.mock("./src/helpers/getEnvVariables", () => ({
  getEnvVariables: () => ({
    ...process.env,
  }),
}));
