const copFormatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
});

/** Formatea un valor en pesos colombianos, p. ej. 79000 → "$ 79.000". */
export function formatCOP(amount) {
  return copFormatter.format(amount || 0);
}

const dateFormatter = new Intl.DateTimeFormat('es-CO', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});

export function formatDate(value) {
  if (!value) return '';
  return dateFormatter.format(new Date(value));
}

export function initials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');
}

export function firstName(name = '') {
  return name.split(' ')[0] || name;
}
