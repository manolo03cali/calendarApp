// Importo React y hooks necesarios para estado, efecto y optimización de valores
import { useEffect, useMemo, useState } from "react";

// Importo el componente Modal para mostrar el formulario emergente
import Modal from "react-modal";

// Importo el selector de fechas y el registro de idioma
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Estilos del selector de fecha

// Importo funciones útiles de manejo de fechas
import { addHours, differenceInSeconds, isDate } from "date-fns";

// Importo el idioma español para usar en el DatePicker
import es from "date-fns/locale/es";

// Importo SweetAlert2 para mostrar alertas amigables al usuario
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

// Importo mis hooks personalizados para manejar la UI y el calendario
import { useUiStore, useCalendarStore } from "../../hooks";

// Registro el idioma español para los calendarios
registerLocale("es", es);

// Defino estilos personalizados para el modal (centrado en pantalla)
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

// Establezco cuál es el elemento raíz para el modal
Modal.setAppElement("#root");

export const CalendarModal = () => {
  // Accedo al estado del modal de fecha (si está abierto o no), y a la función para cerrarlo
  const { isDateModalOpen, closeDateModal } = useUiStore();

  // Obtengo el evento activo (si estoy editando uno) y la función para guardar (crear o actualizar)
  const { activeEvent, startSavingEvent } = useCalendarStore();

  // Estado local para saber si ya intenté enviar el formulario (para validaciones visuales)
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Estado local que contiene los valores del formulario
  const [formValues, setFormValues] = useState({
    title: "Manuel",
    notes: "Nota de Manuel",
    start: new Date(), // fecha inicial por defecto: ahora
    end: addHours(new Date(), 2), // fecha final: dos horas después
  });

  // Calculo dinámicamente la clase del campo título para validación visual
  const titleClass = useMemo(() => {
    if (!formSubmitted) return ""; // no marco error si aún no se envió
    return formValues.title.length > 0 ? "is-valid" : "is-invalid"; // clase según longitud del título
  }, [formValues.title, formSubmitted]);

  // Cada vez que `activeEvent` cambie (por ejemplo, al hacer clic en un evento), actualizo los valores del formulario
  useEffect(() => {
    if (typeof activeEvent === "object" && activeEvent !== null) {
      // Relleno el formulario con los valores del evento activo
      setFormValues({
        ...activeEvent,
        start: new Date(activeEvent.start),
        end: new Date(activeEvent.end),
      });
    }
  }, [activeEvent]);

  // Función que actualiza el formulario cuando escribo en un input o textarea
  const onInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  // Función para cambiar la fecha de inicio o fin
  const onDateChange = (event, changing) => {
    setFormValues({
      ...formValues,
      [changing]: event,
    });
  };

  // Cierro el modal cuando se cancela o termina el guardado
  const onCloseModal = () => {
    closeDateModal();
  };

  // Lógica cuando el usuario envía el formulario
  const onSubmit = async (event) => {
    event.preventDefault(); // Evito recargar la página
    setFormSubmitted(true); // Indico que ya intenté enviar, para que se activen validaciones visuales

    // Validación: la fecha de inicio debe ser válida
    if (!formValues.start || isNaN(new Date(formValues.start).getTime())) {
      Swal.fire({
        title: "Fecha de inicio inválida",
        text: "Debes ingresar una fecha y hora de inicio válida",
        icon: "error",
      });
      return;
    }

    // Validación: la fecha de fin debe ser válida
    if (!formValues.end || isNaN(new Date(formValues.end).getTime())) {
      Swal.fire({
        title: "Fecha de fin inválida",
        text: "Debes ingresar una fecha y hora de fin válida",
        icon: "error",
      });
      return;
    }

    // Validación: la fecha de fin debe ser posterior a la de inicio
    const diference = differenceInSeconds(formValues.end, formValues.start);
    if (isNaN(diference) || diference <= 0) {
      Swal.fire({
        title: "Fechas incorrectas",
        text: "Revisar las fechas ingresadas",
        icon: "error",
      });
      return;
    }

    // Validación: el título debe tener al menos 2 caracteres
    if (formValues.title.trim().length < 2) {
      Swal.fire({
        title: "Titulo obligatorio",
        text: "Debe ingresar el titulo del evento",
        icon: "error",
      });
      return;
    }

    // Si todo está bien, llamo a la función para guardar (crear o actualizar el evento)
    await startSavingEvent(formValues);

    // Cierro el modal
    onCloseModal();

    // Restablezco validaciones visuales
    setFormSubmitted(false);

    // Para depuración, imprimo el evento en consola
    console.log("Formulario enviado", formValues);
  };

  // Aquí empieza la parte visual del modal
  return (
    <Modal
      isOpen={isDateModalOpen} // Se muestra solo si el modal debe estar abierto
      onRequestClose={onCloseModal} // Qué hacer si se cierra
      style={customStyles} // Estilos definidos arriba
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200} // Espera 200ms antes de cerrar para aplicar animación
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={onSubmit}>
        {/* Selector de fecha/hora de inicio */}
        <div className="form-group mb-2 d-flex flex-column">
          <label>Fecha y hora inicio</label>
          <DatePicker
            selected={formValues.start}
            onChange={(event) => onDateChange(event, "start")}
            className="form-control"
            showTimeSelect
            dateFormat="Pp"
            locale="es"
            timeCaption="Hora"
          />
        </div>

        {/* Selector de fecha/hora de fin */}
        <div className="form-group mb-2 d-flex flex-column">
          <label>Fecha y hora fin</label>
          <DatePicker
            minDate={formValues.start}
            selected={formValues.end}
            onChange={(event) => onDateChange(event, "end")}
            className="form-control"
            showTimeSelect
            dateFormat="Pp"
            locale="es"
            timeCaption="Hora"
          />
        </div>

        <hr />

        {/* Campo de texto para el título del evento */}
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${titleClass}`} // Aplica clase según validación
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={formValues.title}
            onChange={onInputChange}
          />
          <small className="form-text text-muted">Una descripción corta</small>
        </div>

        {/* Campo de texto para las notas del evento */}
        <div className="form-group mb-2">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={formValues.notes}
            onChange={onInputChange}
          ></textarea>
          <small className="form-text text-muted">Información adicional</small>
        </div>

        {/* Botón de enviar/guardar */}
        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
