export const CATEGORIES = [
  'Comida',
  'Transporte',
  'Entretenimiento',
  'Salud',
  'Educación',
  'Otros',
] as const

export type Category = (typeof CATEGORIES)[number]
