// Importo los hooks de React-Redux para interactuar con el store de la app
import { useDispatch, useSelector } from "react-redux";

// Importo las acciones que permiten abrir o cerrar el modal desde el slice de UI
import { onOpenDateModal, onCloseDateModal } from "../store";

// Creo un custom hook llamado `useUiStore` para manejar la lógica relacionada con la UI (interfaz)
export const useUiStore = () => {
  // Obtengo `dispatch`, que me permite enviar acciones al store (como abrir/cerrar el modal)
  const dispatch = useDispatch();

  // Uso `useSelector` para extraer el valor de `isDateModalOpen` desde el estado global (store)
  // Esto me dice si el modal actualmente está abierto (true) o cerrado (false)
  const { isDateModalOpen } = useSelector((state) => state.ui);

  // Esta función abre el modal lanzando la acción `onOpenDateModal`
  const openDateModal = () => {
    dispatch(onOpenDateModal());
  };

  // Esta función cierra el modal lanzando la acción `onCloseDateModal`
  const closeDateModal = () => {
    dispatch(onCloseDateModal());
  };

  // Esta función alterna el estado del modal:
  // - Si está abierto, lo cierra
  // - Si está cerrado, lo abre
  const toggleDateModal = () => {
    isDateModalOpen ? closeDateModal() : openDateModal();
  };

  // Devuelvo las propiedades y funciones que quiero que estén disponibles al usar este hook
  return {
    // Estado del modal (abierto o cerrado)
    isDateModalOpen,

    // Métodos para controlar el modal
    openDateModal,
    closeDateModal,
    toggleDateModal,
  };
};
