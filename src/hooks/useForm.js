// Importo hooks de React para manejar estado, efectos y memorias
import { useEffect, useMemo, useState } from "react";

// Defino un custom hook que recibe:
// - `initialForm`: el estado inicial del formulario
// - `formValidations`: un objeto con funciones de validación para cada campo
export const useForm = (initialForm = {}, formValidations = {}) => {
  // Este estado almacena los valores actuales del formulario (como el texto de los inputs)
  const [formState, setFormState] = useState(initialForm);

  // Este estado guarda los errores de validación por campo, si existen
  const [formValidation, setFormValidation] = useState({});

  // Este efecto se ejecuta cada vez que cambia el estado del formulario.
  // Llama a la función que evalúa las validaciones.
  useEffect(() => {
    createValidators();
  }, [formState]);

  // Este efecto se ejecuta cuando cambian los valores iniciales del formulario.
  // Reseteo el formulario al nuevo estado inicial.
  useEffect(() => {
    setFormState(initialForm);
  }, [initialForm]);

  // Esta variable calcula si todo el formulario es válido (true) o no (false)
  const isFormValid = useMemo(() => {
    // Recorro todas las validaciones actuales y si alguna tiene error (≠ null), devuelvo false
    for (const formValue of Object.keys(formValidation)) {
      if (formValidation[formValue] !== null) return false;
    }
    // Si todo está correcto (todos son null), devuelvo true
    return true;
  }, [formValidation]);

  // Esta función se ejecuta cada vez que el usuario escribe en un input
  const onInputChange = ({ target }) => {
    const { name, value } = target;
    // Actualizo el estado del formulario con el nuevo valor del input
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // Esta función permite resetear el formulario a su estado inicial
  const onResetForm = () => {
    setFormState(initialForm);
  };

  // Esta función aplica las validaciones que definí para cada campo
  const createValidators = () => {
    const formCheckedValues = {};

    // Recorro cada campo que tiene validación
    for (const formField of Object.keys(formValidations)) {
      // Extraigo la función de validación y su mensaje de error
      const [fn, errorMessage] = formValidations[formField];

      // Aplico la validación. Si pasa, no hay error (null). Si falla, guardo el mensaje de error.
      formCheckedValues[`${formField}Valid`] = fn(formState[formField])
        ? null
        : errorMessage;
    }

    // Actualizo el estado de validaciones
    setFormValidation(formCheckedValues);
  };

  // Devuelvo lo necesario para que el formulario funcione con este hook
  return {
    ...formState, // Los campos individuales como `email`, `password`, etc.
    formState, // El objeto completo del formulario
    onInputChange, // Función para manejar cambios en los inputs
    onResetForm, // Función para reiniciar el formulario

    ...formValidation, // Propiedades como `emailValid`, `nameValid`, etc.
    isFormValid, // Booleano que dice si todo el formulario es válido
  };
};
