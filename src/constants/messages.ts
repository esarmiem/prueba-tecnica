export const MESSAGES = {
  ERRORS: {
    FETCH: 'No se pudo cargar la API. Usando localStorage.',
    CREATE: 'No se pudo crear el gasto.',
    UPDATE: 'No se pudo actualizar el gasto.',
    DELETE: 'No se pudo eliminar el gasto.',
    VALIDATION: {
      AMOUNT: 'Ingresa un monto válido',
      CATEGORY: 'Selecciona una categoría',
      DATE: 'Selecciona una fecha',
    },
  },
  SUCCESS: {
    CREATE: 'Gasto agregado correctamente',
    UPDATE: 'Gasto actualizado correctamente',
    DELETE: 'Gasto eliminado correctamente',
  },
  UI: {
    LOADING: 'Cargando...',
    RETRY: 'Reintentar',
    FALLBACK_BADGE: 'Datos desde localStorage',
    HEADER_TITLE: 'Gestor de Gastos',
    HEADER_SUBTITLE: 'Controla tus gastos personales en un solo lugar',
    TOTAL_LABEL: 'Total general',
    TOAST_TITLE: 'Listo',
    NO_DATA: 'Sin gastos para mostrar',
  },
}
