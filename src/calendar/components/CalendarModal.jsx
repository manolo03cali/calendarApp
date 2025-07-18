// Primero importo los hooks que necesito desde React para manejar estados, efectos y optimizar cálculos
import { useEffect, useMemo, useState } from "react";

// Luego importo el componente Modal, que usaré para mostrar el formulario como ventana emergente
import Modal from "react-modal";

// Traigo el selector de fechas junto con su configuración de idioma
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Importo los estilos CSS necesarios

// Utilizo funciones de date-fns para manejar fechas fácilmente
import { addHours, differenceInSeconds } from "date-fns";

// Importo el idioma español para que el DatePicker muestre los textos en español
import es from "date-fns/locale/es";

// Para mostrar alertas agradables al usuario, uso SweetAlert2
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

// Importo mis hooks personalizados que me dan acceso a la UI y al estado del calendario
import { useUiStore, useCalendarStore } from "../../hooks";

// Registro el idioma español para el DatePicker
registerLocale("es", es);

// Defino los estilos que quiero para el modal (lo centro en la pantalla)
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

// Le indico a React Modal cuál es el elemento raíz de mi app
Modal.setAppElement("#root");

export const CalendarModal = () => {
  // Con este hook puedo saber si el modal está abierto y puedo cerrarlo desde aquí
  const { isDateModalOpen, closeDateModal } = useUiStore();

  // Este hook me da acceso al evento que estoy editando (si hay alguno), y una función para guardar eventos
  const { activeEvent, startSavingEvent } = useCalendarStore();

  // Creo un estado local para saber si ya intenté enviar el formulario, útil para mostrar errores
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Defino el estado inicial del formulario, con valores por defecto
  const [formValues, setFormValues] = useState({
    title: "Manuel",
    notes: "Nota de Manuel",
    start: new Date(), // fecha de inicio: ahora
    end: addHours(new Date(), 2), // fecha final: dos horas después
  });

  // Este memo me permite validar el campo título solo cuando sea necesario
  const titleClass = useMemo(() => {
    if (!formSubmitted) return "";
    return formValues.title.length > 0 ? "is-valid" : "is-invalid";
  }, [formValues.title, formSubmitted]);

  // Cuando hay un evento activo (es decir, voy a editar uno), cargo sus datos en el formulario
  useEffect(() => {
    if (typeof activeEvent === "object" && activeEvent !== null) {
      setFormValues({
        ...activeEvent,
        start: new Date(activeEvent.start),
        end: new Date(activeEvent.end),
      });
    }
  }, [activeEvent]);

  // Esta función se encarga de actualizar los inputs del formulario
  const onInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  // Esta función cambia las fechas de inicio o fin
  const onDateChange = (event, changing) => {
    setFormValues({
      ...formValues,
      [changing]: event,
    });
  };

  // Esta función se llama cuando el usuario cierra el modal
  const onCloseModal = () => {
    closeDateModal();
  };

  // Esta es la función principal para cuando el usuario envía el formulario
  const onSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    // Valido que la fecha de inicio sea válida
    if (!formValues.start || isNaN(new Date(formValues.start).getTime())) {
      Swal.fire(
        "Fecha de inicio inválida",
        "Debes ingresar una fecha y hora de inicio válida",
        "error"
      );
      return;
    }

    // Valido que la fecha de fin también sea válida
    if (!formValues.end || isNaN(new Date(formValues.end).getTime())) {
      Swal.fire(
        "Fecha de fin inválida",
        "Debes ingresar una fecha y hora de fin válida",
        "error"
      );
      return;
    }

    // Me aseguro de que la fecha de fin sea posterior a la de inicio
    const diference = differenceInSeconds(formValues.end, formValues.start);
    if (isNaN(diference) || diference <= 0) {
      Swal.fire("Fechas incorrectas", "Revisar las fechas ingresadas", "error");
      return;
    }

    // Verifico que el título tenga al menos dos caracteres
    if (formValues.title.trim().length < 2) {
      Swal.fire(
        "Título obligatorio",
        "Debe ingresar el título del evento",
        "error"
      );
      return;
    }

    // Si todo está correcto, guardo el evento (nuevo o editado)
    await startSavingEvent(formValues);
    onCloseModal(); // Cierro el modal
    setFormSubmitted(false); // Reseteo validación
  };

  // Aquí devuelvo el JSX que muestra el modal con el formulario
  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={onSubmit}>
        {/* Fecha de inicio */}
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

        {/* Fecha de fin */}
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

        {/* Campo título */}
        <div className="form-group mb-2">
          <label>Título y notas</label>
          <input
            type="text"
            className={`form-control ${titleClass}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={formValues.title}
            onChange={onInputChange}
          />
          <small className="form-text text-muted">Una descripción corta</small>
        </div>

        {/* Campo notas */}
        <div className="form-group mb-2">
          <textarea
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={formValues.notes}
            onChange={onInputChange}
          ></textarea>
          <small className="form-text text-muted">Información adicional</small>
        </div>

        {/* Botón guardar */}
        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
