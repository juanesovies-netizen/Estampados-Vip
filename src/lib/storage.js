const PREFIX = 'vipwear.v2.';

export function load(key, fallback) {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function save(key, value) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    // Almacenamiento lleno o bloqueado: la app sigue funcionando en memoria.
  }
}

export function uid(prefix = 'id') {
  return `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}

/** Elimina datos de la versión anterior de la demo (v1). */
export function clearLegacyData() {
  ['vipwear_user', 'vipwear_products', 'vipwear_cart', 'vipwear_custom_requests'].forEach((key) =>
    localStorage.removeItem(key),
  );
}
