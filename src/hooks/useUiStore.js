// Importo los hooks de Redux para trabajar con el store
import { useDispatch, useSelector } from "react-redux";

// Importo las acciones que quiero disparar del slice de UI
import { onOpenDateModal, onCloseDateModal } from "../store";

// Creo un hook personalizado para encapsular la lógica del UI (interfaz)
export const useUiStore = () => {
  // Obtengo `dispatch` para poder enviar acciones al store
  const dispatch = useDispatch();

  // Extraigo el estado de la interfaz desde el store. En este caso, solo me interesa saber si el modal está abierto
  const { isDateModalOpen } = useSelector((state) => state.ui);

  // Esta función se encarga de abrir el modal: simplemente lanzo la acción correspondiente
  const openDateModal = () => {
    dispatch(onOpenDateModal());
  };

  // Esta función se encarga de cerrar el modal
  const closeDateModal = () => {
    dispatch(onCloseDateModal());
  };

  // Esta función es opcional, pero útil: si el modal está abierto, lo cierra; si está cerrado, lo abre
  const toggleDateModal = () => {
    isDateModalOpen ? openDateModal() : closeDateModal();
  };

  // Devuelvo todo lo que quiero exponer desde este hook
  return {
    // Propiedad que indica si el modal está abierto o no
    isDateModalOpen,

    // Métodos para abrir, cerrar o alternar el estado del modal
    openDateModal,
    closeDateModal,
    toggleDateModal,
  };
};
